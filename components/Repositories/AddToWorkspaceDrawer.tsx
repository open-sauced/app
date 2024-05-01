import { MdWorkspaces } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "components/shared/Button/button";
import { Drawer } from "components/shared/Drawer";
import { useToast } from "lib/hooks/useToast";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useWorkspaces from "lib/hooks/api/useWorkspaces";
import { fetchApiData } from "helpers/fetchApiData";
import SingleSelect from "components/atoms/Select/single-select";

export default function AddToWorkspaceDrawer({ repository }: { repository: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, sessionToken } = useSupabaseAuth();
  const [workspaceId, setWorkspaceId] = useState("new");
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ load: !!user, limit: 100 });

  const addRepositoryToWorkspace = async () => {
    if (workspaceId === "new") {
      router.push(`/workspaces/new?repos=${JSON.stringify([repository])}`);
      return;
    }

    const { data, error } = await fetchApiData<Workspace>({
      method: "POST",
      path: `workspaces/${workspaceId}/repos/${repository}`,
      body: {}, // empty body needed to avoid error
      bearerToken: sessionToken!,
      pathValidator: () => true,
    });

    if (error) {
      toast({ description: `Error adding repository to the workspace. Please try again`, variant: "danger" });
    } else {
      toast({ description: `Added repository successfully`, variant: "success" });
    }
  };
  return (
    <Drawer
      title="Add repository to Workspace"
      description="Create a new workspace or add to an existing one."
      showCloseButton
      trigger={
        <Button variant="primary" className="shrink-0 items-center gap-3 w-fit">
          <MdWorkspaces />
          Add to Workspace
        </Button>
      }
    >
      {!user ? (
        <>
          <Button variant="primary" href="/start">
            Get started with Github
          </Button>
        </>
      ) : (
        <>
          {workspacesLoading ? (
            <p>Loading...</p>
          ) : (
            <SingleSelect
              options={[
                { label: "Create new workspace...", value: "new" },
                ...workspaces.map(({ id, name }) => ({
                  label: name,
                  value: id,
                })),
              ]}
              position="popper"
              value={workspaceId ?? "new"}
              placeholder="Select a workspace"
              onValueChange={(value) => {
                setWorkspaceId(value);
              }}
            />
          )}
          <Button onClick={addRepositoryToWorkspace} variant="primary" className="w-fit self-end">
            Confirm
          </Button>
        </>
      )}
    </Drawer>
  );
}
