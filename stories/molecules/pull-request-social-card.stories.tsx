import { Meta, StoryObj } from "@storybook/react";
import PullRequestSocialCard from "@components/molecules/PullRequestSocialCard/pull-request-social-card";
import { testLanguageList } from "stories/testData/mockedData";

const StoryConfig: Meta<typeof PullRequestSocialCard> = {
  title: "Design System/Molecules/PullRequestSocialCard",
  component: PullRequestSocialCard,
};

type Story = StoryObj<typeof PullRequestSocialCard>;

export default StoryConfig;

export const PullRequestSocialCardStory: Story = {
  args: {
    prTitle: "Add support for Swift Package Manager",
    orgName: "open-sauced",
    repoName: "insights",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",

    languageList: testLanguageList,
    prTicketId: "#223",
    commentsCount: 5,
    linesAdded: 12,
    linesRemoved: 4,
  },
};
