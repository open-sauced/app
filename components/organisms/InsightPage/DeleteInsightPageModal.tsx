import { FC, useState } from "react";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogContent, DialogTitle } from "components/molecules/Dialog/dialog";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitted: boolean;
  pageName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

const DeleteInsightPageModal: FC<ModalProps> = ({
  open = false,
  setOpen,
  submitted = false,
  pageName,
  onConfirm,
  onClose,
  isLoading,
}) => {
  const [input, setInput] = useState("");

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOnConfirm = async () => {
    if (input !== "DELETE") return;
    await onConfirm();
  };

  const handleOnClose = async () => {
    onClose();
  };

  const disabled = input !== "DELETE" || submitted;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-1 gap-4 p-4 max-w-[90%] lg:max-w-xl rounded-t-lg">
        <DialogTitle>
          <Title level={3}>Delete Page</Title>
        </DialogTitle>

        <Text>
          Are you sure you want to delete <span className="font-bold text-light-slate-12">{`${pageName}`}</span>? If you
          have data on this page that your team is using it would be difficult for your team to get access to track your
          project.
        </Text>
        <Text>
          {" "}
          <span className="font-bold text-light-slate-12">This action cannot be undone</span>
        </Text>
        <Text>
          Type <span className="font-bold text-light-red-10">DELETE</span> in all caps to confirm
        </Text>

        <TextInput disabled={isLoading} onChange={handleOnNameChange} value={input} />

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

export default DeleteInsightPageModal;
