import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ComponentProps, useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";
import { createWorkspace } from "lib/utils/workspace-utils";
import { WORKSPACE_UPDATED_EVENT } from "components/shared/AppSidebar/AppSidebar";

const NewWorkspace = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [trackedReposModalOpen, setTrackedReposModalOpen] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Map<string, boolean>>(new Map());

  const onCreateWorkspace: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
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
    });

    if (error || !workspace) {
      toast({ description: `Error creating new workspace. Please try again`, variant: "danger" });
    } else {
      toast({ description: `Workspace created successfully`, variant: "success" });
      document.dispatchEvent(new CustomEvent(WORKSPACE_UPDATED_EVENT, { detail: workspace }));
      router.push(`/workspaces/${workspace.id}/repositories`);
    }
  };

  const TrackedReposModal = dynamic(() => import("components/Workspaces/TrackedReposModal"), {
    ssr: false,
  });

  return (
    <WorkspaceLayout workspaceId={null}>
      <div className="grid gap-6 max-w-4xl">
        <h1 className="border-b bottom pb-4 text-xl font-medium">Workspace Settings</h1>
        <form className="flex flex-col gap-6 mb-2" onSubmit={onCreateWorkspace}>
          <div>
            <h3 className="font-medium mb-2">
              Workspace Name <span className="text-red-600">*</span>
            </h3>
            <TextInput name="name" placeholder="Workspace name" className="!py-1.5 w-full text-sm" required />
          </div>
          <div>
            <h3 className="font-medium mb-2">Workspace Description</h3>
            <TextInput name="description" placeholder="Workspace description" className="!py-1.5 w-full text-sm" />
          </div>
          <div className="bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6">
            <Button variant="primary" className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end">
              Create Workspace
            </Button>
          </div>
        </form>

        <TrackedReposTable
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

export default NewWorkspace;
