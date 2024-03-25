import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";

import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Button from "components/shared/Button/button";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import SingleSelect from "components/atoms/Select/single-select";

import { useUserOrganizations } from "lib/hooks/useUserOrganizations";
import { fetchGithubOrgTeams } from "lib/hooks/fetchGithubOrgTeams";
import { useToast } from "lib/hooks/useToast";

interface GitHubTeamSyncDialogProps {
  username: string | null;
  open: boolean;
  handleSync: (props: { follow: boolean; organization: string; teamSlug: string }) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

const GitHubTeamSyncDialog = ({
  open,
  handleClose,
  handleSync: handleImport,
  loading,
  username,
}: GitHubTeamSyncDialogProps) => {
  const [follow, setFollow] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [teamSlug, setTeamSlug] = useState("");
  const [teams, setTeams] = useState<GhOrgTeam[]>([]);

  const { data: userOrgs } = useUserOrganizations(username);
  const { toast } = useToast();

  async function loadTeams(org: string) {
    const response = await fetchGithubOrgTeams(org);

    setTeams([]);
    setTeamSlug("");

    if (response.isError) {
      toast({
        description:
          "There was error loading teams. Check your organization permissions and try logging out and re-connecting.",
        variant: "warning",
      });

      return;
    }

    setTeams(response.data);
  }

  useEffect(() => {
    if (selectedOrg) {
      loadTeams(selectedOrg);
    }
  }, [selectedOrg]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <div className="flex flex-col max-w-xs gap-6 w-max">
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-center p-2 bg-black rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <FiGithub size={24} className="text-blue-12" />
              </span>
            </span>
            <Title level={3} className="text-lg">
              Sync a GitHub Team
            </Title>
            <Text className="leading-tight text-light-slate-9">
              We will sync contributors from your team on GitHub to create your new list.
            </Text>
            <label className="flex mt-4 gap-4 items-center">
              <span>Organization</span>
              <SingleSelect
                options={userOrgs.map((userOrg) => ({
                  label: userOrg.organization_user.login,
                  value: `${userOrg.organization_user.login}`,
                }))}
                position="popper"
                value={selectedOrg}
                placeholder="Select an organization"
                onValueChange={(value) => setSelectedOrg(value)}
              />
            </label>
            <label className="flex gap-4 items-center">
              <span>Team</span>
              <SingleSelect
                options={teams.map((team) => ({ label: team.name, value: team.slug }))}
                position="popper"
                value={teamSlug}
                placeholder="Select a team"
                onValueChange={(value) => setTeamSlug(value)}
              />
            </label>
            <label className="flex">
              <ToggleSwitch
                ariaLabelledBy="import-users-explainer"
                name="followImported"
                classNames="mr-2"
                checked={follow}
                handleToggle={() => setFollow((toFollow) => !toFollow)}
              />
              <Text className="leading-tight text-light-slate-9">
                <span id="import-users-explainer">Follow everyone imported.</span>
              </Text>
            </label>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => handleClose()} className="justify-center flex-1" variant="text">
              Go Back
            </Button>
            <Button
              onClick={() => handleImport({ follow, organization: selectedOrg, teamSlug })}
              loading={loading}
              className="justify-center flex-1"
              variant="primary"
              disabled={!teamSlug}
            >
              Sync Team
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubTeamSyncDialog;
