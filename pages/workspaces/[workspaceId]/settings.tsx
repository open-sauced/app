import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { ComponentProps, useState } from "react";
import dynamic from "next/dynamic";
import { SquareFillIcon } from "@primer/octicons-react";
import { useEffectOnce } from "react-use";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { fetchApiData } from "helpers/fetchApiData";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import {
  WORKSPACE_ID_COOKIE_NAME,
  deleteTrackedContributors,
  deleteTrackedRepos,
  deleteWorkspace,
  saveWorkspace,
} from "lib/utils/workspace-utils";
import { WORKSPACE_UPDATED_EVENT } from "components/shared/AppSidebar/AppSidebar";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { useGetWorkspaceContributors } from "lib/hooks/api/useGetWorkspaceContributors";
import { TrackedContributorsTable } from "components/Workspaces/TrackedContributorsTable";
import { deleteCookie } from "lib/utils/server/cookies";

const DeleteWorkspaceModal = dynamic(() => import("components/Workspaces/DeleteWorkspaceModal"), { ssr: false });

interface WorkspaceSettingsProps {
  workspace: Workspace;
  canDeleteWorkspace: boolean;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const [{ data, error }, { data: sessionData, error: sessionError }] = await Promise.all([
    fetchApiData<Workspace>({
      path: `workspaces/${workspaceId}`,
      bearerToken,
      pathValidator: () => true,
    }),
    fetchApiData<DbUser>({
      path: "auth/session",
      bearerToken,
      pathValidator: () => true,
    }),
  ]);

