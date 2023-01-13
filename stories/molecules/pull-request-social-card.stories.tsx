import { ComponentStory } from "@storybook/react";
import PullRequestSocialCard from "components/molecules/PullRequestSocialCard/pull-request-social-card";
import { testLanguageList } from "./card-horizontal-bar.stories";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const StoryConfig = {
  title: "Design System/Molecules/PullRequestSocialCard"
};
export default StoryConfig;

const PullRequestSocialCardTemplate: ComponentStory<typeof PullRequestSocialCard> = (args) => (
  <TooltipProvider>
    <PullRequestSocialCard {...args} />
  </TooltipProvider>
);

export const PullRequestSocialCardStory = PullRequestSocialCardTemplate.bind({});

PullRequestSocialCardStory.args = {
  prTitle: "#223 Add support for Swift Package Manager",
  orgName: "open-sauced",
  repoName: "insights",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",

  languageList: testLanguageList
};
