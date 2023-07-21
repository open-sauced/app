import { ComponentStory } from "@storybook/react";
import ComponentGradient from "components/molecules/ComponentGradient/component-gradient";

const StoryConfig = {
  title: "Design System/Molecules/ComponentGradient",
};
export default StoryConfig;
const ComponentGradientTemplate: ComponentStory<typeof ComponentGradient> = (args) => <ComponentGradient {...args} />;

export const Default = ComponentGradientTemplate.bind({});

Default.args = {};
