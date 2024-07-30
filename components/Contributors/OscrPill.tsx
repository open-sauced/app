import Pill from "components/atoms/Pill/pill";
import Tooltip from "components/atoms/Tooltip/tooltip";

export const OscrPill = ({ rating, hideRating }: { rating: number | undefined; hideRating: boolean }) => {
  let ratingToDisplay = rating ? Math.floor(rating * 100) : 0;

  if (ratingToDisplay < 1) {
    ratingToDisplay = 0;
  }

  return (
    <Tooltip direction="top" content="Open Source Contributor Rating (OSCR)">
      {hideRating ? (
        <Pill color="purple" size="small" text="00" blurText={true} />
      ) : (
        <>{ratingToDisplay > 0 ? <Pill color="purple" size="small" text={`${ratingToDisplay}`} /> : <span>-</span>}</>
      )}
    </Tooltip>
  );
};
