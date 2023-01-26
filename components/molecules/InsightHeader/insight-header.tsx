import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import getRepoInsights from "lib/utils/get-repo-insights";
import Button from "components/atoms/Button/button";
import Title from "components/atoms/Typography/title";
import Badge from "components/atoms/InsightBadge/insight-badge";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";
import CardRepoList from "../CardRepoList/card-repo-list";
import { truncateString } from "lib/utils/truncate-string";

interface InsightHeaderProps {
  insight?: DbUserInsight;
  repositories?: number[];
  insightId: string;
  isOwner: boolean;
}

const InsightHeader = ({ insight, repositories, insightId, isOwner }: InsightHeaderProps): JSX.Element => {
  const { data: repoData } = useRepositoriesList(false, repositories);
  const { repoList } = getRepoInsights(repoData);

  return (
    <div className="flex flex-row justify-between w-full relative">
      <div className="flex flex-col md:flex-row ">
        <div className="header-image mr-2 p-2 min-w-[130px]">
          <ContextThumbnail size={120} ContextThumbnailURL={""}></ContextThumbnail>
        </div>
        <div className="header-info flex flex-col  grow justify-center p-2">
          <div className="flex gap-2">
            <Title level={1} className="!text-2xl font-semibold tracking-tight text-slate-900">
              {(insight && truncateString(insight.name, 30)) || "Insights"}
            </Title>
            {insight && <Badge isPublic={insight?.is_public} />}
          </div>
          <div className="flex mt-4 items-center   gap-2">
            {insight && insight.repos && insight.repos.length > 0 && <CardRepoList limit={2} repoList={repoList} />}
          </div>
        </div>
      </div>
      <div className="py-2 absolute right-0 md:static">
        {isOwner && (
          <Link href={`/hub/insights/${insightId}/edit`}>
            <Button className="!text-xs" type="primary">
              <FaEdit className="mr-2" /> Edit Page
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InsightHeader;
