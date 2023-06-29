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
  username: "foxyblocks",
  name: "Chris Schlensker",
  avatarURL: "https://avatars.githubusercontent.com/u/555044?v=4",
  prs: 5,
  contributions: 57,
  bio: "This is the story all about how my life got flipped turned upside down, and I'd like to take a minute just sit right there, I'll tell you how I became the prince of a town called Bel-Air.",
  prVelocity: 102,
  prMergePercentage: 74,
  age: 656,
};

export const Loading = DevCardTemplate.bind({});

Loading.args = {
  username: "foxyblocks",
  avatarURL: "https://avatars.githubusercontent.com/u/555044?v=4",
  isLoading: true,
};

export const HighActivity = DevCardTemplate.bind({});

HighActivity.args = {
  ...DevCardStory.args,
  contributions: 200,
};

export const LowActivity = DevCardTemplate.bind({});

LowActivity.args = {
  ...DevCardStory.args,
  contributions: 0,
  prs: 0,
};
