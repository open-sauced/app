/* eslint-disable camelcase */
import { ComponentStory } from "@storybook/react";
import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import InsightPageCard from "components/molecules/InsightPageCard/insight-page-card";
import TestRepoAvatar from "public/icons/test-repo-avatar.svg";


const storyConfig = {
  title: "Design System/Molecules/InsightPageCard"
};
export default storyConfig;

const contributors: DbContribution[] = [
  {
    id: 1,
    commits: "2",
    commit_days: "ES",
    last_commit_time: "1661496920000",
    files_modified: "",
    first_commit_time: "1661436635000",
    host_login: "10kartik",
    email: "kartik@plgworks.com",
    name: "10kartik",
    langs: "markdown,python",
    recent_pr_total: 30,
    recent_repo_list: ""
  },
  {
    id: 2,
    commits: "2",
    commit_days: "ES",
    last_commit_time: "1661496920000",
    files_modified: "",
    first_commit_time: "1661436635000",
    host_login: "10kartik",
    email: "kartik@plgworks.com",
    name: "10kartik",
    langs: "markdown,python",
    recent_pr_total: 30,
    recent_repo_list: ""
  },
  {
    id: 3,
    commits: "2",
    commit_days: "ES",
    last_commit_time: "1661496920000",
    files_modified: "",
    first_commit_time: "1661436635000",
    host_login: "10kartik",
    email: "kartik@plgworks.com",
    name: "10kartik",
    langs: "markdown,python",
    recent_pr_total: 30,
    recent_repo_list: ""
  },
  {
    id: 4,
    commits: "2",
    commit_days: "ES",
    last_commit_time: "1661496920000",
    files_modified: "",
    first_commit_time: "1661436635000",
    host_login: "10kartik",
    email: "kartik@plgworks.com",
    name: "10kartik",
    langs: "markdown,python",
    recent_pr_total: 30,
    recent_repo_list: ""
  }

];

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

const InsightPageCardTemplate: ComponentStory<typeof InsightPageCard> = (args) => <InsightPageCard{...args}/>;

export const InsightpageCardStory = InsightPageCardTemplate.bind({});
InsightpageCardStory.args = {};
