import { TipProvider } from "components/atoms/Tooltip/tooltip";
import ScatterChartTooltip from "components/molecules/ScatterChartTooltip/scatter-chart-tooltip";

const storyConfig = {
  title: "Design System/Molecules/ScatterChartTooltip"
};
export default storyConfig;

export const ScatterChartTooltipStory = () => (
  <TipProvider>
    <ScatterChartTooltip />{" "}
  </TipProvider>
);
