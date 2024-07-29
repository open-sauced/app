import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";
import { usePostHog } from "posthog-js/react";
import SingleSelect from "components/atoms/Select/single-select";
import Button from "components/shared/Button/button";
import { fetchApiData } from "helpers/fetchApiData";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import Text from "components/atoms/Typography/text";
import { useFetchAllLists } from "lib/hooks/useList";
import useWorkspaces from "lib/hooks/api/useWorkspaces";
import { Drawer } from "components/shared/Drawer";

type AddToContributorInsightDrawerProps = {
  repository: string;
  contributors: string[];
  isOpen: boolean;
  onCloseModal: () => void;
};

export default function AddToContributorInsightDrawer({
  repository,
  contributors,
  isOpen,
  onCloseModal,
}: AddToContributorInsightDrawerProps) {
  const { toast } = useToast();
  const router = useRouter();
  const posthog = usePostHog();
  const { signIn, user, sessionToken } = useSupabaseAuth();
  const { data: contributorInsights, isLoading } = useFetchAllLists();
  const [workspaceId, setWorkspaceId] = useState("new");
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ load: !!user, limit: 100 });

  const [selectedInsight, setSelectedInsight] = useState("new");

  const [host, setHost] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  const addToContributorInsight = async () => {
    posthog.capture(`Repo Pages: add to contributor insight`, {
      repository,
      count: contributors.length,
    });

    const { error } = await fetchApiData({
      method: "POST",
      path: `lists/${selectedInsight}/contributors`,
      body: {
        contributors: contributors.map((contributor) => {
          return { login: contributor };
        }),
      },
      bearerToken: sessionToken!,
      pathValidator: () => true,
    });

    if (error) {
      toast({ description: `Error adding contributors to the insight. Please try again`, variant: "danger" });
    } else {
      toast({ description: `Added contributors successfully`, variant: "success" });
      onCloseModal();
    }
  };

  const createContributorInsight = async () => {
    posthog.capture(`Repo Pages: create new contributor insight`, {
      repository,
      count: contributors.length,
    });

    router.push(`/workspaces/${workspaceId}/contributor-insights/new?contributors=${JSON.stringify(contributors)}`);
    return;
  };

  return (
    <Drawer
      title="Add repository to Workspace"
      description="Create a new workspace or add to an existing one."
      showCloseButton
      trigger={
        <Button variant="primary" className="shrink-0 items-center gap-3 w-fit">
          Add to Insight
        </Button>
      }
    >
      <div className="flex flex-col gap-4 w-[32rem] h-full px-8 py-4">
        {!user ? (
          <div className="flex flex-col gap-4 text-center">
            <img
              src="/assets/workspace_overview.png"
              alt="Workspace screenshot from documentation"
              className="border-2 border-light-orange-9 shadow-md rounded-lg"
            />
            <Text>
              Keep track of repositories and contributors easily with our new feature
              <span className="font-semibold"> Workspaces!</span> If you&apos;ve used OpenSauced before, your insights
              and lists are now part of your personal workspace.
            </Text>
            <p className="font-medium text-light-orange-10">
              Create a new contributor insight on a workspace and explore open source like never before!
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
            <p>Create a new contributor insight or add to an existing one.</p>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <SingleSelect
                options={[
                  { label: "Create new insight...", value: "new" },
                  ...contributorInsights.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })),
                ]}
                value={selectedInsight ?? "new"}
                placeholder="Select a workspace"
                onValueChange={(value) => {
                  setSelectedInsight(value);
                }}
              />
            )}

            {selectedInsight === "new" && workspacesLoading ? (
              <p>Loading...</p>
            ) : (
              <SingleSelect
                options={[
                  ...workspaces.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })),
                ]}
                value={workspaceId}
                placeholder="Select a workspace"
                onValueChange={(value) => {
                  setWorkspaceId(value);
                }}
              />
            )}

            <Button
              onClick={selectedInsight === "new" ? createContributorInsight : addToContributorInsight}
              variant="primary"
              className="w-fit self-end"
            >
              Confirm
            </Button>
          </>
        )}
      </div>
    </Drawer>
  );
}
