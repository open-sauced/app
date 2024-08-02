import Image from "next/image";
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

type OssfRequestModalProps = {
  repository: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function OssfRequestModal({ repository, isOpen, onClose }: OssfRequestModalProps) {
  const { signIn } = useSupabaseAuth();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const onCloseModal = () => {
    onClose();
  };

  const login = () => {
    signIn({ provider: "github", options: { redirectTo: `${window.location.origin}/s/${repository}` } });
  };

  return isMobile ? (
    <Drawer
      title={"Login to request this OpenSSF Score!"}
      description={`
        We are still crunching the numbers on all repositories, but we'll make sure to prioritize
        calculating this repository's score. Login so we can save your request and notify you when the score is ready!
      `}
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
      <DialogContent
        autoStyle={false}
        onEscapeKeyDown={onCloseModal}
        onPointerDownOutside={onCloseModal}
        aria-label="Login to try StarSearch"
      >
        <Card className="!p-0 max-w-sm">
          <section className="relative flex justify-end w-full align-top">
            <div className="absolute left-0">
              <Image src="/assets/star-search-beam.png" alt="StarSearch logo" width="240" height="240" />
            </div>
            <button onClick={onCloseModal} className="p-4">
              <MdOutlineClose className="w-6 h-6" />
            </button>
          </section>
          {/* Using !p-0 for now as the Card component has explicit padding of p-3. We can revisit. */}
          <div className="mt-0">
            <div className="flex flex-col justify-between gap-4 p-8">
              <Title level={3}>Login to request this OpenSSF Score!</Title>

              <Text>
                We are still crunching the numbers on all repositories, but we&apos;ll make sure to prioritize
                calculating this repository&apos;s score. Login so we can
                <span className="font-semibold"> save your request</span> and
                <span className="font-semibold"> notify you</span> when the score is ready!
              </Text>

              <div className="flex justify-center gap-4 pt-2">
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
}
