import Pill from "components/atoms/Pill/pill";
import Tooltip from "components/atoms/Tooltip/tooltip";

export const OscrPill = ({ rating, hideRating }: { rating: number | undefined; hideRating: boolean }) => {
  let percentageRating = rating ? Math.floor(rating * 100) : 0;

  if (percentageRating < 1) {
    percentageRating = 0;
  }

  return (
    <Tooltip direction="top" content="Open Source Contributor Rating (OSCR)">
      {hideRating ? (
        <Pill color="purple" size="small" text="00" blurText={true} />
      ) : (
        <Pill color="purple" size="small" text={`${percentageRating}`} className="" />
      )}
    </Tooltip>
  );
};
