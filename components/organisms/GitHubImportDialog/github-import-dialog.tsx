import { FiGithub } from "react-icons/fi";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";

import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Button from "components/atoms/Button/button";

interface GitHubImportDialogProps {
  open: boolean;
  handleImport: () => Promise<void>;
  handleClose: () => void;
}

const GitHubImportDialog = ({ open, handleClose, handleImport }: GitHubImportDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <div className="flex flex-col max-w-xs gap-6 w-max">
          <div className="flex flex-col items-center gap-2">
            <span className="flex items-center justify-center p-2 bg-black rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <FiGithub size={24} className="" />
              </span>
            </span>
            <Title level={3} className="text-lg">
              Imoprt your GitHub &quot;following&quot; list
            </Title>
            <Text className="leading-tight text-center text-light-slate-9">
              We will import usernames of developers you are following on GitHub to create your new list.
            </Text>
            <div className="flex m-2">
              {/* <ToggleSwitch name="follow-opensauced" classNames="text-sm text-light-slate-10" /> */}
              <Text className="leading-tight text-center text-light-slate-9">Follow users on OpenSauced also.</Text>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => handleClose()} className="justify-center flex-1" variant="text">
              Go Back
            </Button>
            <Button onClick={() => handleImport()} className="justify-center flex-1" variant="primary">
              Import Following
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubImportDialog;
