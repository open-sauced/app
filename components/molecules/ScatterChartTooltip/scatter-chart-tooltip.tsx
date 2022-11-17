import Text from "components/atoms/Typography/text";
import { VscGitMerge, VscGitPullRequest } from "react-icons/vsc";
import CardProfile from "../CardProfile/card-profile";
import CardRepoList from "../CardRepoList/card-repo-list";
import TestRepoAvatar from "public/icons/test-repo-avatar.svg";
import Button from "components/atoms/Button/button";

const ScatterChartTooltip = () => {
  const randomGithubHistory = Array.apply(null, Array(4));
  const testRepoList = [
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
    },
    {
      repoName: "test6",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test6",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test6",
      repoIcon: TestRepoAvatar
    }
  ];
  return (
    <div className="w-[314px] gap-4 p-3 rounded-lg shadow-superlative flex flex-col">
      <div>
        <CardProfile dateOfFirstPR="" githubName="Sungoldtech" totalPRs={45} />
      </div>
      <div className="bg-light-slate-3 text-xs px-2 py-1 text-light-slate-11 rounded">
        <span>Latest PRs</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {randomGithubHistory.map((item, index) => (
          <div key={index} className="flex gap-1 text-xs justify-between items-center">
            <div>
              <VscGitPullRequest className="text-[14px]" color="green" />
            </div>
            <div>
              <Text className="!text-light-slate-12">fix: increase paginated response lim </Text>
            </div>
            <div className="text-light-slate-11">2mo</div>
          </div>
        ))}
      </div>
      <div>
        <CardRepoList repoList={testRepoList} limit={3} />
      </div>
      <div className="w-full ">
        <button className="w-full text-light-slate-11 text-xs bg-light-slate-1 rounded-lg border py-2">
          Add a Filter
        </button>
      </div>
    </div>
  );
};

export default ScatterChartTooltip;
