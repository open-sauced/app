/* eslint-disable camelcase */
import { ComponentStory } from "@storybook/react";
import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import InsightPageCard from "components/molecules/InsightPageCard/insight-page-card";
import TestRepoAvatar from "img/icons/test-repo-avatar.svg";

const storyConfig = {
  title: "Design System/Molecules/InsightPageCard"
};
export default storyConfig;

const repoList: RepoList[] = [
  {
    repoName: "test",
    repoIcon: TestRepoAvatar
  },
  {
    repoName: "test2",
    repoIcon: TestRepoAvatar
  },
  {
    repoName: "test3",
    repoIcon: TestRepoAvatar
  },
  {
    repoName: "test4",
    repoIcon: TestRepoAvatar
  },
  {
    repoName: "test5",
    repoIcon: TestRepoAvatar
  },
  {
    repoName: "test6",
    repoIcon: TestRepoAvatar
  }
];

const InsightPageCardTemplate: ComponentStory<typeof InsightPageCard> = (args) => <InsightPageCard {...args} />;

export const InsightpageCardStory = InsightPageCardTemplate.bind({});
InsightpageCardStory.args = {};
