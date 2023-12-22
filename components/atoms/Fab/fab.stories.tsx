import { Meta, StoryFn } from "@storybook/react";
import Fab from "components/atoms/Fab/fab";

const storyConfig = {
  title: "Design System/Atoms/Fab",
  component: Fab,
} as Meta;
export default storyConfig;

const FabTemplate: StoryFn<typeof Fab> = (args) => <Fab {...args} />;

export const Default = FabTemplate.bind({});
Default.args = { position: "bottom-right", children: "Fab" };
