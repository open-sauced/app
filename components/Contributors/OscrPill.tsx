import Pill from "components/atoms/Pill/pill";
import Tooltip from "components/atoms/Tooltip/tooltip";

export const OscrPill = ({ rating }: { rating: number }) => {
  const percentageRating = Math.floor(rating * 100);

  if (percentageRating < 1) {
    return null;
  }

  return (
    <Tooltip direction="top" content="Open Source Contributor Rating (OSCR)">
      <Pill color="purple" size="small" text={`${percentageRating}`} />
    </Tooltip>
  );
};
