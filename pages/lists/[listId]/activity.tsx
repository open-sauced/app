import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import MostActiveContributorsCard, {
  ContributorStat,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";

import useMostActiveContributors, { getTotalContributions } from "lib/hooks/api/useMostActiveContributors";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import ComponentDateFilter from "components/molecules/ComponentDateFilter/component-date-filter";

interface ContributorListPageProps {
  list?: DBList;
  numberOfContributors: number;
  isError: boolean;
  activityData: {
    contributorStats: { data: ContributorStat[]; meta: Meta };
    topContributor: ContributorStat;
  };
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const { listId } = ctx.params as { listId: string };
  const range = 30;
  const [
    { data, error: contributorListError },
    { data: list, error },
    { data: mostActiveData, error: mostActiveError },
  ] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=1`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
    fetchApiData<PagedData<ContributorStat>>({
      // TODO: order by total contributions once it's part of the API
      // See https://github.com/open-sauced/api/issues/347
      path: `lists/${listId}/stats/most-active-contributors?range=${range}&qorderDirection=DESC&orderBy=commits&limit=20`,
      bearerToken,
      pathValidator: validateListPath,
    }),
  ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  // TODO: remove map once total_contributions is part of the API endpoint payload
  // See https://github.com/open-sauced/api/issues/347
  const contributorStats = {
    data: mostActiveData?.data
      ?.map((contributor) => ({
        ...contributor,
        total_contributions: getTotalContributions(contributor),
      }))
      .sort((a, b) => b.total_contributions - a.total_contributions),
    meta: mostActiveData?.meta,
  };

  return {
    props: {
      list,
      numberOfContributors: data?.meta.itemCount,
      isError: error || contributorListError || mostActiveError,
      activityData: {
        contributorStats,
        topContributor: contributorStats?.data?.length ? contributorStats.data[0] : null,
      },
    },
  };
};

const ListActivityPage = ({ list, numberOfContributors, isError, activityData }: ContributorListPageProps) => {
  const isOwner = false;
  const {
    data: contributorStats,
    isLoading,
    isError: isMostActiveError,
    setRange,
  } = useMostActiveContributors({ listId: list!.id, initData: activityData.contributorStats.data });

  return (
    <ListPageLayout
      list={list}
      numberOfContributors={numberOfContributors}
      isOwner={isOwner}
      rightSlot={
        <div className="flex justify-end">
          <ComponentDateFilter setRangeFilter={setRange} />
        </div>
      }
    >
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4 flex flex-col">
          <ClientOnly>
            {/* TODO: Remove client only once server data is being used in the hook on initial load client-side */}
            <MostActiveContributorsCard data={contributorStats} topContributor={activityData.topContributor} />
          </ClientOnly>
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
