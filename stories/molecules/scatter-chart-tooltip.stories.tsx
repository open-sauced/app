import { TipProvider } from "components/atoms/Tooltip/tooltip";
import ContributorHoverCard from "components/molecules/ContributorHoverCard/contributor-hover-card";

const storyConfig = {
  title: "Design System/Molecules/ContributorHoverCard"
};
export default storyConfig;

export const ScatterChartTooltipStory = () => (
  <TipProvider>
    <ContributorHoverCard />
  </TipProvider>
);
