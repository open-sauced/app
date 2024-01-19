import { useRouter } from "next/router";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { fetchApiData } from "helpers/fetchApiData";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import store from "lib/store";

async function createWorkspace({
  name,
  description = "",
  members = [],
  sessionToken,
}: {
  name: string;
  description?: string;
  members?: any[];
  sessionToken: string;
}) {
  const { data, error } = await fetchApiData<Workspace>({
    path: "workspaces",
    method: "POST",
    body: { name, description, members },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}

const NewWorkspace = () => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { setWorkspaces, workspaces } = store(({ setWorkspaces, workspaces }) => ({ setWorkspaces, workspaces }));

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
          // TODO: send members list
          const { data, error } = await createWorkspace({
            name,
            description,
            members: [],
            sessionToken: sessionToken!,
          });

          if (error) {
            toast({ description: `Error creating new workspace. Please try again`, variant: "danger" });
          } else {
            toast({ description: `Workspace created successfully`, variant: "success" });
            data && setWorkspaces([...workspaces, data]);
            router.push(`/workspaces/${data?.id}/settings`);
          }
        }}
      >
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
          <Button variant="primary" className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end">
            Create Workspace
          </Button>
        </div>
      </form>
    </WorkspaceLayout>
  );
};

export default NewWorkspace;
