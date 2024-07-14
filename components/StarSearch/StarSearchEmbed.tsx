import { ComponentProps, useRef, useState } from "react";
import { captureException } from "@sentry/nextjs";
import clsx from "clsx";
import { useOutsideClick } from "rooks";
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

  const starSearchPanelRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(
    starSearchPanelRef,
    (event) => {
      if (
        event.target instanceof HTMLElement &&
        // for some reason opening the workspaces dropdown has the event.target as the html element
        // so checking to avoid closing the sidebar when the dropdown is used
        event.target.tagName !== "HTML"
      ) {
        setDrawerOpen(false);
      }
    },
    Boolean(starSearchPanelRef.current)
  );

  try {
    if (workspaceId) {
      validWorkspaceId = parseSchema(UuidSchema, workspaceId);
    }
  } catch (error) {
    captureException(new Error(`Invalid workspace ID: ${workspaceId}`, { cause: error }));
    toast({ description: "Invalid workspace ID. Unable to load StarSearh for Workspaces", variant: "danger" });
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 flex justify-end p-2">
        <StarSearchButton
          onOpen={() => {
            setDrawerOpen(true);
          }}
        />
      </div>
      <div
        ref={starSearchPanelRef}
        aria-hidden={!drawerOpen}
        data-star-search-mobile={isMobile}
        className={clsx(
          !drawerOpen && "translate-x-full",
          isMobile ? "w-full" : "max-w-xl",
          `fixed border-r bg-slate-50 right-0 shadow-lg transform transition-transform duration-300 ease-in-out border-l flex flex-col lg:w-2/3 border-slate-200`
        )}
        style={{
          top: "var(--top-nav-height)",
          height: "calc(100dvh - var(--top-nav-height))",
        }}
      >
        <StarSearchChat
          userId={userId}
          sharedChatId={sharedChatId}
          bearerToken={bearerToken}
          isMobile={isMobile}
          suggestions={suggestions}
          tagline={tagline}
          onClose={onClose}
          showTopNavigation={true}
          embedded={!isMobile}
          sharingEnabled={false}
          baseApiStarSearchUrl={
            validWorkspaceId
              ? new URL(`${process.env.NEXT_PUBLIC_API_URL!}/workspaces/${validWorkspaceId}/star-search`)
              : undefined
          }
        />
      </div>
    </>
  );
};
