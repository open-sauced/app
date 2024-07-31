import Pill from "components/atoms/Pill/pill";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { supabase } from "lib/utils/supabase";

const DEFAULT_SIGN_IN = supabase.auth.signInWithOAuth.bind(supabase.auth);

export const OscrPill = ({
  rating,
  hideRating,
  signIn = DEFAULT_SIGN_IN,
}: {
  rating: number | undefined;
  hideRating: boolean;
  signIn?: typeof DEFAULT_SIGN_IN;
}) => {
  let percentageRating = rating ? Math.floor(rating * 100) : 0;

  if (percentageRating < 1) {
    percentageRating = 0;
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
        <Pill color="purple" size="small" text={`${percentageRating}`} />
      )}
    </Tooltip>
  );
};
