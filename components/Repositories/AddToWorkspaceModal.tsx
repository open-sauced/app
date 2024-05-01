import { useState } from "react";
import { useRouter } from "next/router";
import Card from "components/atoms/Card/card";
import SingleSelect from "components/atoms/Select/single-select";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import Button from "components/shared/Button/button";
import { fetchApiData } from "helpers/fetchApiData";
import useWorkspaces from "lib/hooks/api/useWorkspaces";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";

type AddToWorkspaceModalProps = {
  repository: string;
  isOpen: boolean;
  onCloseModal: () => void;
};

export default function AddToWorkspaceModal({ repository, isOpen, onCloseModal }: AddToWorkspaceModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { user, sessionToken } = useSupabaseAuth();
  const [workspaceId, setWorkspaceId] = useState("new");
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ load: !!user, limit: 100 });

  const addRepositoryToWorkspace = async () => {
    if (workspaceId === "new") {
      router.push(`/workspaces/new?repos=${JSON.stringify([repository])}`);
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
      onCloseModal();
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal} onInteractOutside={onCloseModal}>
        <Card heading={<h1 className="text-xl font-semibold">Add to workspace</h1>}>
          <div className="flex flex-col gap-4 w-full min-w-[32rem] h-full max-h-96 px-8 py-4">
            {!user ? (
              <>
                <Button variant="primary" href="/start">
                  Get started with Github
                </Button>
              </>
            ) : (
              <>
                <p>Select workspace to add {repository}</p>
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
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
