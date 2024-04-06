import { RiExternalLinkLine } from "react-icons/ri";
import Button from "components/atoms/Button/button";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogTitle, DialogContent } from "components/molecules/Dialog/dialog";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";

interface WorkspaceWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkspaceWelcomeModal({ isOpen, onClose }: WorkspaceWelcomeModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onClose} onPointerDownOutside={onClose}>
        <Card className="sm:w-96 md:w-max max-w-xl text-center flex flex-col items-center justify-between gap-4 !p-8">
          {/* Using !p-8 for now as the Card component has explicit padding of p-3. We can revisit. */}
          <img
            src="/assets/workspace_overview.png"
            alt="Workspace screenshot from documentation"
            className="border-2 border-light-orange-9 shadow-md rounded-lg mb-4"
          />
          <DialogTitle>
            <Title level={2}>Welcome to Workspaces</Title>
          </DialogTitle>
          <Text>
            Keep track of repositories and contributors easily with our new feature
            <span className="font-semibold"> Workspaces!</span> If you&apos;ve used OpenSauced before, your insights and
            lists are now part of your personal workspace.
          </Text>
          <p className="font-medium text-light-orange-10">
            Create a new workspace and explore open source like never before!
          </p>
          <section className="flex gap-4">
            <Button
              href="https://docs.opensauced.pizza/features/workspaces"
              className="w-fit flex gap-4"
              variant="primary"
              target="_blank"
            >
              Learn more about Workspaces
              <RiExternalLinkLine className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={onClose}>
              Continue
            </Button>
          </section>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
