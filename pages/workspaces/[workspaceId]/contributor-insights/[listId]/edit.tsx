import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { ComponentProps, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { fetchApiData } from "helpers/fetchApiData";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import Search from "components/atoms/Search/search";
import Pagination from "components/molecules/Pagination/pagination";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import useFetchAllListContributors from "lib/hooks/useFetchAllListContributors";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { useGetUserWorkspaces } from "lib/hooks/api/useGetUserWorkspaces";
import SingleSelect from "components/atoms/Select/single-select";

const DeleteListPageModal = dynamic(() => import("components/organisms/ListPage/DeleteListPageModal"));
const TransferInsightModal = dynamic(() => import("components/Workspaces/TransferInsightModal"));

// TODO: put into shared utilities once https://github.com/open-sauced/app/pull/2016 is merged
function isListId(listId: string) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(listId);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { listId, workspaceId } = ctx.params as { listId: string; workspaceId?: string };
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const userId = Number(session?.user.user_metadata.sub);

  if (!isListId(listId)) {
    return {
      notFound: true,
    };
  }

  const [{ data: list, error }, { data: initialContributors, error: contributorsError }] = await Promise.all([
    fetchApiData<DBList>({
      path: `workspaces/${workspaceId}/userLists/${listId}`,
      bearerToken,
      // TODO: remove this in another PR for cleaning up fetchApiData
      pathValidator: () => true,
    }),
    fetchApiData<DbListContributor>({
      path: `workspaces/${workspaceId}/userLists/${listId}/contributors?limit=10`,
      bearerToken,
      // TODO: remove this in another PR for cleaning up fetchApiData
      pathValidator: () => true,
    }),
  ]);

  // Only the list owner should be allowed to add contributors
  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const canEdit = !!workspaceMembers?.data?.find(
    (member) => ["owner", "editor"].includes(member.role) && member.user_id === userId
  );

  if (!canEdit) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      workspaceId,
      initialContributors,
    },
  };
};

interface EditListPageProps {
  list: DBList;
  workspaceId: string;
  initialContributors: PagedData<DbListContributor>;
}

interface UpdateListPayload {
  name: string;
  is_public: boolean;
  contributors: number[];
}

