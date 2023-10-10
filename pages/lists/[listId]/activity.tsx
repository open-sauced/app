import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import MostActiveContributorsCard, {
  ContributorStat,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";

import useMostActiveContributors from "lib/hooks/api/useMostActiveContributors";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { ContributionsTreemap } from "components/molecules/ContributionsTreemap/contributions-treemap";

// begin test data
const color = "hsla(21, 90%, 48%, 1)";
const repos = [
  {
    id: "/insights",
    value: 340,
  },
  {
    id: "/hot",
    value: 120,
  },
  {
    id: "/ai",
    value: 120,
  },
  {
    id: "/pizza-cli",
    value: 100,
  },
  {
    id: "/super-secret-special-sauce",
    value: 84,
  },
];
const contributors = [
  {
    id: "foxyblocks",
    value: 68,
    color: color,
  },
  {
    id: "codebytere",
    value: 166,
    color: color,
  },
  {
    id: "miniak",
    value: 163,
    color: color,
  },
  {
    id: "ckerr",
    value: 115,
    color: color,
  },
  {
    id: "JeanMeche",
    value: 84,
    color: color,
  },
  {
    id: "annacmc",
    value: 90,
    color: color,
  },
];

const treeData = {
  id: "root",
  color: color,
  children: repos,
};
const treeData2 = {
  id: "root",
  color: color,
  children: contributors,
};
// end test data

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
      path: `lists/${listId}/stats/most-active-contributors?range=${range}&orderDirection=DESC&orderBy=total_contributions&limit=20&contributorType=all`,
      bearerToken,
      pathValidator: validateListPath,
    }),
  ]);

  if (error?.status === 404 || error?.status === 401) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      numberOfContributors: data?.meta.itemCount,
      isError: error || contributorListError || mostActiveError,
      activityData: {
        contributorStats: mostActiveData,
        topContributor: mostActiveData?.data?.length ? mostActiveData.data[0] : null,
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
    setContributorType,
    contributorType,
  } = useMostActiveContributors({ listId: list!.id, initData: activityData.contributorStats.data });
  const [level, setLevel] = useState(0);
  const onHandleClick = () => {
    setLevel(level + 1);
  };
  const data = level === 0 ? treeData : treeData2;

  return (
    <ListPageLayout list={list} numberOfContributors={numberOfContributors} isOwner={isOwner} setRange={setRange}>
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4 flex flex-col">
          <ClientOnly>
            {/* TODO: Remove client only once server data is being used in the hook on initial load client-side */}
            <MostActiveContributorsCard
              data={contributorStats?.data ?? []}
              totalContributions={contributorStats?.meta.allContributionsCount ?? 0}
              topContributor={activityData.topContributor}
              setContributorType={setContributorType}
              contributorType={contributorType}
              isLoading={isLoading}
            />
          </ClientOnly>
          <ContributionsTreemap setLevel={setLevel} level={level} onClick={onHandleClick} data={data} color={color} />
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
