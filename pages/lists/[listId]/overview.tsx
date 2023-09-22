import { useState } from "react";
import { useRouter } from "next/router";
import ListPageLayout from "layouts/lists";

import Card from "components/atoms/Card/card";
import NivoScatterPlot from "components/molecules/NivoScatterChart/nivo-scatter-chart";
import { ScatterChartDataItems } from "components/molecules/NivoScatterChart/nivo-scatter-chart";

import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { calcDaysFromToday } from "lib/utils/date-utils";
import { getAvatarByUsername } from "lib/utils/github";
import useListContributions from "lib/hooks/useListContributions";
// import useListStats from "lib/hooks/useListStats";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";

type ContributorPrMap = { [contributor: string]: DbRepoPR };

const ListsOverview = (): JSX.Element => {
  const router = useRouter();
  const { listId } = router.query;
  const { data: prData, isError: prError } = useListContributions(listId as string);
  // const { data: statsData } = useListStats(listId as string);
  const [showBots, setShowBots] = useState(false);
  const isMobile = useMediaQuery("(max-width:720px)");

  let scatterChartData: ScatterChartDataItems[] = [];

  const uniqueContributors: ContributorPrMap = prData.reduce((prs, curr) => {
    if (prs[curr.author_login]) {
      prs[curr.author_login].linesCount += Math.abs(curr.additions - curr.deletions);
    } else {
      prs[curr.author_login] = { ...curr };
      prs[curr.author_login].linesCount = Math.abs(curr.additions - curr.deletions);
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
    scatterChartData = prs.map(({ updated_at, linesCount, author_login }) => {
      const author_image = author_login.includes("[bot]") ? "octocat" : author_login;

      const data = {
        x: calcDaysFromToday(new Date(updated_at)),
        y: linesCount,
        contributor: author_login,
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
    <div className="flex flex-col w-full gap-4">
      <section className="flex flex-wrap items-center max-w-full gap-4 lg:flex-row lg:flex-nowrap">
        <HighlightCard label="Commits" icon="contributors" metricIncreases={true} value={5} />
        <HighlightCard label="Active Contributors" icon="spam" metricIncreases={true} value={10} />
        <HighlightCard label="New Contributors" icon="accepted-pr" metricIncreases={true} value={15} />
        <HighlightCard label="Alumni Contributors" icon="unlabeled-pr" metricIncreases={true} value={20} />
      </section>
      <section className="flex flex-col max-w-full gap-4 mb-6 lg:flex-row">
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <NivoScatterPlot
              title="Contributor Distribution"
              showBots={showBots}
              setShowBots={setShowBots}
              data={[{ id: "Contributors", data: scatterChartData }]}
              maxFilesModified={maxFilesModified}
              isMobile={isMobile}
            />
          </Card>
        </div>
      </section>
    </div>
  );
};

ListsOverview.PageLayout = ListPageLayout;

export default ListsOverview;
