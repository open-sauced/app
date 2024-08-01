import { LockIcon } from "@primer/octicons-react";
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

export const OscrPill = ({ rating, hideRating, signIn = DEFAULT_SIGN_IN }: OscrProps) => {
  let ratingToRender = rating ? Math.floor(rating * 100) : 0;

  if (ratingToRender < 1) {
    ratingToRender = 0;
  }

  const tooltipText = hideRating
    ? "Login to view Open Source Contributor Rating (OSCR)"
    : "Open Source Contributor Rating (OSCR)";

  return (
    <Tooltip direction="top" content={tooltipText}>
      {hideRating ? (
        <button onClick={() => signIn({ provider: "github", options: { redirectTo: window.location.href } })}>
          <span className="sr-only">Login to view Open Source Contributor Rating (OSCR)</span>
          <span aria-hidden={true}>
            <Pill color="purple" size="small" text="00" blurText={true} />
          </span>
        </button>
      ) : (
        <Pill color="purple" size="small" text={`${ratingToRender}`} />
      )}
    </Tooltip>
  );
};

export const OscrButton = ({ rating, hideRating, signIn = DEFAULT_SIGN_IN }: OscrProps) => {
  let ratingToRender = rating ? Math.floor(rating * 100) : 0;

  return (
    <>
      {hideRating ? (
        <Tooltip direction="top" content="Login in to view Open Source Contributor Rating (OSCR)" className="z-1">
          <div className="relative flex items-center justify-center w-fit">
            <span className="absolute blur-sm text-xl text-black z-0 leading-tight">000</span>
            <Button
              variant="primary"
              className="flex items-center gap-2 !p-1 !text-xs z-10"
              onClick={() => signIn({ provider: "github", options: { redirectTo: window.location.href } })}
            >
              <span className="sr-only">Login in to view Open Source Contributor Rating (OSCR)</span>
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
