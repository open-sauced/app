
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";

import getRepoInsights from "lib/utils/get-repo-insights";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";

import CardRepoList from "../CardRepoList/card-repo-list";

interface InsightHeaderProps {
  insight?: DbUserInsight;
  repositories?: number[];
}

const InsightHeader = ({ insight, repositories }: InsightHeaderProps): JSX.Element => {
  const { data: repoData } = useRepositoriesList(false, repositories);
  const { repoList } = getRepoInsights(repoData);

  return (
    <>
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <ContextThumbnail size={120} ContextThumbnailURL={""}></ContextThumbnail>
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <div className="flex items-baseline">
          <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900 mr-[1rem]">
            {insight && insight.name || "Insights"}
          </Title>
          {insight &&   
          <Text className="flex text-xl self-end !text-light-slate-11 border border-light-slate-6 rounded-[26px] bg-light-slate-3 px-2.5 py-1 h-fit leading-3.5">
            { !!insight.is_public ? "Public" : "Private" }
          </Text>}
        </div>
        <div className="flex mt-4 items-center relative  gap-2">
          {insight && insight.repos && insight.repos.length > 0 && <CardRepoList limit={2} repoList={repoList} />}
        </div>
      </div>    
    </>
  );
};

export default InsightHeader;