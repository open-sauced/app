import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

import { FiCopy } from "react-icons/fi";

import { useRouter } from "next/router";
import getRepoInsights from "lib/utils/get-repo-insights";
import Button from "components/shared/Button/button";
import Title from "components/atoms/Typography/title";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";
import { truncateString } from "lib/utils/truncate-string";
import useRepositories from "lib/hooks/api/useRepositories";
import { useToast } from "lib/hooks/useToast";
import { setQueryParams } from "lib/utils/query-params";
import StackedOwners from "components/Workspaces/StackedOwners";
import { shortenUrl } from "lib/utils/shorten-url";
import { writeToClipboard } from "lib/utils/write-to-clipboard";
import CardRepoList from "../CardRepoList/card-repo-list";
import ComponentDateFilter from "../ComponentDateFilter/component-date-filter";

interface InsightHeaderProps {
  insight?: DbUserInsight;
  repositories?: number[];
  insightId: string;
  canEdit: boolean | undefined;
  workspaceId?: string;
  owners?: string[];
}

const InsightHeader = ({
  insight,
  repositories,
  insightId,
  canEdit,
  workspaceId,
  owners,
}: InsightHeaderProps): JSX.Element => {
  const router = useRouter();
  const { range } = router.query;
  const { data: repoData, meta: repoMeta } = useRepositories(repositories);
  const { repoList } = getRepoInsights(repoData);
  const [insightPageLink, setInsightPageLink] = useState("");
  const { toast } = useToast();
  const posthog = usePostHog();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInsightPageLink(window.location.href);
    }
  }, [insight]);

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    posthog!.capture("clicked: Insights copied");

    try {
      const shortUrl = await shortenUrl(url);
      await writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-row justify-between w-full">
      <div className="flex flex-col md:flex-row ">
        <div className="header-image mr-2 p-2 min-w-[130px]">
          <ContextThumbnail size={120} ContextThumbnailURL={""}></ContextThumbnail>
        </div>
        <div className="flex flex-col justify-center p-2 header-info grow">
          <div className="flex gap-2">
            <Title level={1} className="!text-2xl font-semibold text-slate-900">
              {(insight && truncateString(insight.name, 30)) || "Insights"}
            </Title>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {owners && (
              <div className="flex gap-2 items-center">
                <StackedOwners owners={owners} /> |
              </div>
            )}
            {insight && insight.repos && insight.repos.length > 0 && (
              <CardRepoList limit={2} repoList={repoList} total={repoMeta.itemCount} />
            )}
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 top-0 flex flex-col items-end gap-3 py-2 md:items-center md:flex-row md:static">
        <Button
          onClick={() => handleCopyToClipboard(insightPageLink)}
          className="px-6 py-2 bg-white w-max"
          variant="text"
        >
          <FiCopy className="mt-1 mr-2" /> Share
        </Button>
        {canEdit && (
          <Link href={`/workspaces/${workspaceId}/repository-insights/${insightId}/edit`}>
            <Button className="text-xs w-max" variant="primary">
              <FaEdit className="mr-2" /> Edit
            </Button>
          </Link>
        )}
        <div className=" md:hidden mt-auto">
          <ComponentDateFilter
            setRangeFilter={(selectedRange) => {
              setQueryParams({ range: `${selectedRange}` });
            }}
            defaultRange={Number(range)}
          />
        </div>
      </div>
    </div>
  );
};

export default InsightHeader;
