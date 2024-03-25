import { useState } from "react";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogContent, DialogTitle } from "components/molecules/Dialog/dialog";

interface DeleteWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  workspaceName: string;
}

const DeleteWorkspaceModal = ({ isOpen, onClose, onDelete, workspaceName }: DeleteWorkspaceModalProps) => {
  const isLoading = false;
  const [deleteWord, setDeleteWord] = useState<string | undefined>();
  const disabled = deleteWord !== "DELETE";

  const onCloseModal = () => {
    setDeleteWord("");
    onClose();
  };

  const onDeleteModal = () => {
    onDelete();
    onCloseModal();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="grid grid-cols-1 gap-4 p-4 max-w-[90%] lg:max-w-xl rounded-t-lg"
        onEscapeKeyDown={onCloseModal}
      >
        <DialogTitle>
          <Title level={3}>Delete Workspace</Title>
        </DialogTitle>

        <Text>
          Are you sure you want to delete <span className="font-bold text-light-slate-12">{`${workspaceName}`}</span>?
          If you have data in this workspace that your team is using it will be lost.
        </Text>
        <Text>
          <span className="font-bold text-light-slate-12">This action cannot be undone</span>
        </Text>
        <Text>
          Type <span className="font-bold text-light-red-10">DELETE</span> in all caps to confirm
        </Text>

        <TextInput
          disabled={isLoading}
          onChange={(event) => {
            setDeleteWord(event.target.value);
          }}
          value={deleteWord}
        />

        <div className="flex gap-3">
          <Button loading={isLoading} disabled={disabled} onClick={onDeleteModal} variant="destructive">
            Delete
          </Button>
          <Button
            onClick={onCloseModal}
            variant="default"
            className="bg-light-slate-6 text-light-slate-10 hover:bg-light-slate-7"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkspaceModal;
