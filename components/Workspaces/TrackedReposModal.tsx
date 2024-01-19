import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import { TrackedReposWizard } from "./TrackedRepoWizard/TrackedRepoWizard";

interface TrackedReposModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackedReposCount: number;
  onAddToTrackingList: () => void;
  onSearchRepos: (searchTerm: string) => void;
  onCancel: () => void;
}

const TrackedReposModal = ({
  isOpen,
  onClose,
  trackedReposCount,
  onAddToTrackingList,
  onSearchRepos,
  onCancel,
}: TrackedReposModalProps) => {
  const isLoading = false;

  const onCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal}>
        <TrackedReposWizard
          trackedReposCount={trackedReposCount}
          onAddToTrackingList={onAddToTrackingList}
          onSearchRepos={onSearchRepos}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TrackedReposModal;
