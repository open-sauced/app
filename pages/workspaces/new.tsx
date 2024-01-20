import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ComponentProps, useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import store from "lib/store";
import { TrackedReposTable } from "components/Workspaces/TrackedReposTable";
import { createWorkspace } from "lib/utils/workspace-utils";

const NewWorkspace = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { setWorkspaces, workspaces } = store(({ setWorkspaces, workspaces }) => ({ setWorkspaces, workspaces }));
  const [trackedReposModalOpen, setTrackedReposModalOpen] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<string[]>([]);

  const onCreateWorkspace: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const { data, error } = await createWorkspace({
      name,
      description,
      // TODO: send members list
      members: [],
      sessionToken: sessionToken!,
      repos: trackedRepos.map((repo) => ({ full_name: repo })),
    });

    if (error) {
      toast({ description: `Error creating new workspace. Please try again`, variant: "danger" });
    } else {
      toast({ description: `Workspace created successfully`, variant: "success" });
      data && setWorkspaces([...workspaces, data.workspace]);
      router.push(`/workspaces/${data?.workspace.id}/settings`);
    }
  };

  const TrackedReposModal = dynamic(() => import("components/Workspaces/TrackedReposModal"), {
    ssr: false,
  });

  return (
    <WorkspaceLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="border-b bottom pb-4">Workspace Settings</h1>
          <form className="flex flex-col pt-6 gap-6" onSubmit={onCreateWorkspace}>
            <TextInput
              name="name"
              label="Workspace Name"
              placeholder="Workspace name"
              className="w-full md:w-max"
              required
            />
            <TextInput
              name="description"
              label="Workspace Description"
              placeholder="Workspace description"
              className="w-full md:w-3/4 max-w-lg"
            />
            <div className="bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6">
              <Button
                variant="primary"
                className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end"
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </div>
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

            setTrackedRepos((repos) => repos.filter((r) => r !== repo));
          }}
        />
      </div>
      <TrackedReposModal
        isOpen={trackedReposModalOpen}
        onClose={() => {
          setTrackedReposModalOpen(false);
        }}
        onAddToTrackingList={(repos: string[]) => {
          setTrackedReposModalOpen(false);
          // TODO: Make this a map or object to be more efficient
          setTrackedRepos((trackedRepos) => [...trackedRepos, ...repos]);
        }}
        onCancel={() => {
          setTrackedReposModalOpen(false);
        }}
      />
    </WorkspaceLayout>
  );
};

export default NewWorkspace;
