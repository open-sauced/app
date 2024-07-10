import { Meta, StoryObj } from "@storybook/react";
import { ChartTooltipContent } from "components/primitives/chart-primitives";
import { RadarChart } from "./RadarChart";

type Story = StoryObj<typeof RadarChart>;

const meta: Meta<typeof RadarChart> = {
  title: "Components/Graphs/RadarChart",
  component: RadarChart,
  args: {
    radarDataKey: "percentage",
    polarAngleAxisDataKey: "type",
    data: [
      { type: "Code review", percentage: 30 },
      { type: "Issues", percentage: 11 },
      { type: "Pull requests", percentage: 11 },
      { type: "Commits", percentage: 48 },
    ],
    fill: "#ff5100",
  },
};

export default meta;

export const Default: Story = {};
export const WithDot: Story = {
  args: {
    dot: {
      r: 4,
      fillOpacity: 1,
    },
  },
};
export const WithCustomTooltip: Story = {
  args: {
    chartTooltipContent: (
      <ChartTooltipContent
        className="bg-white"
        formatter={(value, name, item, index, payload) => {
          return `${value}%`;
        }}
      />
    ),
  },
};
