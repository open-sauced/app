import React, { useState } from "react";
import { useRouter } from "next/router";
import NivoScatterPlot, {
  ScatterChartDataItems,
  ScatterChartMetadata,
} from "components/molecules/NivoScatterChart/nivo-scatter-chart";
import Card from "components/atoms/Card/card";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import usePullRequests from "lib/hooks/api/usePullRequests";
import { calcDaysFromToday } from "lib/utils/date-utils";
import { getAvatarByUsername } from "lib/utils/github";

export type PrStatusFilter = "open" | "closed" | "all";
type ContributorPrMap = { [contributor: string]: DbRepoPREvents };

const Activity = ({ repositories }: { repositories: number[] | undefined }) => {
  const router = useRouter();
  const { range = 30 } = router.query;
  const { data: prData, isError: prError } = usePullRequests(undefined, repositories, Number(range));
  const [showBots, setShowBots] = useState(false);
  const isMobile = useMediaQuery("(max-width:720px)");
  const [prStateFilter, setPrStateFilter] = useState<PrStatusFilter>("all");

  const handleSetPrFilter = (state: PrStatusFilter) => {
    setPrStateFilter(state);
  };

  let scatterChartData: ScatterChartDataItems[] = [];

  let metadata: ScatterChartMetadata = {
    allPrs: prData.length,
    openPrs: prData.filter((pr) => pr.pr_state.toLowerCase() === "open").length,
    closedPrs: prData.filter((pr) => pr.pr_state.toLowerCase() === "closed" || pr.pr_is_merged).length,
  };

  const uniqueContributors: ContributorPrMap = prData.reduce((prs, curr) => {
    if (curr.pr_state.toLowerCase() !== prStateFilter && prStateFilter !== "all") return prs;

    if (prs[curr.pr_author_login]) {
      prs[curr.pr_author_login].linesCount += Math.abs(curr.pr_additions - curr.pr_deletions);
    } else {
      prs[curr.pr_author_login] = { ...curr };
      prs[curr.pr_author_login].linesCount = Math.abs(curr.pr_additions - curr.pr_deletions);
    }

    return prs;
  }, {} as ContributorPrMap);

  const prs = Object.keys(uniqueContributors)
    .filter((key) => {
      if (showBots) {
        return true;
      }

      return !key.includes("[bot]");
    })
    .map((key) => uniqueContributors[key]);

  if (prError) {
    scatterChartData = [];
  } else {
    scatterChartData = prs.map(({ pr_updated_at, linesCount, pr_author_login }) => {
      const author_image = pr_author_login.includes("[bot]") ? "octocat" : pr_author_login;

      const data = {
        x: calcDaysFromToday(new Date(pr_updated_at)),
        y: linesCount,
        contributor: pr_author_login,
        image: getAvatarByUsername(author_image, 40),
      };
      return data;
    });
  }

  const maxFilesModified = scatterChartData.reduce((max, curr) => {
    const { y } = curr;
    if (Number(y) > max) {
      return y as number;
    }
    return max;
  }, 0);

  return (
    <div className="flex flex-col w-full">
      <Card className="w-full">
        <NivoScatterPlot
          title="Contributor Distribution"
          showBots={showBots}
          setShowBots={setShowBots}
          data={[{ id: "Contributors", data: scatterChartData }]}
          maxFilesModified={maxFilesModified}
          isMobile={isMobile}
          repositories={repositories}
          metadata={metadata}
          handleSetPrFilter={handleSetPrFilter}
        />
      </Card>
    </div>
  );
};

export default Activity;
