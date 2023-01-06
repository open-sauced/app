import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import TestRepoAvatar from "img/icons/test-repo-avatar.svg";

const storyConfig = {
  title: "Design System/Molecules/Card Repo List",
  component: "Card Repo List"
};

export default storyConfig;

const testRepoList = [
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

//CardRepoList Template
const CardRepoListTemplate: ComponentStory<typeof CardRepoList> = (args) => <CardRepoList {...args} />;

export const MoreThanFiveRepos = CardRepoListTemplate.bind({});

MoreThanFiveRepos.args = {
  repoList: testRepoList
};

export const LessThanFiveRepos = CardRepoListTemplate.bind({});

LessThanFiveRepos.args = {
  repoList: [
    {
      repoName: "test",
      repoIcon: TestRepoAvatar
    }
  ]
};

export const NoRepos = CardRepoListTemplate.bind({});

NoRepos.args = {
  repoList: []
};
