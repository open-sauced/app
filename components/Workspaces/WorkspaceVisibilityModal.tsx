import Button from "components/shared/Button/button";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogTitle, DialogContent } from "components/molecules/Dialog/dialog";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";

interface WorkspaceVisibilityModalProps {
  workspaceName: string;
  initialIsPublic: boolean;
  confirmChoice: () => void;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
}

const WorkspaceVisibilityModal = ({
  workspaceName,
  initialIsPublic,
  confirmChoice,
  isOpen,
  onClose,
  onCancel,
}: WorkspaceVisibilityModalProps) => {
  const onCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal} onPointerDownOutside={onCloseModal}>
        <Card className="!p-0 max-w-3xl">
          {/* Using !p-0 for now as the Card component has explicit padding of p-3. We can revisit. */}
          <div style={{ minWidth: "712px" }}>
            <div className="flex flex-col justify-between gap-4 p-8">
              <DialogTitle>
                <Title level={3}>Make Workspace {initialIsPublic ? "Private" : "Public"}</Title>
              </DialogTitle>
              <Text>
                When set to public, anybody can read your tracked repositories, contributors, and insights in the
                workspace. Setting this to private will only allow members to access this workspace.
              </Text>

              <Text className="font-bold text-light-red-10">
                Are you sure you want to set {workspaceName} to {initialIsPublic ? "private" : "public"}?
              </Text>
              <div className="flex gap-4">
                <Button className="w-fit" variant="destructive" onClick={confirmChoice}>
                  Yes, set to {initialIsPublic ? "private" : "public"}
                </Button>
                <Button
                  className="bg-light-slate-6 text-light-slate-10 hover:bg-light-slate-7"
                  variant="default"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceVisibilityModal;
