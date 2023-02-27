import Title from "components/atoms/Typography/title";
import TestRepoAvatar from "img/icons/test-repo-avatar.svg";
import Icon from "components/atoms/Icon/icon";

const HighlightsFilterCard = (): JSX.Element => {
  const testRepoList = [
    {
      repoName: "opensauced",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "Contentful",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "StrapiJs",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "javascript",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "reactjs",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "facebook",
      repoIcon: TestRepoAvatar
    }
  ];
  return (
    <div className="py-4 px-6 rounded-lg  border w-[18.625rem] h-max">
      <Title className="!font-normal" level={3}>
        Repositories
      </Title>
      <p className="text-sm text-light-slate-11 mb-2 font-normal">Click to filter the highlights</p>
      <div className="flex flex-col border-t pt-4 gap-2">
        {testRepoList.map(({ repoName, repoIcon }) => (
          <div
            key={""}
            className="flex hover:border-orange-600 hover:bg-orange-200 cursor-pointer gap-1 w-max  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12"
          >
            <Icon IconImage={repoIcon} className="rounded-[4px] overflow-hidden" />
            <span className="max-w-[45px] md:max-w-[100px] truncate text-xs ">{repoName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HighlightsFilterCard;
