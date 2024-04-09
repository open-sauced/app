import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { ComponentProps, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { fetchApiData } from "helpers/fetchApiData";
import HubContributorsPageLayout from "layouts/hub-contributors";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import Search from "components/atoms/Search/search";
import Pagination from "components/molecules/Pagination/pagination";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import useFetchAllListContributors from "lib/hooks/useFetchAllListContributors";

const DeleteListPageModal = dynamic(() => import("components/organisms/ListPage/DeleteListPageModal"));

// TODO: put into shared utilities once https://github.com/open-sauced/app/pull/2016 is merged
function isListId(listId: string) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(listId);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { listId } = ctx.params as { listId: string };
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
      path: `lists/${listId}`,
      bearerToken,
      // TODO: remove this in another PR for cleaning up fetchApiData
      pathValidator: () => true,
    }),
    fetchApiData<DbListContributor>({
      path: `lists/${listId}/contributors?limit=10`,
      bearerToken,
      // TODO: remove this in another PR for cleaning up fetchApiData
      pathValidator: () => true,
    }),
  ]);

  // Only the list owner should be allowed to add contributors
  if (error?.status === 404 || (list && list.user_id !== userId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      initialContributors,
    },
  };
};

interface EditListPageProps {
  list: DBList;
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

export default function EditListPage({ list, initialContributors }: EditListPageProps) {
  const router = useRouter();

  const [isPublic, setIsPublic] = useState(list.is_public);
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  async function updateList(payload: UpdateListPayload) {
    const { data, error } = await fetchApiData<DBList>({
      path: `lists/${list.id}`,
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
        path: `lists/${list.id}/contributors/${userId}`,
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
      path: "lists/" + list.id,
      method: "DELETE",
      bearerToken: sessionToken as string,
      pathValidator: () => true,
    });

    if (!error) {
      setIsDeleteModalOpen(false);
      setDeleteLoading(false);
      toast({ description: "List deleted successfully", variant: "success" });
      router.push("/hub/lists");
    } else {
      setIsDeleteModalOpen(false);
      setDeleteLoading(false);
      // eslint-disable-next-line no-console
      console.log(error);
      toast({ description: "An error occurred while deleting the list", variant: "danger" });
    }
  };

  return (
    <>
      <HubContributorsPageLayout>
        <div className="grid place-content-center info-container container w-full px-4 mt-10 mb-16 gap-8">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              // FormData was being funky because of the way our ToggleSwitch works
              // so went this way instead.
              const form = event.target as HTMLFormElement;
              const listUpdates = {
                name: form["list_name"].value,
                is_public: form["is_public"].checked,
                contributors: [],
              } satisfies UpdateListPayload;

              const { data, error } = await updateList(listUpdates);

              if (!error) {
                toast({ description: "List updated successfully!", variant: "success" });
                router.push(`/lists/${list.id}/overview`);
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
                  href={`/lists/${list.id}/overview`}
                >
                  <MdOutlineArrowBackIos title="Go back to list overview" className="text-lg text-light-slate-10" />
                </Link>{" "}
                Edit List
              </h1>
              <Button variant="primary" type="submit">
                Save changes
              </Button>
            </div>
            <p className="text-light-slate-11 pb-4 border-b border-solid border-light-slate-6">
              A list is a collection of contributors that you and your team can get insights for.
            </p>
            <label className="flex flex-col w-full text-light-slate-12 gap-4">
              List Name
              <TextInput name="list_name" defaultValue={list.name} required />
            </label>
            <div className="flex flex-col flex-wrap gap-4 py-8 border-t border-b border-solid border-light-slate-6">
              <label className="text-light-slate-12">Page Visibility</label>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <UserGroupIcon className="w-6 h-6 text-light-slate-9 mr-2" />
                  <Text className="text-light-slate-11">
                    <span id="make-public-explainer">Make this page publicly visible</span>
                  </Text>
                </div>
                <div className="flex ml-2 !border-red-900 items-center">
                  <Text className="!text-orange-600 pr-2 hidden md:block">Make Public</Text>
                  <ToggleSwitch
                    ariaLabelledBy="make-public-explainer"
                    name="is_public"
                    checked={isPublic}
                    handleToggle={() => setIsPublic((isPublic: boolean) => !isPublic)}
                  />
                </div>
              </div>
            </div>
            <div className="flex xs:items-center xs:justify-between xs:flex-row flex-wrap pb-8 border-b border-solid border-light-slate-6 flex-col justify-start">
              <h2 className="text-light-slate-12 ">Add Contributors</h2>
              <Button
                variant="outline"
                href={`/lists/${list.id}/add-contributors`}
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
        <DeleteListPageModal
          isLoading={deleteLoading}
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          submitted={submitted}
          listName={list.name}
          onConfirm={handleOnDeleteConfirm}
          onClose={handleDeleteModalClose}
        />
      </HubContributorsPageLayout>
    </>
  );
}
