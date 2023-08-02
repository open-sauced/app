import { ComponentStory } from "@storybook/react";
import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";

const storyConfig = {
  title: "Design System/Molecules/SuggestedRepo",
};
export default storyConfig;

const SuggestedRepositoryTemplate: ComponentStory<typeof SuggestedRepository> = (args) => (
  <SuggestedRepository {...args} />
);

export const SuggestedRepoStory = SuggestedRepositoryTemplate.bind({});
SuggestedRepoStory.args = {
  data: {
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    orgName: "statelyai",
    repoName: "xstate",
    prCount: 56,
    issueCount: 256,
  },
};
