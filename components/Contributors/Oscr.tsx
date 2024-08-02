import { LockIcon } from "@primer/octicons-react";
import { usePostHog } from "posthog-js/react";
import Pill from "components/atoms/Pill/pill";
import Tooltip from "components/atoms/Tooltip/tooltip";
import Button from "components/shared/Button/button";
import { supabase } from "lib/utils/supabase";

const DEFAULT_SIGN_IN = supabase.auth.signInWithOAuth.bind(supabase.auth);

interface OscrProps {
  rating: number | undefined;
  hideRating: boolean;
  signIn?: typeof DEFAULT_SIGN_IN;
}

export const OSCR_LOGIN_TEXT = "Log in to view Open Source Contributor Rating (OSCR)";

export const OscrPill = ({ rating, hideRating, signIn = DEFAULT_SIGN_IN }: OscrProps) => {
  const posthog = usePostHog();
  let ratingToRender = rating ? Math.ceil(rating) : 0;

  if (ratingToRender < 1) {
    ratingToRender = 0;
  }

  const tooltipText = hideRating ? OSCR_LOGIN_TEXT : "Open Source Contributor Rating (OSCR)";

  return (
    <Tooltip direction="top" content={tooltipText}>
      {hideRating ? (
        <div className="relative flex items-center justify-center w-fit">
          <span className="absolute blur-sm text-xl text-purple-00 leading-tight">000</span>
          <Button
            variant="primary"
            className="flex items-center gap-2 !p-1 !text-xs z-0"
            onClick={() => {
              posthog.capture("OSCR Login Button Clicked");
              signIn({ provider: "github", options: { redirectTo: window.location.href } });
            }}
          >
            <span className="sr-only">{OSCR_LOGIN_TEXT}</span>
            <LockIcon size={16} />
          </Button>
        </div>
      ) : (
        <Pill color="purple" size="small" text={`${ratingToRender}`} />
      )}
    </Tooltip>
  );
};

export const OscrButton = ({ rating, hideRating, signIn = DEFAULT_SIGN_IN }: OscrProps) => {
  const posthog = usePostHog();
  let ratingToRender = rating ? Math.ceil(rating) : 0;

  const tooltipText = hideRating
    ? "Log in to view Open Source Contributor Rating (OSCR)"
    : "Open Source Contributor Rating (OSCR)";

  return (
    <>
      {hideRating ? (
        <Tooltip direction="top" content={OSCR_LOGIN_TEXT}>
          <div className="relative flex items-center justify-center w-fit">
            <span className="absolute blur-sm text-xl text-black z-0 leading-tight">000</span>
            <Button
              variant="primary"
              className="flex items-center gap-2 !p-1 !text-xs z-10"
              onClick={() => {
                posthog.capture("OSCR Login Button Clicked");
                signIn({ provider: "github", options: { redirectTo: window.location.href } });
              }}
            >
              <span className="sr-only">{OSCR_LOGIN_TEXT}</span>
              <LockIcon size={16} />
            </Button>
          </div>
        </Tooltip>
      ) : (
        <span>{ratingToRender}</span>
      )}
    </>
  );
};
