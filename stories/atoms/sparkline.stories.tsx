import Sparkline from "components/atoms/Sparkline/Sparkline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

const storyConfig = {
  title: "Design System/Atoms/Sparkline"
};

export default storyConfig;

// FilterCard Template
const SparklineTemplate: ComponentStory<typeof Sparkline> = (args) => <Sparkline {...args} />;

// FilterCard Default
export const Default = SparklineTemplate.bind({});
Default.args = { 
  canvasID: "reponame",
  canvasWidth: 240,
  canvasHeight: 120
};