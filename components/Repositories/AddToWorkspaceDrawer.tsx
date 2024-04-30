import { MdWorkspaces } from "react-icons/md";
import Button from "components/shared/Button/button";
import { Drawer } from "components/shared/Drawer";

export default function AddToWorkspaceDrawer() {
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
      <h1>Hello</h1>
    </Drawer>
  );
}
