import { BsGithub } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

import Button from "components/shared/Button/button";
import Title from "components/atoms/Typography/title";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { Drawer } from "components/shared/Drawer";

interface StarSearchLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StarSearchLoginModal = ({ isOpen, onClose }: StarSearchLoginModalProps) => {
  const { signIn } = useSupabaseAuth();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const onCloseModal = () => {
    onClose();
  };

  const login = () => {
    signIn({ provider: "github", options: { redirectTo: `${window.location.origin}/star-search` } });
  };

  return isMobile ? (
    <Drawer
      title={"Login to try StarSearch!"}
      description={`StarSearch is currently available only to logged in users. Log in or connect your GitHub account to get
    access!`}
      isOpen={isOpen}
      onClose={onClose}
      trigger={null}
    >
      {/* Using !p-0 for now as the Card component has explicit padding of p-3. We can revisit. */}
      <div>
        <div className="flex flex-col justify-between gap-4">
          <div className="flex justify-center gap-4">
            <Button className="w-fit gap-2 self-center" variant="primary" onClick={login}>
              <BsGithub className="w-5 h-5" />
              Connect with GitHub
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  ) : (
    <Dialog open={isOpen}>
      <DialogContent autoStyle={false} onEscapeKeyDown={onCloseModal} onPointerDownOutside={onCloseModal}>
        <Card className="!p-0 max-w-s">
          <section className="flex w-full justify-between align-top">
            <div className="">
              {/* <Image src="/assets/star-search-beam.png" alt="StarSearch Logo" width="100" height="100" /> */}
            </div>
            <button onClick={onCloseModal} className="mr-4 mt-4 mb-0">
              <MdOutlineClose className="w-6 h-6" />
            </button>
          </section>
          {/* Using !p-0 for now as the Card component has explicit padding of p-3. We can revisit. */}
          <div className="mt-0">
            <div className="flex flex-col justify-between gap-4 p-8">
              <Title level={3}>Login to try StarSearch!</Title>

              <Text>
                StarSearch is currently available only to logged in users. Log in or connect your GitHub account to get
                access!
              </Text>

              <div className="flex justify-center gap-4">
                <Button className="w-fit gap-2 self-center" variant="primary" onClick={login}>
                  <BsGithub className="w-5 h-5" />
                  Connect with GitHub
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default StarSearchLoginModal;
