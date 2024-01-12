import { useRouter } from "next/router";
import InviteTeamMembers from "components/Workspaces/InviteTeamMembers";
import TrackedOrgRepos from "components/Workspaces/TrackedOrgRepos";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { fetchApiData } from "helpers/fetchApiData";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";

async function saveWorkspace({
  workspaceId,
  name,
  description = "",
  sessionToken,
}: {
  workspaceId: string;
  name: string;
  description?: string;
  sessionToken: string;
}) {
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    method: "PATCH",
    body: { name, description },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}

const WorkspacePage = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [, workspaceId] = router.asPath.split("/");
  // const { data: workspace, error } = useWorkspace(workspaceId);

  function onAddOrgRepo() {
    alert("Add org repo");
  }

  function onInviteTeamMembers() {
    alert("Inviting team members");
  }

  return (
    <WorkspaceLayout>
      <h1 className="border-b bottom pb-4">Workspace Settings</h1>
      <form
        className="flex flex-col pt-6 gap-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const name = formData.get("name") as string;
          const description = formData.get("description") as string;
          const { data, error } = await saveWorkspace({
            workspaceId,
            name,
            description,
            sessionToken: sessionToken!,
          });

          if (error) {
            toast({ description: `Error creating new workspace. Please try again`, variant: "danger" });
          } else {
            toast({ description: `Workspace created successfully`, variant: "success" });
            router.push(`/workspaces/${data?.id}`);
          }
        }}
      >
        <label className="flex flex-col gap-4 w-max">
          <span>Workspace Name</span>
          <TextInput name="name" placeholder="Workspace name" required />
        </label>
        <label className="flex flex-col gap-4 w-max">
          <span>Workspace Description</span>
          <TextInput name="description" placeholder="Workspace description" />
        </label>
        <TrackedOrgRepos onAddOrgRepo={onAddOrgRepo} />
        <Button variant="primary" className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end">
          Save Workspace
        </Button>
      </form>
      <InviteTeamMembers onInviteTeamMembers={onInviteTeamMembers} />
    </WorkspaceLayout>
  );
};

export default WorkspacePage;
