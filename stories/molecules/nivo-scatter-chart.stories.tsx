import NivoScatterPlot from "components/molecules/NivoScatterChart/nivo-scatter-chart";
import { ComponentStory } from "@storybook/react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const storyConfig = {
  title: "Design System/Molecules/ScatterChart"
};

const data = [
  {
    id: "test1",
    data: [
      { x: 10.0, y: 8.04, image: "" },
      { x: 8.07, y: 3.08, image: "" },
      { x: 8.07, y: 3.08, image: "" },
      { x: 6.05, y: 8.03, image: "" },
      { x: 10.02, y: 5.01, image: "" },
      { x: 12.07, y: 9.08, image: "" },
      { x: 18.01, y: 12.04, image: "" }
    ]
  }
];
export default storyConfig;

const ScatterChartTemplate: ComponentStory<typeof NivoScatterPlot> = (args) => <NivoScatterPlot {...args} />;

export const Scatterchart = ScatterChartTemplate.bind({});

Scatterchart.args = {
  data: data
};
