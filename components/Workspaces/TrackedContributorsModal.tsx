import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import { TrackedContributorsWizard } from "./TrackedContributorsWizard/TrackedContributorsWizard";

interface TrackedContributorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToTrackingList: (contributors: Map<string, boolean>) => void;
  onCancel: () => void;
}

const TrackedContributorsModal = ({
  isOpen,
  onClose,
  onAddToTrackingList,
  onCancel,
}: TrackedContributorsModalProps) => {
  const onCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal}>
        <TrackedContributorsWizard
          onAddToTrackingList={onAddToTrackingList}
          onCancel={onCancel}
          onCloseModal={onCloseModal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TrackedContributorsModal;
