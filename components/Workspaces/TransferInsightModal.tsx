import { useState } from "react";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogContent, DialogTitle } from "components/molecules/Dialog/dialog";

interface TransferInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleTransfer: () => void;
  insightName: string;
  currentWorkspaceName: string;
  destinationWorkspaceName: string;
}

const TransferInsightModal = ({
  isOpen,
  onClose,
  handleTransfer,
  insightName,
  currentWorkspaceName,
  destinationWorkspaceName,
}: TransferInsightModalProps) => {
  const isLoading = false;
  const [safeWord, setSafeWord] = useState<string | undefined>();
  const disabled = safeWord !== "TRANSFER";

  const onConfirmTransfer = () => {
    handleTransfer();
    onClose();
  };

  const onCloseModal = () => {
    setSafeWord("");
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="grid grid-cols-1 gap-4 p-4 max-w-[90%] lg:max-w-xl rounded-t-lg"
        onEscapeKeyDown={onCloseModal}
      >
        <DialogTitle>
          <Title level={3}>Transfer Insight</Title>
        </DialogTitle>

        <Text>
          Are you sure you want to transfer{" "}
          <span className="font-bold">
            {insightName} from {currentWorkspaceName} to {destinationWorkspaceName}
          </span>
          ? Current team members will not have access to this insight unless they are a member of{" "}
          <span className="font-bold">{destinationWorkspaceName}</span>.
        </Text>

        <Text>
          <span className="font-bold text-light-slate-12">This action cannot be undone</span>
        </Text>
        <Text>
          Type <span className="font-bold text-light-red-10">TRANSFER</span> in all caps to confirm
        </Text>

        <TextInput
          disabled={isLoading}
          onChange={(event) => {
            setSafeWord(event.target.value);
          }}
          value={safeWord}
        />

        <div className="flex gap-3">
          <Button loading={isLoading} disabled={disabled} onClick={onConfirmTransfer} variant="destructive">
            Transfer
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

export default TransferInsightModal;
