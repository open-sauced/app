import { ComponentStory } from "@storybook/react";
import RepoCardProfile from "components/molecules/RepoCardProfile/repo-card-profile";

const storyConfig = {
  title: "Design System/Molecules/RepoCardProfile",
};
export default storyConfig;

const RepoCardProfileTemplate: ComponentStory<typeof RepoCardProfile> = (args) => <RepoCardProfile {...args} />;

export const Default = RepoCardProfileTemplate.bind({});

Default.args = {
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  orgName: "statelyai",
  repoName: "xstate",
  prCount: 56,
  issueCount: 256,
};
