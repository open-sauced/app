import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { eachDayOfInterval, subDays } from "date-fns";
import { useState } from "react";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import ContributionsEvolutionByType, {
  ContributionEvolutionByTypeDatum,
} from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";
import { ContributionStat } from "components/molecules/ContributionsEvolution/contributions-evolution-card";
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
  chartData: {
    contributionsByType: ContributionEvolutionByTypeDatum[];
    contributionStats: ContributionStat[];
    contributorStats: ContributorStat[];
  };
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
      initialData: data ?? { data: [], meta: {} },
      isError: error || contributorListError,
      chartData: {
        contributionsByType: generateData(),
        contributionStats: generateContributionStats(),
        contributorStats: mostActiveData(),
      },
    },
  };
};

const ListActivityPage = ({ list, initialData, isError, chartData }: ContributorListPageProps) => {
  const isOwner = false;
  const [contributionsByType, setContributionsByType] = useState(chartData.contributionsByType);
  const [contributionStats, setContributionStats] = useState(chartData.contributionStats);
  const [contributorStats, setContributorStats] = useState(chartData.contributorStats);
  return (
    <ListPageLayout list={list} numberOfContributors={initialData.meta.itemCount} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <MostActiveContributorsCard data={contributorStats} />
          {/* <ContributionsEvolutionCard data={contributionStats} /> */}
          {/* <ContributionsEvolutionCard data={contributionStats} /> */}
          <ContributionsEvolutionByType data={contributionsByType} />
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;

// Test data
function randomValueCloseToValue(value: number) {
  return Math.max(value + Math.floor(Math.random() * 100 - 50), 0);
}

function generateData() {
  // Use date-fns to get an array of the last 6 weeks
  const today = new Date();
  const sixWeeksAgo = subDays(today, 7 * 6);
  const result = eachDayOfInterval({
    start: sixWeeksAgo,
    end: today,
  });

  // return result.map((date) => ({
  //   startTime: date.toString(),
  //   active: Math.floor(Math.random() * 500),
  //   new: Math.floor(Math.random() * 500),
  //   churned: Math.floor(Math.random() * 500),
  // }));

  // generate data for each day but make it so that the next value is a random value that is close to the previous value
  let previousActive = Math.floor(Math.random() * 500);
  let previousNew = Math.floor(Math.random() * 500);
  let previousChurned = Math.floor(Math.random() * 500);
  return result.map((date) => {
    const newActive = randomValueCloseToValue(previousActive);
    const newNew = randomValueCloseToValue(previousNew);
    const newChurned = randomValueCloseToValue(previousChurned);

    previousActive = newActive;
    previousNew = newNew;
    previousChurned = newChurned;

    return {
      startTime: date.toString(),
      active: newActive,
      new: newNew,
      churned: newChurned,
    };
  });
}

function generateContributionStats() {
  // Use date-fns to get an array of the last 7 days
  const today = new Date();
  const weekAgo = subDays(today, 6);
  const result = eachDayOfInterval({
    start: weekAgo,
    end: today,
  });

  return result.map((date) => ({
    startTime: date.toString(),
    commits: Math.floor(Math.random() * 500),
    prsCreated: Math.floor(Math.random() * 500),
    prsReviewed: Math.floor(Math.random() * 500),
    issuesCreated: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 500),
  }));
}

function mostActiveData() {
  return [
    "CBID2",
    "OgDev-01",
    "brandonroberts",
    "deepakrudrapaul",
    "bdougie",
    "diivi",
    "babblebey",
    "BekahHW",
    "dominicduffin1",
    "adiati98",
    "Anush008",
    "a0m0rajab",
    "NsdHSO",
    "RitaDee",
    "doaortu",
    "danielglejzner",
    "jpmcb",
    "goetzrobin",
    "nickytonline",
    "hankadev",
    "k1nho",
    "KashishLakhara04",
    "fmerian",
    "davidgetahead",
    "MartiinWalsh",
    "Muyixone",
    "zillBoy",
    "Edlavio",
    "kelvinyelyen",
    "JacobMGEvans",
    "0-vortex",
    "takanome-dev",
    "kevinctofel",
    "Brian-Pob",
    "jmslynn",
    "Satyxm",
    "sudojunior",
    "ozgursar",
    "droffilc1",
    "UlisesGascon",
    "MohitBansal321",
    "shelleymcq",
    "WebDevCode",
    "bpirrocco",
    "Ntshangase",
    "mihrab34",
    "code-briomar",
    "Deadreyo",
    "MaurerKrisztian",
    "stephengade",
  ].map((login) => {
    const user = {
      login,
      contributions: {
        commits: Math.floor(Math.random() * 500),
        prsCreated: Math.floor(Math.random() * 500),
        prsReviewed: Math.floor(Math.random() * 500),
        issuesCreated: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 500),
      },
    };

    return {
      ...user,
      totalContributions: Object.values(user.contributions).reduce((acc, curr) => acc + curr, 0),
    };
  });
}
