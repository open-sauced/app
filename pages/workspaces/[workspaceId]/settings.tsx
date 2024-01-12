import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
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

interface WorkspaceSettingsProps {
  workspace: Workspace;
}

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
    return { notFound: true };
  }

  return { props: { workspace: data } };
};

const WorkspaceSettings = ({ workspace }: WorkspaceSettingsProps) => {
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();

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
            workspaceId: workspace.id,
            name,
            description,
            sessionToken: sessionToken!,
          });

          if (error) {
            toast({ description: `Workspace update failed`, variant: "danger" });
          } else {
            toast({ description: `Workspace updated successfully`, variant: "success" });
          }
        }}
      >
        <label className="flex flex-col gap-4 w-max">
          <span>Workspace Name</span>
          <TextInput name="name" defaultValue={workspace.name} placeholder="Workspace name" required />
        </label>
        <label className="flex flex-col gap-4 w-max">
          <span>Workspace Description</span>
          <TextInput name="description" defaultValue={workspace.description} placeholder="Workspace description" />
        </label>
        <div className="bg-white sticky-bottom fixed bottom-0 right-0 self-end m-6">
          <Button variant="primary" className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end">
            Update Workspace
          </Button>
        </div>
      </form>
    </WorkspaceLayout>
  );
};

export default WorkspaceSettings;
