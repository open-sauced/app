import { ComponentStory } from "@storybook/react";
import InsightPageTable from "components/molecules/InsightPageTable/insight-page-table";
import TestRepoAvatar from "img/icons/test-repo-avatar.svg";

const StoryConfig = {
  title: "Design System/Molecules/InsightPageTable",
};
export default StoryConfig;

const testRepoList = [
  {
    repoName: "test",
    repoIcon: TestRepoAvatar,
  },
  {
    repoName: "test2",
    repoIcon: TestRepoAvatar,
  },
  {
    repoName: "test3",
    repoIcon: TestRepoAvatar,
  },
  {
    repoName: "test4",
    repoIcon: TestRepoAvatar,
  },
  {
    repoName: "test5",
    repoIcon: TestRepoAvatar,
  },
  {
    repoName: "test6",
    repoIcon: TestRepoAvatar,
  },
];

const contributors = [
  {
    avatarURL: "",
    initials: "ES",
    alt: "E",
  },
  {
    avatarURL: "",
    initials: "ES",
    alt: "E",
  },
  {
    avatarURL: "",
    initials: "ES",
    alt: "E",
  },
];

const InsightPageTableTemplate: ComponentStory<typeof InsightPageTable> = (args) => <InsightPageTable {...args} />;

export const Default = InsightPageTableTemplate.bind({});
Default.args = {
  insights: [],
};
