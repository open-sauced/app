import { ComponentStory } from "@storybook/react";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import TestRepoAvatar from "img/icons/test-repo-avatar.svg";

const storyConfig = {
  title: "Design System/Molecules/Card Repo List",
  component: "Card Repo List",
};

export default storyConfig;

const testRepoList = [
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

//CardRepoList Template
const CardRepoListTemplate: ComponentStory<typeof CardRepoList> = (args) => <CardRepoList {...args} />;

export const MoreThanFiveRepos = CardRepoListTemplate.bind({});

MoreThanFiveRepos.args = {
  repoList: testRepoList,
};

export const LessThanFiveRepos = CardRepoListTemplate.bind({});

LessThanFiveRepos.args = {
  repoList: [
    {
      repoOwner: "test",
      repoName: "test",
      repoIcon: TestRepoAvatar,
    },
  ],
};

export const NoRepos = CardRepoListTemplate.bind({});

NoRepos.args = {
  repoList: [],
};