const ListContributors = ({
  contributors,
  onRemoveContributor,
}: {
  contributors: DbListContributor[];
  onRemoveContributor: ComponentProps<typeof Button>["onClick"];
}) => {
  return (
    <ul
      aria-label={`Contributors you can remove from the list`}
      className="h-90 w-full flex flex-col gap-2 overflow-auto"
    >
      {contributors?.map((contributor) => (
        <li
          key={contributor.id}
          className="flex justify-between items-center px-2 border-transparent hover:bg-light-slate-4 focus-within:bg-light-slate-4 border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-md ring-light-slate-6"
        >
          <div className="flex items-center gap-4">
            <Avatar size="xsmall" contributor={contributor.login} />
            <span className="text-light-slate-12">{contributor.login}</span>
          </div>
          <Button
            variant="default"
            className="pr-0 border-0 bg-transparent !text-orange-600 hover:!bg-transparent focus-within:!ring-0 hover:brightness-75"
            aria-label={`Remove contributor ${contributor.login} from the list`}
            data-user-id={contributor.id}
            data-user-name={contributor.login}
            onClick={onRemoveContributor}
          >
            Remove from list
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default function EditListPage({ list, workspaceId, initialContributors }: EditListPageProps) {
  const router = useRouter();

  const { sessionToken, user } = useSupabaseAuth();
  const { toast } = useToast();
  async function updateList(payload: UpdateListPayload) {
    const { data, error } = await fetchApiData<DBList>({
      path: `workspaces/${workspaceId}/userLists/${list.id}`,
      method: "PATCH",
      body: payload,
      bearerToken: sessionToken!,
      // TODO: remove this in another PR for cleaning up fetchApiData
      pathValidator: () => true,
    });

    return { data, error };
  }
  const [contributorSearchTerm, setContributorSearchTerm] = useState("");
  const {
    setPage,
    meta,
    data: contributors,
    isLoading,
  } = useFetchAllListContributors(
    {
      listId: list.id,
      contributor: contributorSearchTerm,
    },
    {
      fallbackData: initialContributors,
      revalidateOnFocus: false,
    }
  );

  async function onRemoveContributor(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { userId, userName } = (event.target as HTMLButtonElement).dataset;
    const undoId = setTimeout(async () => {
      const { error } = await fetchApiData<DBList>({
        path: `workspaces/${workspaceId}/userLists/${list.id}/contributors/${userId}`,
        method: "DELETE",
        bearerToken: sessionToken!,
      });

      if (error) {
        setRemovedContributorIds((prev) => prev.filter((id) => id !== userId));
        toast({ description: `Error removing ${userName} from your list`, variant: "danger" });
      }
    }, 3000);

    setRemovedContributorIds((prev) => [...prev, userId!]);

    toast({
      description: (
        <div className="w-full flex justify-between items-center gap-2 items">
          <p>
            <span className="font-semibold">{userName}</span>
            <span> was removed from your list</span>
          </p>
          <button
            onClick={() => {
              event.stopPropagation();
              setRemovedContributorIds((prev) => prev.filter((id) => removedContributorIds.includes(id)));
              window.clearTimeout(undoId);
            }}
            className="border-0 outline-none text-orange-600 hover:bg-orange-100 hover:text-orange-900 focus-within:text-orange-900 focus-within:bg-orange-200 p-2 rounded-md"
          >
            Undo
          </button>
        </div>
      ),
      variant: "success",
    });
  }

  const [removedContributorIds, setRemovedContributorIds] = useState<string[]>([]);

  const GraphLoading = ({ rows = 10 }: { rows?: number }) => {
    return (
      <div className="grid grid-cols-[2rem,1fr] gap-2">
        {new Array(rows).fill(0).map((_, index) => (
          <>
            <div className="loading rounded-full w-8 h-8" />
            <div className="loading" />
          </>
        ))}
      </div>
    );
  };

  const { data: workspacesData, isLoading: isWorkspacesDataLoading } = useGetUserWorkspaces();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>(workspaceId);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  useEffect(() => {
    if (!isWorkspacesDataLoading) {
      const filteredWorkspaces = workspacesData?.data?.filter((workspace) =>
        workspace.members.find(
          (member) => member.user_id === Number(user?.user_metadata.sub) && ["owner", "editor"].includes(member.role)
        )
      );

      setOptions(
        Array.from(filteredWorkspaces!, (workspace) => {
          return { label: workspace.name, value: workspace.id };
        })
      );
    }
  }, [workspacesData]);

  const handleOnDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOnDeleteConfirm = async () => {
    setSubmitted(true);
    setDeleteLoading(true);

    const { error } = await fetchApiData({
      path: `workspaces/${workspaceId}/userLists/${list.id}`,
      method: "DELETE",
      bearerToken: sessionToken as string,
      pathValidator: () => true,
    });

    if (!error) {
      setIsDeleteModalOpen(false);
      setDeleteLoading(false);
      toast({ description: "List deleted successfully", variant: "success" });
      router.push(`/workspaces/${workspaceId}/contributor-insights`);
    } else {
      setIsDeleteModalOpen(false);
      setDeleteLoading(false);
      // eslint-disable-next-line no-console
      console.log(error);
      toast({ description: "An error occurred while deleting the list", variant: "danger" });
    }
  };

  const transferWorkspace = async () => {
    const selectedOption = options.find((opt) => opt.value === selectedWorkspace);
    const response = await fetchApiData({
      method: "POST",
      path: `workspaces/${workspaceId!}/userLists/${selectedWorkspace}`,
      body: {
        id: list?.id,
      },
      bearerToken: sessionToken!,
      pathValidator: () => true,
    });
    if (response.error) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      return;
    }

    toast({ description: `Moved insight to ${selectedOption?.label}`, variant: "success" });
    router.push(`/workspaces/${selectedWorkspace}/contributor-insights/${list?.id}/overview`);
  };

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="grid place-content-center info-container container w-full px-4 mt-10 mb-16 gap-8">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // FormData was being funky because of the way our ToggleSwitch works
            // so went this way instead.
            const form = event.target as HTMLFormElement;
            const listUpdates = {
              name: form["list_name"].value,
              is_public: true,
              contributors: [],
            } satisfies UpdateListPayload;

            const { data, error } = await updateList(listUpdates);

            if (!error) {
              toast({ description: "List updated successfully!", variant: "success" });
              router.push(`/workspaces/${workspaceId}/contributor-insights/${list.id}/overview`);
            } else {
              toast({ description: "Error updating list. Please try again", variant: "danger" });
            }
          }}
          className="flex flex-col gap-8"
        >
          <div className="flex justify-between align-center items-center">
            <h1 className="flex items-center text-2xl text-light-slate-12">
              <Link
                className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
                href={`/workspaces/${workspaceId}/contributor-insights/${list.id}/overview`}
              >
                <MdOutlineArrowBackIos title="Go back to list overview" className="text-lg text-light-slate-10" />
              </Link>{" "}
              Edit Contributor Insight
            </h1>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </div>
          <p className="text-light-slate-11 pb-4 border-b border-solid border-light-slate-6">
            A contributor insight is a collection of contributors that you and your team can get insights for.
          </p>
          <label className="flex flex-col w-full text-light-slate-12 gap-4">
            Name
            <TextInput name="list_name" defaultValue={list.name} required />
          </label>
          <div className="flex xs:items-center xs:justify-between xs:flex-row flex-wrap pb-8 border-b border-solid border-light-slate-6 flex-col justify-start">
            <h2 className="text-light-slate-12 ">Add Contributors</h2>
            <Button
              variant="outline"
              href={`/workspaces/${workspaceId}/contributor-insights/${list.id}/add-contributors`}
              className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0"
            >
              <FaUserPlus size={22} />
              <span>Add new contributors</span>
            </Button>
          </div>
        </form>
        <div className="flex flex-col pb-4 gap-4">
          <h2 className="text-light-slate-12">Remove Contributors</h2>
          <div className="flex flex-col w-full gap-2 md:flex-row">
            <label className="flex w-full flex-col gap-4">
              <span className="sr-only">Search your contributor list</span>
              <Search
                placeholder="Search your contributor list"
                className="!w-full text-sm py-1.5"
                name={"contributors"}
                onChange={(value) => setContributorSearchTerm(value)}
              />
            </label>
          </div>
          <>
            {isLoading ? (
              <GraphLoading />
            ) : (
              <>
                {contributors && contributors.length > 0 ? (
                  <>
                    <ListContributors
                      contributors={contributors.filter(({ id }) => {
                        return !removedContributorIds.includes(id);
                      })}
                      onRemoveContributor={onRemoveContributor}
                    />
                    <div className="w-full flex place-content-center gap-4">
                      <Pagination
                        pages={new Array(meta.pageCount).fill(0).map((_, index) => index + 1)}
                        pageSize={5}
                        hasNextPage={meta.hasNextPage}
                        hasPreviousPage={meta.hasPreviousPage}
                        totalPage={meta.pageCount}
                        page={meta.page}
                        onPageChange={function (page: number): void {
                          setPage(page);
                        }}
                        showTotalPages={false}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-light-slate-11">No contributors to remove found.</p>
                )}
              </>
            )}
          </>
        </div>
        <div className="flex flex-col gap-4 py-6 border-t border-b border-light-slate-8">
          <label className="text-light-slate-12">Danger Zone</label>
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Title level={4}>Transfer to other Workspace</Title>
              <Text>Move this insight to another workspace where you are an owner or editor.</Text>
            </div>
            <SingleSelect
              isSearchable
              options={options}
              placeholder={options.find((opt) => opt.value === workspaceId)?.label}
              onValueChange={(value: string) => {
                setSelectedWorkspace(value);
              }}
            />
            <Button
              onClick={() => setIsTransferModalOpen(true)}
              disabled={selectedWorkspace === workspaceId}
              variant="primary"
              className="w-fit"
            >
              Transfer
            </Button>
          </section>
          <div className="flex flex-col p-6 rounded-2xl bg-light-slate-4">
            <Title className="!text-1xl !leading-none !border-light-slate-8 border-b pb-4" level={4}>
              Delete List
            </Title>
            <Text className="my-4">Once you delete a list, you&#39;re past the point of no return.</Text>

            <Button className="w-max" onClick={() => handleOnDelete()} variant="destructive">
              Delete list
            </Button>
          </div>
        </div>
      </div>

      <TransferInsightModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        handleTransfer={transferWorkspace}
        insightName={list.name}
        currentWorkspaceName={options.find((opt) => opt.value === workspaceId)?.label || ""}
        destinationWorkspaceName={options.find((opt) => opt.value === selectedWorkspace)?.label || ""}
      />

      <DeleteListPageModal
        isLoading={deleteLoading}
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        submitted={submitted}
        listName={list.name}
        onConfirm={handleOnDeleteConfirm}
        onClose={handleDeleteModalClose}
      />
    </WorkspaceLayout>
  );
}
