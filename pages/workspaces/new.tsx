import InviteTeamMembers from "components/Workspaces/InviteTeamMembers";
import TrackedOrgRepos from "components/Workspaces/TrackedOrgRepos";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import TextInput from "components/atoms/TextInput/text-input";

const NewWorkspace = () => {
  function onAddOrgRepo() {
    alert("Add org repo");
  }

  function onInviteTeamMembers() {
    alert("Inviting team members");
  }

  return (
    <WorkspaceLayout>
      <h1 className="border-b bottom">Workspace Settings</h1>
      <form className="grid grid-cols-1 pt-6 gap-6">
        <label className="flex flex-col gap-4 w-max">
          <span>Workspace Name</span>
          <TextInput placeholder="Workspace name" />
        </label>
        <TrackedOrgRepos onAddOrgRepo={onAddOrgRepo} />
        <InviteTeamMembers onInviteTeamMembers={onInviteTeamMembers} />
      </form>
    </WorkspaceLayout>
  );
};

export default NewWorkspace;
