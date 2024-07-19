import { MdWorkspaces } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";
import { usePostHog } from "posthog-js/react";
import Button from "components/shared/Button/button";
import { Drawer } from "components/shared/Drawer";
import { useToast } from "lib/hooks/useToast";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useWorkspaces from "lib/hooks/api/useWorkspaces";
import { fetchApiData } from "helpers/fetchApiData";
import SingleSelect from "components/atoms/Select/single-select";
import Text from "components/atoms/Typography/text";

export default function AddToWorkspaceDrawer({ repository }: { repository: string }) {
  const router = useRouter();
  const posthog = usePostHog();
  const { toast } = useToast();
  const { signIn, user, sessionToken } = useSupabaseAuth();
  const [workspaceId, setWorkspaceId] = useState("new");
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ load: !!user, limit: 100 });

  const [host, setHost] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  const addRepositoryToWorkspace = async () => {
    posthog.capture(`Repo Pages: added to ${workspaceId === "new" ? "a new" : "existing"} workspace`, {
      repository,
      workspaceId,
    });
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
        <div className="flex flex-col gap-4 text-center">
          <img
            src="/assets/workspace_overview.png"
            alt="Workspace screenshot from documentation"
            className="border-2 border-light-orange-9 shadow-md rounded-lg"
          />
          <Text>
            Keep track of repositories and contributors easily with our new feature
            <span className="font-semibold"> Workspaces!</span> If you&apos;ve used OpenSauced before, your insights and
            lists are now part of your personal workspace.
          </Text>
          <p className="font-medium text-light-orange-10">
            Create a new workspace with this repository and explore open source like never before!
          </p>
          <Button
            variant="primary"
            className="w-fit gap-2 self-center"
            onClick={() => {
              signIn({
                provider: "github",
                options: { redirectTo: `${host}/workspaces/new?repos=${JSON.stringify([repository])}` },
              });
            }}
          >
            <BsGithub className="w-5 h-5" />
            Connect with GitHub
          </Button>
        </div>
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
          <Button onClick={addRepositoryToWorkspace} variant="primary" className="w-full !grid">
            Confirm
          </Button>
        </>
      )}
    </Drawer>
  );
}
