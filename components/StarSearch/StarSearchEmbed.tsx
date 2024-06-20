import { ComponentProps, useState } from "react";
import { captureException } from "@sentry/nextjs";
import { Drawer } from "components/shared/Drawer";
import { UuidSchema, parseSchema } from "lib/validation-schemas";
import { useToast } from "lib/hooks/useToast";
import { StarSearchButton } from "./StarSearchButton";
import { StarSearchChat } from "./StarSearchChat";
interface StarSearchEmbedProps extends Omit<ComponentProps<typeof StarSearchChat>, "sharedPrompt"> {
  workspaceId?: string;
}

export const StarSearchEmbed = ({
  userId,
  sharedChatId,
  bearerToken,
  suggestions,
  isMobile,
  tagline,
  workspaceId,
}: StarSearchEmbedProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onClose = () => setDrawerOpen(false);
  const { toast } = useToast();

  let validWorkspaceId = workspaceId;

  try {
    if (workspaceId) {
      validWorkspaceId = parseSchema(UuidSchema, workspaceId);
    }
  } catch (error) {
    captureException(new Error(`Invalid workspace ID: ${workspaceId}`, { cause: error }));
    toast({ description: "Invalid workspace ID. Unable to load StarSearh for Workspaces", variant: "danger" });
    return null;
  }

  /* TODO: implement non-mobile version */
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
              baseApiStarSearchUrl={
                validWorkspaceId
                  ? new URL(`${process.env.NEXT_PUBLIC_API_URL!}/workspaces/${validWorkspaceId}/star-search`)
                  : undefined
              }
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
