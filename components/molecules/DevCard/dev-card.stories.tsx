import { ComponentMeta, ComponentStory } from "@storybook/react";
import DevCard from "components/molecules/DevCard/dev-card";

const storyConfig = {
  title: "Design System/Molecules/DevCard",
  component: DevCard,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof DevCard>;

export default storyConfig;

const DevCardTemplate: ComponentStory<typeof DevCard> = (args) => <DevCard {...args} />;
export const DevCardStory = DevCardTemplate.bind({});

DevCardStory.args = {
  username: "zeucapua",
  isInteractive: true,
};
