import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import { TrackedReposWizard } from "./TrackedRepoWizard/TrackedRepoWizard";

interface TrackedReposModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToTrackingList: (repos: Set<string>) => void;
  onCancel: () => void;
}

const TrackedReposModal = ({ isOpen, onClose, onAddToTrackingList, onCancel }: TrackedReposModalProps) => {
  const onCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal}>
        <TrackedReposWizard onAddToTrackingList={onAddToTrackingList} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default TrackedReposModal;
