
import Title from "components/atoms/Typography/title";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";

import getRepoInsights from "lib/utils/get-repo-insights";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";

import CardRepoList from "../CardRepoList/card-repo-list";
import Button from "components/atoms/Button/button";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

interface InsightHeaderProps {
  insight?: DbUserInsight;
  repositories?: number[];
  insightId: string;
}

const InsightHeader = ({ insight, repositories, insightId }: InsightHeaderProps): JSX.Element => {
  const { data: repoData } = useRepositoriesList(false, repositories);
  const { repoList } = getRepoInsights(repoData);

  return (
    <>
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <ContextThumbnail size={120} ContextThumbnailURL={""}></ContextThumbnail>
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">
          {insight && insight.name || "Insights"}
        </Title>
        <div className="flex mt-4 items-center relative  gap-2">
          {insight && insight.repos && insight.repos.length > 0 && <CardRepoList limit={2} repoList={repoList} />}
        </div>
      </div>
      <div>
        <Link href={`/hub/insights/${insightId}/edit`}>
          <Button type="primary"><FaEdit className="mr-2"/> Edit Page</Button>
        </Link>
      </div>
    </>
  );
};

export default InsightHeader;
