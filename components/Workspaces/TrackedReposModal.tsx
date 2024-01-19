import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import { TrackedReposWizard } from "./TrackedRepoWizard/TrackedRepoWizard";

interface TrackedReposModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackedReposCount: number;
  onAddToTrackingList: () => void;
  onCancel: () => void;
}

const TrackedReposModal = ({
  isOpen,
  onClose,
  trackedReposCount,
  onAddToTrackingList,
  onCancel,
}: TrackedReposModalProps) => {
  const onCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal}>
        <TrackedReposWizard
          trackedReposCount={trackedReposCount}
          onAddToTrackingList={onAddToTrackingList}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TrackedReposModal;
