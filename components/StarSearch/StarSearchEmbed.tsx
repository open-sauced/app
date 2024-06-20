import { ComponentProps, useState } from "react";
import { Drawer } from "components/shared/Drawer";
import { StarSearchButton } from "./StarSearchButton";
import { StarSearchChat } from "./StarSearchChat";
import { StarSearchCompactHeader } from "./StarSearchCompactHeader";

interface StarSearchEmbedProps extends Omit<ComponentProps<typeof StarSearchChat>, "sharedPrompt"> {}

export const StarSearchEmbed = ({
  userId,
  sharedChatId,
  bearerToken,
  suggestions,
  isMobile,
  tagline,
}: StarSearchEmbedProps) => {
  const [view, setView] = useState<"prompt" | "chat">("prompt");

  return (
    <>
      {true ? (
        <Drawer
          showCloseButton={false}
          title={
            <StarSearchCompactHeader
              view={view}
              onBack={() => {}}
              onClose={() => {}}
              onShare={() => {}}
              onShowHistory={() => {}}
              onNewChat={() => {
                setView("prompt");
              }}
              showCloseButton={!isMobile}
            />
          }
          inheritBackground={true}
          trigger={
            <div className="sticky bottom-0 flex justify-end p-2">
              <StarSearchButton onOpen={() => {}} />
            </div>
          }
        >
          <StarSearchChat
            userId={userId}
            sharedChatId={sharedChatId}
            bearerToken={bearerToken}
            isMobile={isMobile}
            suggestions={suggestions}
            tagline={tagline}
            embedded={true}
          />
        </Drawer>
      ) : (
        <div className="sticky bottom-0 flex justify-end pb-2 pr-3">
          <StarSearchButton onOpen={() => {}} />
        </div>
      )}
    </>
  );
};
