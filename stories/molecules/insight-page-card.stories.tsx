/* eslint-disable camelcase */
import { ComponentStory } from "@storybook/react";
import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import InsightPageCard from "components/molecules/InsightPageCard/insight-page-card";
import TestRepoAvatar from "img/icons/test-repo-avatar.svg";

const storyConfig = {
  title: "Design System/Molecules/InsightPageCard",
};
export default storyConfig;

const repoList: RepoList[] = [
  {
    repoOwner: "test",
    repoName: "test",
    repoIcon: TestRepoAvatar,
  },
  {
    repoOwner: "test",
    repoName: "test2",
    repoIcon: TestRepoAvatar,
  },
  {
    repoOwner: "test",
    repoName: "test3",
    repoIcon: TestRepoAvatar,
  },
  {
    repoOwner: "test",
    repoName: "test4",
    repoIcon: TestRepoAvatar,
  },
  {
    repoOwner: "test",
    repoName: "test5",
    repoIcon: TestRepoAvatar,
  },
  {
    repoOwner: "test",
    repoName: "test6",
    repoIcon: TestRepoAvatar,
  },
];

const InsightPageCardTemplate: ComponentStory<typeof InsightPageCard> = (args) => <InsightPageCard {...args} />;

export const InsightpageCardStory = InsightPageCardTemplate.bind({});
InsightpageCardStory.args = {};
