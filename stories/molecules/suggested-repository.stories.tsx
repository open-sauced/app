import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";
import { ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Design System/Molecules/SuggestedRepo"
};
export default storyConfig;

const SuggestedRepositoryTemplate: ComponentStory<typeof SuggestedRepository> = (args) => (
  <SuggestedRepository {...args} />
);

export const SuggestedRepoStory = SuggestedRepositoryTemplate.bind({});
