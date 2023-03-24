import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ComponentStory } from "@storybook/react";
import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";
import { mockDbContributions } from "../mockedData";

const storyConfig = {
  title: "Design System/Molecules/Stacked Avatar"
};
export default storyConfig;

const template: ComponentStory<typeof StackedAvatar> = (args) => (
  <TooltipProvider>
    <StackedAvatar {...args} />
  </TooltipProvider>
);

export const Default = template.bind({});
Default.args = {
  contributors: mockDbContributions
};
