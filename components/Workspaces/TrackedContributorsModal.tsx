import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import { TrackedContributorsWizard } from "./TrackedContributorsWizard/TrackedContributorsWizard";

interface TrackedContributorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToTrackingList: (options: { data: Map<string, boolean>; type: "repositories" | "contributors" }) => void;
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
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal} onPointerDownOutside={onCloseModal}>
        <TrackedContributorsWizard onAddToTrackingList={onAddToTrackingList} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default TrackedContributorsModal;
