import { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";

import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Button from "components/shared/Button/button";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";

interface GitHubImportDialogProps {
  open: boolean;
  handleImport: (props: { follow: boolean }) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

const GitHubImportDialog = ({ open, handleClose, handleImport, loading }: GitHubImportDialogProps) => {
  const [follow, setFollow] = useState(false);

  return (
    <Dialog open={open}>
      <DialogContent>
        <div className="flex flex-col max-w-xs gap-6 w-max">
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-center p-2 bg-black rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <FiGithub size={24} className="text-blue-12" />
              </span>
            </span>
            <Title level={3} className="text-lg">
              Import your GitHub &quot;following&quot; list
            </Title>
            <Text className="leading-tight text-light-slate-9">
              <span id="import-users-explainer">
                We will import usernames of developers you are following on GitHub to create your new list.
              </span>
            </Text>
            <div className="flex pt-2">
              <ToggleSwitch
                ariaLabelledBy="import-users-explainer"
                name="followImported"
                classNames="mr-2"
                checked={follow}
                handleToggle={() => setFollow((toFollow) => !toFollow)}
              />
              <Text className="leading-tight text-light-slate-9">Follow everyone imported.</Text>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => handleClose()} className="justify-center flex-1" variant="text">
              Go Back
            </Button>
            <Button
              onClick={() => handleImport({ follow })}
              loading={loading}
              className="justify-center flex-1"
              variant="primary"
            >
              Import Following
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubImportDialog;
