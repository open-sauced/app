import Pill from "components/atoms/Pill/pill";

export const OscrRating = ({ rating }: { rating: number }) => {
  const percentageRating = Math.floor(rating * 100);

  return <Pill color="purple" size="small" text={`OSCR: ${percentageRating}%`} />;
};
