import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "lib/hooks/useToast";
import { fetchApiData } from "helpers/fetchApiData";
import { useContributorsList } from "lib/hooks/api/useContributorList";
import { deleteWorkspaceContributorInsight, updateWorkspaceContributorInsight } from "lib/utils/workspace-utils";

import Text from "components/atoms/Typography/text";
import Button from "components/shared/Button/button";
import Title from "components/atoms/Typography/title";
import TextInput from "components/atoms/TextInput/text-input";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { TrackedContributorsTable } from "components/Workspaces/TrackedContributorsTable";

const TrackedContributorsModal = dynamic(import("components/Workspaces/TrackedContributorsModal"));
const DeleteListPageModal = dynamic(import("components/organisms/ListPage/DeleteListPageModal"));

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const listId = context.params?.listId as string;

  const { data: list, error: listError } = await fetchApiData<DBList>({
    path: `workspaces/${workspaceId}/userLists/${listId}`,
    bearerToken,
  });

  const { error: sessionError } = await fetchApiData<DbUser>({
    path: "auth/session",
    bearerToken,
  });

  if (listError || sessionError) {
    throw new Error(`Error loading contributor insight with ID ${listId}`, {
      cause: listError || sessionError,
    });
  }

  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const userId = Number(session?.user.user_metadata.sub);
  const isOwner = !!(workspaceMembers?.data || []).find(
    (member) => member.role === "owner" && member.user_id === userId
  );

  return {
    props: {
      workspaceId,
      bearerToken,
      list,
      isOwner,
    },
  };
}

type ContributorInsightEditPageProps = {
  workspaceId: string;
  bearerToken: string;
  list: DbUserList;
  isOwner: boolean;
};

export default function ContributorInsightEditPage({
  workspaceId,
  bearerToken,
  list,
  isOwner,
}: ContributorInsightEditPageProps) {
  const {
    data: { data: contributors },
  } = useContributorsList({ listId: list?.id });
  const initialTrackedContributors = new Map([
    ...contributors.map((contributor) => [contributor.author_login, true] as const),
  ]);

  const router = useRouter();
  const [name, setName] = useState(list.name);
  const [loading, setLoading] = useState(false);
  const [trackedContributors, setTrackedContributors] = useState<Map<string, boolean>>(initialTrackedContributors);
  const [isTrackedContributorsModalOpen, setIsTrackedContributorsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const updateInsight = async () => {
    const { error: updateError } = await updateWorkspaceContributorInsight({
      workspaceId,
      bearerToken,
      listId: list.id,
      name,
      contributors: Array.from(trackedContributors, ([contributor]) => {
        return { login: contributor };
      }),
    });

    if (updateError) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setLoading(false);
      return;
    }

    toast({ description: "Insight updated! Redirecting...", variant: "success" });
    router.push(`/workspaces/${workspaceId}/contributor-insights/${list.id}/overview`);
  };

  const deleteInsight = async () => {
    const { error: deleteError } = await deleteWorkspaceContributorInsight({
      workspaceId,
      bearerToken,
      listId: list.id,
    });

    if (deleteError) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setLoading(false);
      return;
    }

    toast({ description: "Insight deleted! Redirecting...", variant: "success" });
    router.push(`/workspaces/${workspaceId}/contributor-insights/new`);
  };

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="grid gap-6 max-w-4xl">
        <h1 className="border-b bottom pb-4 text-xl font-medium">Create Contributor Insight</h1>
        <section className="flex flex-col gap-6 mb-2">
          <div>
            <h3 className="font-medium mb-2">
              Insight Name <span className="text-red-600">*</span>
            </h3>
            <TextInput
              defaultValue={list.name}
              name="name"
              placeholder="Insight name"
              className="!py-1.5 w-full text-sm"
              required
              disabled={loading}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6 z-50">
            <Button
              variant="primary"
              className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end"
              disabled={loading}
              onClick={updateInsight}
            >
              Update Insight
            </Button>
          </div>
        </section>

        <TrackedContributorsTable
          disabled={loading}
          contributors={trackedContributors}
          onAddContributors={() => setIsTrackedContributorsModalOpen(true)}
          onRemoveTrackedContributor={(event) => {
            const { contributor } = event.currentTarget.dataset;

            if (!contributor) {
              // eslint-disable-next-line no-console
              console.error("The tracked contributor to remove was not found");
              return;
            }

            setTrackedContributors((trackedContributors) => {
              const updates = new Map([...trackedContributors]);
              updates.delete(contributor);

              return updates;
            });
          }}
        />

        {isOwner && (
          <div className="flex flex-col p-6 rounded-2xl bg-light-slate-4">
            <Title className="!text-1xl !leading-none !border-light-slate-8 border-b pb-4" level={4}>
              Delete Workspace
            </Title>
            <Text className="my-4">Once you delete a workspace, you&apos;re past the point of no return.</Text>

            <Button onClick={() => setIsDeleteModalOpen(true)} variant="destructive" className="w-fit">
              Delete workspace
            </Button>
          </div>
        )}
      </div>

      <TrackedContributorsModal
        onAddToTrackingList={(contributors: Map<string, boolean>) => {
          setIsTrackedContributorsModalOpen(false);
          setTrackedContributors((trackedContributors) => {
            const updates = new Map([...trackedContributors]);

            for (const [contributor, checked] of contributors) {
              if (checked) {
                updates.set(contributor, true);
              } else {
                updates.delete(contributor);
              }
            }

            return updates;
          });
        }}
        isOpen={isTrackedContributorsModalOpen}
        onClose={() => setIsTrackedContributorsModalOpen(false)}
        onCancel={() => setIsTrackedContributorsModalOpen(false)}
      />

      <DeleteListPageModal
        open={isDeleteModalOpen}
        setOpen={(open) => setIsDeleteModalOpen(open)}
        listName={list.name}
        submitted={false}
        onConfirm={deleteInsight}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </WorkspaceLayout>
  );
}
