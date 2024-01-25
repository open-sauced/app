import React, { FC, useState } from "react";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogContent, DialogTitle } from "components/molecules/Dialog/dialog";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitted: boolean;
  listName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

const DeleteListPageModal: FC<ModalProps> = ({
  open = false,
  setOpen,
  submitted = false,
  listName,
  onConfirm,
  onClose,
  isLoading,
}) => {
  const [input, setInput] = useState("");

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOnClose = async () => {
    onClose();
  };

  const handleOnConfirm = async () => {
    if (input !== listName) return;
    await onConfirm();
  };

  const disabled = input !== listName || submitted;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-1 gap-4 p-4 max-w-[90%] lg:max-w-xl rounded-t-lg">
        <DialogTitle>
          <Title level={3}>Delete List</Title>
        </DialogTitle>

        <Text>
          Are you sure you want to delete <span className="font-bold text-light-slate-12">{listName}</span>? If you have
          data on this list that your team is using, they will lose access.
        </Text>
        <Text className="font-bold text-light-slate-12">This action cannot be undone</Text>
        <Text>
          Type <span className="font-bold text-light-red-10">{listName}</span> to confirm
        </Text>

        <TextInput disabled={isLoading} value={input} onChange={handleOnNameChange} />

        <div className="flex gap-3">
          <Button loading={isLoading} disabled={disabled} onClick={handleOnConfirm} variant="destructive">
            Delete
          </Button>
          <Button
            onClick={handleOnClose}
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

export default DeleteListPageModal;
