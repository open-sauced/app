import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ComponentProps, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { usePostHog } from "posthog-js/react";
import { captureException } from "@sentry/nextjs";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";
import { createWorkspace } from "lib/utils/workspace-utils";
import { WORKSPACE_UPDATED_EVENT } from "components/shared/AppSidebar/AppSidebar";
import AuthContentWrapper from "components/molecules/AuthContentWrapper/auth-content-wrapper";
import { fetchApiData } from "helpers/fetchApiData";

const WorkspaceWelcomeModal = dynamic(() => import("components/Workspaces/WorkspaceWelcomeModal"));

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    props: {
      user: session?.user || null,
    },
  };
};

const NewWorkspace = () => {
  const loadSbomRepo = async (repo: string) => {
    const params = new URLSearchParams({ repos: repo });
    const { data: sbomData, error } = await fetchApiData<Record<string, string[]>>({ path: `repos/sbom?${params}` });

    if (error) {
      if (error.status === 412) {
        toast({
          description: `Generating a workspace from the SBOM for ${repo} is currently not supported`,
          variant: "danger",
        });
      } else {
        captureException(error);
        toast({ description: `Error loading SBOM data. Please try again`, variant: "danger" });
      }

      setTrackedReposLoading(false);
      return;
    }

    if (sbomData) {
      setTrackedRepos(() => {
        const updates = new Map();

        Object.keys(sbomData).forEach((key) => {
          const repos = sbomData[key];

          repos.forEach((repo) => {
            updates.set(repo, true);
          });
        });

        return updates;
      });
      setTrackedReposLoading(false);
    }
  };

  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const posthog = usePostHog();
  const nameQuery = router.query.name as string;
  const descriptionQuery = router.query.description as string;
  const reposQuery = router.query.repos as string;
  const welcome = router.query.welcome as string;
  const sbom = (router.query.sbom as string) === "true";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const [trackedReposModalOpen, setTrackedReposModalOpen] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Map<string, boolean>>(new Map());
  const [trackedReposLoading, setTrackedReposLoading] = useState(false);

  useEffect(() => {
    if (sbom) {
      setTrackedReposLoading(true);
      setName(`SBOM for ${router.query.repo}`);
      loadSbomRepo(router.query.repo as string);
      return;
    }

    if (nameQuery) {
      setName(nameQuery);
    }

    if (reposQuery) {
      const queryRepos = JSON.parse(reposQuery) as string[];
      const reposMap = new Map<string, boolean>();
      queryRepos.forEach((repo) => {
        reposMap.set(repo, true);
      });
      setTrackedRepos(reposMap);
    }

    if (descriptionQuery) {
      setDescription(descriptionQuery);
    }
  }, [sbom, nameQuery, reposQuery, descriptionQuery]);

  useEffect(() => {
    if (welcome) {
      setIsWelcomeModalOpen(true);
    }
  }, [welcome]);

  const onCreateWorkspace: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    posthog.capture("clicked: finish Create Workspace");
    setIsSaving(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const { data: workspace, error } = await createWorkspace({
      name,
      description,
      // TODO: send members list
      members: [],
      sessionToken: sessionToken!,
      repos: Array.from(trackedRepos, ([repo]) => ({ full_name: repo })),
      contributors: [],
    });

    if (error || !workspace) {
      toast({ description: `Error creating new workspace. Please try again`, variant: "danger" });
    } else {
      toast({ description: `Workspace created successfully`, variant: "success" });
      document.dispatchEvent(new CustomEvent(WORKSPACE_UPDATED_EVENT, { detail: workspace }));
      router.push(`/workspaces/${workspace.id}`);
    }
    setIsSaving(false);
  };

  const TrackedReposModal = dynamic(() => import("components/Workspaces/TrackedReposModal"), {
    ssr: false,
  });

  return (
    <WorkspaceLayout
      workspaceId="new"
      footer={
        <AuthContentWrapper
          queryParams={{
            name,
            description,
            repos: JSON.stringify(Array.from(trackedRepos, ([repo]) => repo)),
          }}
        >
          <Button
            form="new-workspace"
            variant="primary"
            className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end"
            loading={isSaving}
            loadingText={"Creating Workspace..."}
          >
            Create Workspace
          </Button>
        </AuthContentWrapper>
      }
    >
      <div className="grid gap-6 max-w-4xl px-4 py-8 lg:pt-12 lg:px-16">
        <h1 className="border-b bottom pb-4 text-xl font-medium">Workspace Settings</h1>
        <form id="new-workspace" className="flex flex-col gap-6 mb-2" onSubmit={onCreateWorkspace}>
          <div>
            <h3 className="font-medium mb-2">
              Workspace Name <span className="text-red-600">*</span>
            </h3>
            <TextInput
              name="name"
              placeholder="Workspace name"
              className="!py-1.5 w-full text-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Workspace Description</h3>
            <TextInput
              name="description"
              placeholder="Workspace description"
              className="!py-1.5 w-full text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>

        <TrackedReposTable
          isLoading={trackedReposLoading}
          loadingMessage="Loading SBOM..."
          repositories={trackedRepos}
          onAddRepos={() => {
            posthog.capture("clicked: Add Repositories (Create workspace)");
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
      <WorkspaceWelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />
    </WorkspaceLayout>
  );
};

export default NewWorkspace;
