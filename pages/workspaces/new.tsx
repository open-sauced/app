import InviteTeamMembers from "components/Workspaces/InviteTeamMembers";
import TrackedOrgRepos from "components/Workspaces/TrackedOrgRepos";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";

const NewWorkspace = () => {
  function onAddOrgRepo() {
    alert("Add org repo");
  }

  function onInviteTeamMembers() {
    alert("Inviting team members");
  }

  function createWorkspace() {
    alert("Creating workspace");
  }

  return (
    <WorkspaceLayout>
      <h1 className="border-b bottom pb-4">Workspace Settings</h1>
      <form
        className="flex flex-col pt-6 gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          createWorkspace();
        }}
      >
        <label className="flex flex-col gap-4 w-max">
          <span>Workspace Name</span>
          <TextInput placeholder="Workspace name" required />
        </label>
        <TrackedOrgRepos onAddOrgRepo={onAddOrgRepo} />
        <Button variant="primary" className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0 self-end">
          Create Workspace
        </Button>
      </form>
      <InviteTeamMembers onInviteTeamMembers={onInviteTeamMembers} />
    </WorkspaceLayout>
  );
};

export default NewWorkspace;
