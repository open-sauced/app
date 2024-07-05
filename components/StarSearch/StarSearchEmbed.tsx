import { ComponentProps, useState } from "react";
import { captureException } from "@sentry/nextjs";
import clsx from "clsx";
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

  const chat = (
    <StarSearchChat
      userId={userId}
      sharedChatId={sharedChatId}
      bearerToken={bearerToken}
      isMobile={isMobile}
      suggestions={suggestions}
      tagline={tagline}
      onClose={onClose}
      embedded={true}
      sharingEnabled={false}
      baseApiStarSearchUrl={
        validWorkspaceId
          ? new URL(`${process.env.NEXT_PUBLIC_API_URL!}/workspaces/${validWorkspaceId}/star-search`)
          : undefined
      }
    />
  );

  /* TODO: implement non-mobile version */
  return (
    <>
      <>
        {isMobile ? (
          <Drawer
            showCloseButton={false}
            inheritBackground={true}
            isOpen={drawerOpen}
            onClose={onClose}
            fullHeightDrawer={true}
          >
            {chat}
          </Drawer>
        ) : (
          <div
            // ${drawerOpen ? "-translate-x-full" : ""}
            aria-hidden={drawerOpen}
            className={clsx(
              drawerOpen ? "fixed" : "hidden",
              `bg-slate-50 right-0 shadow-lg transform transition-transform duration-300 ease-in-out border-l flex flex-col gap-8 justify-between lg:w-2/3 max-w-xl border-slate-200 z-50`
            )}
            style={{
              "--top-nav-height": "3.3rem",
              top: "var(--top-nav-height)",
              height: "calc(100dvh - var(--top-nav-height))",
            }}
          >
            {chat}
          </div>
        )}
        <div className="sticky bottom-0 flex justify-end p-2">
          <StarSearchButton
            onOpen={() => {
              setDrawerOpen(true);
            }}
          />
        </div>
      </>
    </>
  );
};
