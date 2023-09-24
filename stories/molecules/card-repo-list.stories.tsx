import { Meta, StoryObj } from "@storybook/react";
import CardRepoList from "@components/molecules/CardRepoList/card-repo-list";
import TestRepoAvatar from "@img/icons/test-repo-avatar.svg";

const storyConfig = {
  title: "Design System/Molecules/Card Repo List",
  component: CardRepoList,
} satisfies Meta<typeof CardRepoList>;

export default storyConfig;

type Story = StoryObj<typeof CardRepoList>;

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

export const MoreThanFiveRepos: Story = {
  args: {
    repoList: testRepoList,
  },
};

export const LessThanFiveRepos: Story = {
  args: {
    repoList: [
      {
        repoOwner: "test",
        repoName: "test",
        repoIcon: TestRepoAvatar,
      },
    ],
  },
};

export const NoRepos: Story = {
  args: {
    repoList: [],
  },
};
