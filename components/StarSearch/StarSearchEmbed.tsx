import { ComponentProps, useState } from "react";
import { Drawer } from "components/shared/Drawer";
import { StarSearchButton } from "./StarSearchButton";
import { StarSearchChat } from "./StarSearchChat";

interface StarSearchEmbedProps extends Omit<ComponentProps<typeof StarSearchChat>, "sharedPrompt"> {}

export const StarSearchEmbed = ({
  userId,
  sharedChatId,
  bearerToken,
  suggestions,
  isMobile,
  tagline,
}: StarSearchEmbedProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onClose = () => setDrawerOpen(false);

  return (
    <>
      {true ? (
        <>
          <Drawer
            showCloseButton={false}
            inheritBackground={true}
            isOpen={drawerOpen}
            onClose={onClose}
            fullHeightDrawer={true}
          >
            <StarSearchChat
              userId={userId}
              sharedChatId={sharedChatId}
              bearerToken={bearerToken}
              isMobile={isMobile}
              suggestions={suggestions}
              tagline={tagline}
              onClose={onClose}
              embedded={true}
            />
          </Drawer>
          <div className="sticky bottom-0 flex justify-end p-2">
            <StarSearchButton
              onOpen={() => {
                setDrawerOpen(true);
              }}
            />
          </div>
        </>
      ) : (
        <div className="sticky bottom-0 flex justify-end pb-2 pr-3">
          <StarSearchButton onOpen={() => {}} />
        </div>
      )}
    </>
  );
};
