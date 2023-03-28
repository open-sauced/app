import { ComponentStory } from "@storybook/react";
import ProgressPie from "../../components/atoms/ProgressPie/progress-pie";

const storyConfig = {
  title: "Design System/Atoms/ProgressPie"
};

export default storyConfig;

const ProgressPieTemplate: ComponentStory<typeof ProgressPie> = (args) => <ProgressPie {...args} />;

export const Default = ProgressPieTemplate.bind({});
Default.args = { percentage: 32 };