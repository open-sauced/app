import { useState } from "react";
import { useRouter } from "next/router";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import ListPageLayout from "layouts/lists";

import Card from "components/atoms/Card/card";
import NivoScatterPlot from "components/molecules/NivoScatterChart/nivo-scatter-chart";
import { ScatterChartDataItems } from "components/molecules/NivoScatterChart/nivo-scatter-chart";

import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { calcDaysFromToday } from "lib/utils/date-utils";
import { getAvatarByUsername } from "lib/utils/github";
import useListContributions from "lib/hooks/useListContributions";
import useListStats from "lib/hooks/useListStats";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ClientOnly from "components/atoms/ClientOnly/client-only";

type ContributorPrMap = { [contributor: string]: DbRepoPR };

interface ListsOverviewProps {
  list: DBList;
  numberOfContributors: number;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId } = ctx.params as { listId: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=${limit}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
  ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      numberOfContributors: data?.meta.itemCount || 0,
    },
  };
};

const ListsOverview = ({ list, numberOfContributors }: ListsOverviewProps): JSX.Element => {
  const router = useRouter();
  const { listId } = router.query;
  const { data: prData, isError: prError } = useListContributions(listId as string);

  const {
    data: prevAllContributorStats,
    meta: prevAllContributorMeta,
    isLoading: prevAllContributorStatsLoading,
  } = useListStats(listId as string, "all", 30);
  const {
    data: allContributorStats,
    meta: allContributorMeta,
    isLoading: allContributorStatsLoading,
  } = useListStats(listId as string, "all");

  const { meta: prevNewContributorMeta, isLoading: prevNewContributorStatsLoading } = useListStats(
    listId as string,
    "new",
    30
  );
  const { meta: newContributorMeta, isLoading: newContributorStatsLoading } = useListStats(listId as string, "new");

  const { meta: prevAlumniContributorMeta, isLoading: prevAlumniContributorStatsLoading } = useListStats(
    listId as string,
    "alumni",
    30
  );
  const { meta: alumniContributorMeta, isLoading: alumniContributorStatsLoading } = useListStats(
    listId as string,
    "alumni"
  );

  const allContributorCommits = allContributorStats?.reduce((acc, curr) => acc + curr.commits, 0) || 0;
  const prevAllContributorCommits = prevAllContributorStats?.reduce((acc, curr) => acc + curr.commits, 0) || 0;
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
    <ListPageLayout list={list} numberOfContributors={numberOfContributors} isOwner={false}>
      <div className="flex flex-col w-full gap-4">
        <ClientOnly>
          <section className="flex flex-wrap items-center max-w-full gap-4 lg:flex-row lg:flex-nowrap">
            <HighlightCard
              label="Commits"
              icon="commits"
              metricIncreases={allContributorCommits > prevAllContributorCommits}
              increased={allContributorCommits > prevAllContributorCommits}
              value={allContributorCommits}
              valueLabel="in the last 30d"
            />
            <HighlightCard
              label="Active Contributors"
              icon="active-contributors"
              metricIncreases={allContributorMeta.itemCount > prevAllContributorMeta.itemCount}
              increased={allContributorMeta.itemCount > prevAllContributorMeta.itemCount}
              numChanged={allContributorMeta.itemCount - prevAllContributorMeta.itemCount}
              value={allContributorMeta.itemCount}
              isLoading={prevAllContributorStatsLoading || allContributorStatsLoading}
            />
            <HighlightCard
              label="New Contributors"
              icon="new-contributors"
              metricIncreases={newContributorMeta.itemCount > prevNewContributorMeta.itemCount}
              increased={newContributorMeta.itemCount > prevNewContributorMeta.itemCount}
              numChanged={newContributorMeta.itemCount - prevNewContributorMeta.itemCount}
              value={newContributorMeta.itemCount}
              isLoading={prevNewContributorStatsLoading || newContributorStatsLoading}
            />
            <HighlightCard
              label="Alumni Contributors"
              icon="alumni-contributors"
              metricIncreases={alumniContributorMeta.itemCount > prevAlumniContributorMeta.itemCount}
              increased={alumniContributorMeta.itemCount > prevAlumniContributorMeta.itemCount}
              numChanged={alumniContributorMeta.itemCount - prevAlumniContributorMeta.itemCount}
              value={alumniContributorMeta.itemCount}
              isLoading={prevAlumniContributorStatsLoading || alumniContributorStatsLoading}
            />
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
        </ClientOnly>
      </div>
    </ListPageLayout>
  );
};

export default ListsOverview;
