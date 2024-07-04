import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { usePostHog } from "posthog-js/react";

import { FiCopy } from "react-icons/fi";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
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
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import CardRepoList from "../CardRepoList/card-repo-list";
import ComponentDateFilter from "../ComponentDateFilter/component-date-filter";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

interface InsightHeaderProps {
  insight?: DbUserInsight;
  repositories?: number[];
  insightId: string;
  canEdit: boolean | undefined;
  workspaceId?: string;
  owners?: string[];
  overLimit?: boolean;
}

const InsightHeader = ({
  insight,
  repositories,
  insightId,
  canEdit,
  workspaceId,
  owners,
  overLimit,
}: InsightHeaderProps): JSX.Element => {
  const router = useRouter();
  const { range } = router.query;
  const { data: repoData, meta: repoMeta } = useRepositories(repositories);
  const { repoList } = getRepoInsights(repoData);
  const [insightPageLink, setInsightPageLink] = useState("");
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);
  const { toast } = useToast();
  const posthog = usePostHog();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const size = isMobile ? 80 : 120;

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
      writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid gap-2 w-full">
        <div className="relative flex justify-between">
          <div className="grid md:flex">
            <div className="header-image mr-2 p-2 min-w-[130px]">
              <ContextThumbnail size={size} ContextThumbnailURL={""} />
            </div>
            <div className="md:flex md:flex-col md:justify-center p-2 header-info grow hidden">
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
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleCopyToClipboard(insightPageLink)}
              className="px-6 py-2 bg-white w-max"
              variant="text"
            >
              <FiCopy className="mt-1 mr-2" /> Share
            </Button>
            {canEdit && (
              <Button
                className="text-xs w-max"
                variant="primary"
                onClick={() => {
                  if (overLimit) {
                    setIsInsightUpgradeModalOpen(true);
                    return;
                  }

                  router.push(`/workspaces/${workspaceId}/repository-insights/${insightId}/edit`);
                }}
              >
                <FaEdit className="mr-2" /> Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center p-2 header-info grow md:hidden">
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
        <div className=" md:hidden mt-auto flex justify-end">
          <ComponentDateFilter
            setRangeFilter={(selectedRange) => {
              setQueryParams({ range: `${selectedRange}` });
            }}
            defaultRange={Number(range)}
          />
        </div>
        {workspaceId && (
          <InsightUpgradeModal
            workspaceId={workspaceId}
            variant="all"
            isOpen={isInsightUpgradeModalOpen}
            onClose={() => setIsInsightUpgradeModalOpen(false)}
            overLimit={0}
          />
        )}
      </div>
    </>
  );
};

export default InsightHeader;
