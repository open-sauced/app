import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import { ContributionEvolutionByTypeDatum } from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";
import MostActiveContributorsCard, {
  ContributorStat,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
interface ContributorListPageProps {
  list?: DBList;
  initialData: {
    meta: Meta;
    data: DbPRContributor[];
  };
  isError: boolean;
  activityData: {
    contributionsByType: ContributionEvolutionByTypeDatum[];
    contributorStats: { data: ContributorStat[]; meta: Meta };
  };
}

function getTotalContributions(contributor: ContributorStat) {
  return Object.values(contributor).reduce((acc, curr) => {
    if (typeof curr === "number") {
      return acc + curr;
    }
    return acc;
  }, 0);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const { listId } = ctx.params as { listId: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [
    { data, error: contributorListError },
    { data: list, error },
    { data: mostActiveData, error: mostActiveError },
    { data: contributionsByType, error: contributionsByTypeError },
  ] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=${limit}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
    fetchApiData<PagedData<ContributorStat>>({
      path: `lists/${listId}/stats/most-active-contributors`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<PagedData<ContributionEvolutionByTypeDatum>>({
      path: `lists/${listId}/stats/contributions-evolution-by-type`,
      bearerToken,
      pathValidator: validateListPath,
    }),
  ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      initialData: data ?? { data: [], meta: {} },
      isError: error || contributorListError || mostActiveError,
      activityData: {
        contributionsByType,
        // TODO: remove map once totalContribtions is part of a ContributorStat
        contributorStats: {
          data: mostActiveData?.data?.map((contributor) => ({
            ...contributor,
            totalContributions: getTotalContributions(contributor),
          })),
          meta: mostActiveData?.meta,
        },
      },
    },
  };
};

const ListActivityPage = ({ list, initialData, isError, activityData }: ContributorListPageProps) => {
  const isOwner = false;
  // const [contributionsByType, setContributionsByType] = useState(activityData.contributionsByType);
  const [contributorStats, setContributorStats] = useState(activityData.contributorStats.data);

  return (
    <ListPageLayout list={list} numberOfContributors={initialData.meta.itemCount} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <MostActiveContributorsCard data={contributorStats} />
          {/* <ContributionsEvolutionByType data={contributionsByType} /> */}
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
