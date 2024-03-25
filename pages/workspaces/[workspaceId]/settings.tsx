import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { ComponentProps, useState } from "react";
import dynamic from "next/dynamic";
import { useEffectOnce } from "react-use";
import { IoDiamond } from "react-icons/io5";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { fetchApiData } from "helpers/fetchApiData";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import {
  changeWorkspaceVisibility,
  deleteTrackedRepos,
  deleteWorkspace,
  saveWorkspace,
  upgradeWorkspace,
} from "lib/utils/workspace-utils";
import { WORKSPACE_UPDATED_EVENT } from "components/shared/AppSidebar/AppSidebar";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import WorkspaceVisibilityModal from "components/Workspaces/WorkspaceVisibilityModal";
import Card from "components/atoms/Card/card";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import { getStripe } from "lib/utils/stripe-client";
import WorkspaceMembersConfig from "components/Workspaces/WorkspaceMembersConfig/workspace-members-config";
import { useWorkspaceMembers } from "lib/hooks/api/useWorkspaceMembers";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";

const DeleteWorkspaceModal = dynamic(() => import("components/Workspaces/DeleteWorkspaceModal"), { ssr: false });
const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

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
    deleteCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME });

    if (error && (error.status === 404 || error.status === 401)) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`, {
      cause: error || sessionError,
    });
  }

  if (!data?.members.find((member) => member.user_id === Number(sessionData?.id) && member.role === "owner")) {
    return { notFound: true };
  }

  setCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME, value: workspaceId });

  return {
    props: {
      workspace: data,
      canDeleteWorkspace: sessionData && workspaceId !== sessionData.personal_workspace_id,
    },
  };
};

const WorkspaceSettings = ({ workspace, canDeleteWorkspace }: WorkspaceSettingsProps) => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(workspace.name);

  const [isPublic, setIsPublic] = useState(workspace.is_public);
  const [isWorkspaceVisibilityModalOpen, setIsWorkspaceVisibilityModalOpen] = useState(false);
  const [isWorkspaceUpgradeModalOpen, setIsWorkspaceUpgradeModalOpen] = useState(false);

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

  const {
    data: workspaceMembers,
    addMember,
    updateMember,
    deleteMember,
  } = useWorkspaceMembers({ workspaceId: workspace.id });

  useEffectOnce(() => {
    if (window.location.hash === "#load-wizard") {
      setTrackedReposModalOpen(true);
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

  const TrackedReposModal = dynamic(() => import("components/Workspaces/TrackedReposModal"), {
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
      contributors: [],
    });

    const workspaceRepoDeletes = await deleteTrackedRepos({
      workspaceId: workspace.id,
      sessionToken: sessionToken!,
      repos: Array.from(trackedReposPendingDeletion, (repo) => ({ full_name: repo })),
    });

    const [{ data, error }, { data: deletedRepos, error: reposDeleteError }] = await Promise.all([
      workspaceUpdate,
      workspaceRepoDeletes,
    ]);

    if (error || reposDeleteError) {
      toast({ description: `Workspace update failed`, variant: "danger" });
    } else {
      setWorkspaceName(name);
      document.dispatchEvent(new CustomEvent(WORKSPACE_UPDATED_EVENT, { detail: data }));
      await mutateTrackedRepos();

      setTrackedReposPendingDeletion(new Set());
      setTrackedRepos(new Map());

      router.push(`/workspaces/${workspace.id}`);
      toast({ description: `Workspace updated successfully`, variant: "success" });
    }
  };

  const upgradeThisWorkspace = async () => {
    const { data, error } = await upgradeWorkspace({ workspaceId: workspace.id, sessionToken: sessionToken! });
    if (error) {
      toast({ description: "There's been an error", variant: "danger" });
    }

    if (data) {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: data.sessionId as string });
    }
  };

  const changeVisibility = async () => {
    const { data, error } = await changeWorkspaceVisibility({
      workspaceId: workspace.id,
      sessionToken: sessionToken!,
      name: workspaceName,
      description: workspace.description,
      isPublic: !isPublic,
    });

    if (data) {
      toast({ description: "Workspace updated successfully", variant: "success" });
      setIsPublic(!isPublic);
    }
    if (error) {
      toast({ description: "There's been an error", variant: "danger" });
    }
  };

  return (
    <WorkspaceLayout
      workspaceId={workspace.id}
      footer={
        <Button
          variant="primary"
          className="flex gap-2.5 items-center cursor-pointer w-min sm:mt-0 self-end"
          form="update-workspace"
        >
          Update Workspace
        </Button>
      }
    >
      <WorkspaceHeader workspace={workspace} />
      <div className="grid gap-6">
        <div>
          <div className="flex justify-between items-center">
            <WorkspacesTabList workspaceId={workspace.id} selectedTab={""} />
          </div>
          <form id="update-workspace" className="flex flex-col pt-6 gap-6" onSubmit={updateWorkspace}>
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

        <ClientOnly>
          <WorkspaceMembersConfig
            onAddMember={async (username) => await addMember(workspace.id, sessionToken, username)}
            onUpdateMember={async (memberId, role) => await updateMember(workspace.id, sessionToken, memberId, role)}
            onDeleteMember={async (memberId) => await deleteMember(workspace.id, sessionToken, memberId)}
            members={workspaceMembers}
          />
        </ClientOnly>

        <div className="flex flex-col py-8 gap-4">
          <h2 className="!font-medium">Change Workspace Visibility</h2>
          <p className="text-sm text-slate-600">
            This workspace is set to {isPublic ? "public" : "private"}.{" "}
            {!workspace.payee_user_id && (
              <span>
                Setting this to private is a <span className="font-bold">paid</span> feature. Upgrade your Workspace to
                unlock this feature.
              </span>
            )}
          </p>

          <Button
            onClick={() => {
              if (workspace.payee_user_id) {
                setIsWorkspaceVisibilityModalOpen(true);
              } else {
                setIsWorkspaceUpgradeModalOpen(true);
              }
            }}
            variant="primary"
            className="w-fit"
          >
            Set to {isPublic ? "private" : "public"}
          </Button>
        </div>

        {workspace.payee_user_id ? (
          <section className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <h3 className="font-medium">Manage Subscription</h3>
              <div className="flex gap-2 items-center text-white px-3 py-2 bg-gradient-to-l from-gradient-orange-one to-gradient-orange-two rounded-full">
                <p className="text-sm font-medium">PRO</p>
                <IoDiamond />
              </div>
            </div>
            <p className="text-sm text-slate-600">This Workspace is currently subscribed to the PRO Workspace plan.</p>
            <Button href={process.env.NEXT_PUBLIC_STRIPE_SUB_CANCEL_URL} variant="primary" className="w-fit">
              Manage Subscription
            </Button>
          </section>
        ) : (
          <Card className="flex flex-col gap-4 px-6 pt-5 pb-6">
            <h2 className="text-md font-medium">Upgrade your workspace</h2>
            <div id="upgrade" className="flex gap-4">
              <FaRegCheckCircle className="text-light-grass-8 w-6 h-6" />
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Make your workspace private</h3>
                <p className="text-sm text-slate-500">
                  While our free workspaces are exclusively public, upgrading to a Pro workspace gives you the power to
                  choose between public or private settings for your projects.
                </p>
              </div>
            </div>
            <Button variant="primary" className="w-fit mt-2" onClick={upgradeThisWorkspace}>
              Upgrade Workspace
            </Button>
          </Card>
        )}

        {canDeleteWorkspace && (
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

        <WorkspaceVisibilityModal
          isOpen={isWorkspaceVisibilityModalOpen}
          workspaceName={workspaceName}
          initialIsPublic={isPublic}
          confirmChoice={() => {
            changeVisibility();
            setIsWorkspaceVisibilityModalOpen(false);
          }}
          onClose={() => setIsWorkspaceVisibilityModalOpen(false)}
          onCancel={() => setIsWorkspaceVisibilityModalOpen(false)}
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

        <InsightUpgradeModal
          variant="workspace"
          workspaceId={workspace.id}
          isOpen={isWorkspaceUpgradeModalOpen}
          onClose={() => setIsWorkspaceUpgradeModalOpen(false)}
        />
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceSettings;
