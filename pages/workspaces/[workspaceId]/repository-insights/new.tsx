import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ComponentProps, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { createRepositoryInsight } from "lib/utils/workspace-utils";

import { toast } from "lib/hooks/useToast";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

const NewInsightPage = () => {
  const { sessionToken } = useSupabaseAuth();
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  const repos = router.query.repos as string;
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [trackedReposModalOpen, setTrackedReposModalOpen] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    if (repos) {
      const queryRepos = JSON.parse(repos) as string[];
      const reposMap = new Map<string, boolean>();
      queryRepos.forEach((repo) => {
        reposMap.set(repo, true);
      });
      setName("Repositories");
      setTrackedRepos(reposMap);
    }
  }, [router.query]);

  const onCreateInsight: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;

    const { data, error } = await createRepositoryInsight({
      workspaceId,
      bearerToken: sessionToken!,
      name,
      repos: Array.from(trackedRepos, ([repo]) => {
        return { fullName: repo };
      }),
      is_public: true,
    });

    if (error) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setLoading(false);
      return;
    }

    toast({ description: "Insight created! Redirecting...", variant: "success" });
    router.push(`/workspaces/${workspaceId}/repository-insights/${data?.insight_id}/dashboard`);
  };

  const TrackedReposModal = dynamic(() => import("components/Workspaces/TrackedReposModal"), {
    ssr: false,
  });

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="grid gap-6 max-w-4xl">
        <h1 className="border-b bottom pb-4 text-xl font-medium">Create Repository Insight</h1>
        <form className="flex flex-col gap-6 mb-2" onSubmit={onCreateInsight}>
          <div>
            <h3 className="font-medium mb-2">
              Insight Name <span className="text-red-600">*</span>
            </h3>
            <TextInput
              name="name"
              placeholder="Insight name"
              className="!py-1.5 w-full text-sm"
              required
              disabled={loading}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6">
            <Button
              variant="primary"
              className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end"
              disabled={loading}
            >
              Create Insight
            </Button>
          </div>
        </form>

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
    </WorkspaceLayout>
  );
};

NewInsightPage.SEO = {
  title: "Create Repository Insight | OpenSauced Insights",
  description:
    "A repository insight page is a dashboard containing selected repositories that you and your team can get insights from.",
};

export default NewInsightPage;
