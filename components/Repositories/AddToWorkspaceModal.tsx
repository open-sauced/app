import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import Button from "components/shared/Button/button";

type AddToWorkspaceModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
};

export default function AddToWorkspaceModal({ isOpen, onCloseModal }: AddToWorkspaceModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal}>
        <h1>Hello</h1>
        <Button variant="primary" onClick={onCloseModal}>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
}
