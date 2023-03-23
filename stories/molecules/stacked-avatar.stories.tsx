import { ComponentStory } from "@storybook/react";
import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";
import { contributorsMockList } from "../mockedData";

const storyConfig = {
  title: "Design System/Molecules/Stacked Avatar"
};
export default storyConfig;

const SuggestedRepositoryTemplate: ComponentStory<typeof StackedAvatar> = (args) => (
  <StackedAvatar {...args} />
);

export const SuggestedRepoStory = SuggestedRepositoryTemplate.bind({});
SuggestedRepoStory.args = {
  contributors: contributorsMockList
};
