import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "lib/hooks/useToast";
import { fetchApiData } from "helpers/fetchApiData";
import { deleteWorkspaceRepoInsight, updateWorkspaceRepoInsight } from "lib/utils/workspace-utils";

import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";

const TrackedReposModal = dynamic(import("components/Workspaces/TrackedReposModal"));
const DeleteInsightPageModal = dynamic(import("components/organisms/InsightPage/DeleteInsightPageModal"));

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params!["workspaceId"] as string;
  const insightId = context.params!["insightId"] as string;

  const { data: insight } = await fetchApiData<DbUserInsight>({
    path: `workspaces/${workspaceId}/insights/${insightId}`,
    bearerToken,
  });

  // workspace team member access is handled by API: 404 if the workspace insight
  // is not accessible by user
  if (!insight) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const userId = Number(session?.user.user_metadata.sub);

  const owners: string[] = Array.from(
    workspaceMembers?.data || [],
    (member: { role: string; member: Record<string, any> }) => {
      if (member.role === "owner") {
        return member.member.login;
      }
    }
  ).filter(Boolean);

  const isOwner = !!(workspaceMembers?.data || []).find(
    (member) => member.role === "owner" && member.user_id === userId
  );

  return {
    props: {
      insight,
      workspaceId,
      owners,
      isOwner,
      bearerToken,
    },
  };
}

type RepoInsightEditPageProps = {
  insight: DbUserInsight;
  workspaceId: string;
  owners: WorkspaceMember[];
  isOwner: boolean;
  bearerToken: string;
};

export default function RepoInsightEditPage({ insight, workspaceId, isOwner, bearerToken }: RepoInsightEditPageProps) {
  const router = useRouter();
  const initialTrackedRepos = new Map([...insight.repos.map((repo) => [repo.full_name, true] as const)]);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(insight.name);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [trackedReposModalOpen, setTrackedReposModalOpen] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Map<string, boolean>>(initialTrackedRepos);

  const updateInsight = async () => {
    setLoading(true);

    const repos = Array.from(trackedRepos, (trackedRepo) => {
      return { fullName: trackedRepo[0] };
    });
    const { error: saveError } = await updateWorkspaceRepoInsight({
      name,
      workspaceId,
      insightId: `${insight.id}`,
      bearerToken,
      repos,
    });

    if (saveError) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setLoading(false);
      return;
    }

    toast({ description: "Insight updated! Redirecting...", variant: "success" });
    router.push(`/workspaces/${workspaceId}/repository-insights/${insight.id}/dashboard`);
  };

  const deleteInsight = async () => {
    const { error: deleteError } = await deleteWorkspaceRepoInsight({
      workspaceId,
      insightId: `${insight.id}`,
      bearerToken,
    });
    if (deleteError) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setLoading(false);
      return;
    }

    setLoading(false);
    setIsDeleteModalOpen(false);
    toast({ description: "Insight deleted! Redirecting...", variant: "success" });
    router.push(`/workspaces/${workspaceId}/repository-insights/new`);
  };

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="grid gap-6 max-w-4xl">
        <h1 className="border-b bottom pb-4 text-xl font-medium">Edit Repository Insight</h1>
        <section className="flex flex-col gap-6 mb-2">
          <div>
            <h3 className="font-medium mb-2">
              Insight Name <span className="text-red-600">*</span>
            </h3>
            <TextInput
              name="name"
              placeholder="Insight name"
              defaultValue={insight.name}
              onChange={(e) => setName(e.target.value)}
              className="!py-1.5 w-full text-sm"
              required
              disabled={loading}
            />
          </div>
          <div className="z-50 bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6">
            <Button
              variant="primary"
              className="flex gap-2.5 items-center cursor-pointer w-min sm:mt-0 self-end"
              onClick={updateInsight}
              disabled={loading}
            >
              Save Insight
            </Button>
          </div>
        </section>

        <TrackedReposTable
          disabled={loading}
          repositories={trackedRepos}
          onAddRepos={() => {
            setTrackedReposModalOpen(true);
          }}
          onRemoveTrackedRepo={(event) => {
            const { repo } = event.currentTarget.dataset;

            if (!repo) {
              // eslint-disable-next-line no-console
              console.error("The tracked repo to remove was not found");
              return;
            }

            setTrackedRepos((trackedRepos) => {
              const updates = new Map([...trackedRepos]);
              updates.delete(repo);

              return updates;
            });
          }}
        />

        {isOwner && (
          <div className="flex flex-col p-6 rounded-2xl bg-light-slate-4">
            <Title className="!text-1xl !leading-none !border-light-slate-8 border-b pb-4" level={4}>
              Delete Insight
            </Title>
            <Text className="my-4">Once you delete an insight, you&apos;re past the point of no return.</Text>

            <Button onClick={() => setIsDeleteModalOpen(true)} variant="destructive" className="w-fit">
              Delete insight
            </Button>
          </div>
        )}
      </div>

      <TrackedReposModal
        isOpen={trackedReposModalOpen}
        onClose={() => {
          setTrackedReposModalOpen(false);
        }}
        onAddToTrackingList={(repos: Map<string, boolean>) => {
          setTrackedReposModalOpen(false);
          setTrackedRepos((trackedRepos) => {
            const updates = new Map([...trackedRepos]);

            for (const [repo, checked] of repos) {
              if (checked) {
                updates.set(repo, true);
              } else {
                updates.delete(repo);
              }
            }

            return updates;
          });
        }}
        onCancel={() => {
          setTrackedReposModalOpen(false);
        }}
      />

      {isOwner ? (
        <DeleteInsightPageModal
          pageName={insight.name}
          open={isDeleteModalOpen}
          submitted={false}
          setOpen={() => setIsDeleteModalOpen(true)}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteInsight}
        />
      ) : null}
    </WorkspaceLayout>
  );
}
