import { ComponentStory } from "@storybook/react";
import PieChart from "components/molecules/PieChart/pie-chart";


const StoryConfig = {
  title: "Design System/Molecules/PieChart"
};
export default StoryConfig;

const PieChartData = [
  {
    "id": "open",
    "label": "open",
    "value": 8,
    "color": "hsla(131, 41%, 46%, 1)"
  },
  {
    "id": "merged",
    "label": "merged",
    "value": 16,
    "color": "hsla(272, 51%, 54%, 1)"
  },
  {
    "id": "closed",
    "label": "closed",
    "value": 8,
    "color": "hsla(11, 89%, 54%, 1)"
  },
  {
    "id": "draft",
    "label": "draft",
    "value": 1,
    "color": "hsla(205, 11%, 78%, 1)"
  }
];


const PieChartTemplate: ComponentStory<typeof PieChart> = (args)=> <PieChart {...args}/>;
export const PieChartStory = PieChartTemplate.bind({});

PieChartStory.args ={
  data: PieChartData
};
