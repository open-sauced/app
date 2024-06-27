import Pill from "components/atoms/Pill/pill";
import Tooltip from "components/atoms/Tooltip/tooltip";

export const OscrRating = ({ rating }: { rating: number }) => {
  const percentageRating = Math.floor(rating * 100);

  return (
    <Tooltip direction="top" content="Open Source Contributor Rating (OSCR)">
      <Pill color="purple" size="small" text={`OSCR: ${percentageRating}%`} />
    </Tooltip>
  );
};
