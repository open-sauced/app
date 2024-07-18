import { RiExternalLinkLine } from "react-icons/ri";
import { useEffect, useRef } from "react";
import Button from "components/shared/Button/button";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogTitle, DialogContent } from "components/molecules/Dialog/dialog";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { Drawer } from "components/shared/Drawer";

interface WorkspaceWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbeddedVideo = () => {
  return (
    <iframe
      width="100%"
      className="shadow-md rounded-lg mb-4 aspect-video"
      src="https://www.youtube-nocookie.com/embed/xpxIyR4-rRc?si=UwT2Ukmjc08hFjU-"
      title="Welcome to Workspaces"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

const TITLE = "Welcome to Workspaces";
export default function WorkspaceWelcomeModal({ isOpen, onClose }: WorkspaceWelcomeModalProps) {
  const description = (
    <Text>
      Keep track of repositories and contributors easily with our new feature
      <span className="font-semibold"> Workspaces!</span> If you&apos;ve used OpenSauced before, your insights and lists
      are now part of your personal workspace.
    </Text>
  );

  const content = (
    <p className="font-medium text-light-orange-10 text-center">
      Create a new workspace and explore open source like never before!
    </p>
  );

  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const drawerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSmallScreen && isOpen && drawerButtonRef.current) {
      drawerButtonRef.current.click();
    }
  }, [isSmallScreen, isOpen]);

  return isSmallScreen ? (
    <Drawer
      title={TITLE}
      description={
        <div className="text-center flex flex-col items-center justify-between gap-4 !p-8">
          <EmbeddedVideo />
          {description}
        </div>
      }
      trigger={<button ref={drawerButtonRef} />}
      onClose={onClose}
    >
      <>
        {content}
        <div className="flex gap-4 place-content-center">
          <Button
            href="https://docs.opensauced.pizza/features/workspaces"
            className="w-fit flex gap-4"
            variant="primary"
            target="_blank"
          >
            Learn more about Workspaces
            <RiExternalLinkLine className="w-4 h-4" />
          </Button>
        </div>
      </>
    </Drawer>
  ) : (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onClose} onPointerDownOutside={onClose}>
        <Card className="sm:w-96 md:w-max max-w-xl text-center flex flex-col items-center justify-between gap-4 !p-8">
          <EmbeddedVideo />
          <DialogTitle>
            <Title level={2}>Welcome to Workspaces</Title>
          </DialogTitle>
          <Text>
            Keep track of repositories and contributors easily with our new feature
            <span className="font-semibold"> Workspaces!</span> If you&apos;ve used OpenSauced before, your insights and
            lists are now part of your personal workspace.
          </Text>
          {content}
          <div className="flex gap-4 place-content-center">
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
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