  if (error || sessionError) {
    deleteCookie(context.res, WORKSPACE_ID_COOKIE_NAME);

    if ((error && (error.status === 404 || error.status === 401)) || sessionError) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`, {
      cause: error || sessionError,
    });
  }

  return {
    props: { workspace: data, canDeleteWorkspace: sessionData && workspaceId !== sessionData.personal_workspace_id },
  };
};

const WorkspaceSettings = ({ workspace, canDeleteWorkspace }: WorkspaceSettingsProps) => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(workspace.name);

  const [trackedReposModalOpen, setTrackedReposModalOpen] = useState(false);
  const {
    data,
    error,
    mutate: mutateTrackedRepos,
    isLoading,
  } = useGetWorkspaceRepositories({ workspaceId: workspace.id });
  const initialTrackedRepos: string[] = data?.data?.map(({ repo }) => repo.full_name) ?? [];
  const [trackedRepos, setTrackedRepos] = useState<Map<string, boolean>>(new Map());
  const [trackedReposPendingDeletion, setTrackedReposPendingDeletion] = useState<Set<string>>(new Set());

  const [trackedContributorsModalOpen, setTrackedContributorsModalOpen] = useState(false);
  const {
    data: contributorData,
    error: contributorError,
    mutate: mutateTrackedContributors,
    isLoading: isContributorsLoading,
  } = useGetWorkspaceContributors({ workspaceId: workspace.id });

  const initialTrackedContributors: string[] = contributorData?.data?.map(({ contributor }) => contributor.login) ?? [];
  const [trackedContributors, setTrackedContributors] = useState<Map<string, boolean>>(new Map());
  const [trackedContributorsPendingDeletion, setTrackedContributorsPendingDeletion] = useState<Set<string>>(new Set());

  useEffectOnce(() => {
    if (window.location.hash === "#load-wizard") {
      setTrackedReposModalOpen(true);
    } else if (window.location.hash === "#load-contributors-wizard") {
      setTrackedContributorsModalOpen(true);
    }
  });

  // initial tracked repos + newly selected tracked repos that are not pending deletion
  const pendingTrackedRepos = new Map([
    ...initialTrackedRepos.map((repo) => [repo, true] as const),
    ...trackedRepos.entries(),
  ]);

  pendingTrackedRepos.forEach((isSelected, repo) => {
    if (trackedReposPendingDeletion.has(repo)) {
      pendingTrackedRepos.delete(repo);
    }
  });

  const pendingTrackedContributors = new Map([
    ...initialTrackedContributors.map((contributor) => [contributor, true] as const),
    ...trackedContributors.entries(),
  ]);

  pendingTrackedContributors.forEach((isSelected, contributor) => {
    if (trackedContributorsPendingDeletion.has(contributor)) {
      pendingTrackedContributors.delete(contributor);
    }
  });

  const TrackedReposModal = dynamic(() => import("components/Workspaces/TrackedReposModal"), {
    ssr: false,
  });

  const TrackedContributorsModal = dynamic(() => import("components/Workspaces/TrackedContributorsModal"), {
    ssr: false,
  });

  const updateWorkspace: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const workspaceUpdate = await saveWorkspace({
      workspaceId: workspace.id,
      name,
      description,
      sessionToken: sessionToken!,
      repos: Array.from(trackedRepos, ([repo]) => ({ full_name: repo })),
      contributors: Array.from(trackedContributors, ([contributor]) => ({ login: contributor })),
    });

    const workspaceRepoDeletes = await deleteTrackedRepos({
      workspaceId: workspace.id,
      sessionToken: sessionToken!,
      repos: Array.from(trackedReposPendingDeletion, (repo) => ({ full_name: repo })),
    });

    const workspaceContributorDeletes = await deleteTrackedContributors({
      workspaceId: workspace.id,
      sessionToken: sessionToken!,
      contributors: Array.from(trackedContributorsPendingDeletion, (contributor) => ({ login: contributor })),
    });

    const [
      { data, error },
      { data: deletedRepos, error: reposDeleteError },
      { data: deletedContributors, error: contributorsDeleteError },
    ] = await Promise.all([workspaceUpdate, workspaceRepoDeletes, workspaceContributorDeletes]);

    if (error || reposDeleteError || contributorsDeleteError) {
      toast({ description: `Workspace update failed`, variant: "danger" });
    } else {
      setWorkspaceName(name);
      document.dispatchEvent(new CustomEvent(WORKSPACE_UPDATED_EVENT, { detail: data }));
      await mutateTrackedRepos();
      await mutateTrackedContributors();

      setTrackedReposPendingDeletion(new Set());
      setTrackedRepos(new Map());

      setTrackedContributorsPendingDeletion(new Set());
      setTrackedContributors(new Map());

      toast({ description: `Workspace updated successfully`, variant: "success" });
    }
  };

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <section className="w-full flex justify-between items-center">
        <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
          {/* putting a square icon here as a placeholder until we implement workspace logos */}
          <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
          <span>{workspace.name}</span>
        </h1>

        <div className="flex gap-4 w-fit">
          <Button variant="primary" href={`/workspaces/${workspace.id}/settings`} className="gap-2 items-center">
            <FaEdit />
            Edit
          </Button>
        </div>
      </section>
      <div className="grid gap-6">
        <div>
          <div className="flex justify-between items-center">
            <WorkspacesTabList workspaceId={workspace.id} selectedTab={""} />
          </div>
          <form className="flex flex-col pt-6 gap-6" onSubmit={updateWorkspace}>
            <TextInput
              name="name"
              label="Workspace Name"
              defaultValue={workspace.name}
              placeholder="Workspace name"
              className="w-full md:w-max"
              required
            />
            <TextInput
              name="description"
              label="Workspace Description"
              defaultValue={workspace.description}
              placeholder="Workspace description"
              className="w-full md:w-3/4 max-w-lg"
            />
            <div className="bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6">
              <Button
                variant="primary"
                className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end"
              >
                Update Workspace
              </Button>
            </div>
          </form>
        </div>
        <TrackedReposTable
          isLoading={isLoading}
          repositories={pendingTrackedRepos}
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

            setTrackedRepos((repos) => {
              const updates = new Map([...repos]);
              updates.delete(repo);

              return updates;
            });
            setTrackedReposPendingDeletion((repos) => new Set([...repos, repo]));
          }}
        />

        <TrackedContributorsTable
          isLoading={isContributorsLoading}
          contributors={pendingTrackedContributors}
          onAddContributors={() => {
            setTrackedContributorsModalOpen(true);
          }}
          onRemoveTrackedContributor={(event) => {
            const { contributor } = event.currentTarget.dataset;

            if (!contributor) {
              // eslint-disable-next-line no-console
              console.error("The tracked contributor to remove was not found");
              return;
            }

            setTrackedContributors((contributors) => {
              const updates = new Map([...contributors]);
              updates.delete(contributor);

              return updates;
            });
            setTrackedContributorsPendingDeletion((contributors) => new Set([...contributors, contributor]));
          }}
        />

        {canDeleteWorkspace ? (
          <div className="flex flex-col gap-4">
            <Title className="!text-1xl !leading-none py-6" level={4}>
              Danger Zone
            </Title>

            <div className="flex flex-col p-6 rounded-2xl bg-light-slate-4">
              <Title className="!text-1xl !leading-none !border-light-slate-8 border-b pb-4" level={4}>
                Delete Workspace
              </Title>
              <Text className="my-4">Once you delete a workspace, you&#39;re past the point of no return.</Text>

              <div>
                <Button onClick={() => setIsDeleteModalOpen(true)} variant="destructive">
                  Delete workspace
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        <TrackedReposModal
          isOpen={trackedReposModalOpen}
          onClose={() => {
            setTrackedReposModalOpen(false);
          }}
          onAddToTrackingList={(repos) => {
            setTrackedReposModalOpen(false);
            setTrackedRepos((trackedRepos) => {
              const updates = new Map(trackedRepos);

              repos.forEach((isSelected, repo) => {
                if (isSelected) {
                  updates.set(repo, true);
                } else {
                  updates.delete(repo);
                }
              });

              return updates;
            });
          }}
          onCancel={() => {
            setTrackedReposModalOpen(false);
          }}
        />

        <TrackedContributorsModal
          isOpen={trackedContributorsModalOpen}
          onClose={() => {
            setTrackedContributorsModalOpen(false);
          }}
          onAddToTrackingList={(contributors) => {
            setTrackedContributorsModalOpen(false);
            setTrackedContributors((trackedContributors) => {
              const updates = new Map(trackedContributors);

              contributors.forEach((isSelected, contributor) => {
                if (isSelected) {
                  updates.set(contributor, true);
                } else {
                  updates.delete(contributor);
                }
              });

              return updates;
            });
          }}
          onCancel={() => {
            setTrackedContributorsModalOpen(false);
          }}
        />

        {canDeleteWorkspace ? (
          <DeleteWorkspaceModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            workspaceName={workspaceName}
            onDelete={async () => {
              const { error } = await deleteWorkspace({ workspaceId: workspace.id, sessionToken: sessionToken! });
              if (error) {
                toast({ description: `Workspace delete failed`, variant: "danger" });
              } else {
                toast({ description: `Workspace deleted successfully`, variant: "success" });
                router.push("/workspaces/new");
              }
            }}
          />
        ) : null}
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceSettings;
