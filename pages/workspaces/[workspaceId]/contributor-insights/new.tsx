import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { ComponentProps, useEffect, useState } from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { fetchApiData } from "helpers/fetchApiData";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import { createContributorInsight } from "lib/utils/workspace-utils";

import { toast } from "lib/hooks/useToast";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { TrackedContributorsTable } from "components/Workspaces/TrackedContributorsTable";

const TrackedContributorsModal = dynamic(() => import("components/Workspaces/TrackedContributorsModal"), {
  ssr: false,
});

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    bearerToken,
    pathValidator: () => true,
  });

  if (error) {
    deleteCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME });

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  setCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME, value: workspaceId });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      bearerToken,
      workspace: data,
    },
  };
};

CreateContributorInsightPage.SEO = {
  title: "Create Contributor Insight | OpenSauced Insights",
  description:
    "A contributor insight page is a dashboard containing selected contributor that you and your team can get insights from.",
};

export default function CreateContributorInsightPage({
  workspace,
  bearerToken,
}: {
  workspace: Workspace;
  bearerToken: string;
}) {
  const router = useRouter();
  const contributorIds = router.query.contributors as string;
  const title = router.query.title as string;
  const [trackedContributors, setTrackedContributors] = useState<Map<string, boolean>>(new Map());
  const [isTrackedContributorsModalOpen, setIsTrackedContributorsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contributorIds) {
      const queryContributors = JSON.parse(contributorIds) as string[];
      const contributorsMap = new Map<string, boolean>();
      queryContributors.forEach((contributor) => {
        contributorsMap.set(contributor, true);
      });
      setTrackedContributors(contributorsMap);
    }

    if (title) {
      setName(title);
    }
  }, [router.query]);

  const onCreateInsight: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;

    const { data, error } = await createContributorInsight({
      workspaceId: workspace.id,
      bearerToken,
      name,
      contributors: Array.from(trackedContributors, ([contributor]) => {
        return { login: contributor };
      }),
      is_public: true,
    });

    if (error) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setLoading(false);
      return;
    }

    toast({ description: "Insight created! Redirecting...", variant: "success" });
    router.push(`/workspaces/${workspace.id}/contributor-insights/${data?.user_list_id}/overview`);
  };

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <div className="grid gap-6 max-w-4xl">
        <h1 className="border-b bottom pb-4 text-xl font-medium">Create Contributor Insight</h1>
        <form className="flex flex-col gap-6 mb-2" onSubmit={onCreateInsight}>
          <div>
            <h3 className="font-medium mb-2">
              Insight Name <span className="text-red-600">*</span>
            </h3>
            <TextInput
              value={name}
              name="name"
              placeholder="Insight name"
              className="!py-1.5 w-full text-sm"
              required
              disabled={loading}
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

        <TrackedContributorsTable
          disabled={loading}
          contributors={trackedContributors}
          onAddContributors={() => setIsTrackedContributorsModalOpen(true)}
          onRemoveTrackedContributor={(event) => {
            const { contributor } = event.currentTarget.dataset;

            if (!contributor) {
              // eslint-disable-next-line no-console
              console.error("The tracked repo to remove was not found");
              return;
            }

            setTrackedContributors((trackedContributors) => {
              const updates = new Map([...trackedContributors]);
              updates.delete(contributor);

              return updates;
            });
          }}
        />
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
    </WorkspaceLayout>
  );
}
