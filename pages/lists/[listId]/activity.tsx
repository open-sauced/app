import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import MostActiveContributorsCard, {
  ContributorStat,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import CalendarIcon from "img/calendar.svg";
import ChevronDownIcon from "img/chevron-down.svg";

interface ContributorListPageProps {
  list?: DBList;
  initialData: {
    meta: Meta;
    data: DbPRContributor[];
  };
  isError: boolean;
  activityData: {
    contributorStats: { data: ContributorStat[]; meta: Meta };
    topContributor: ContributorStat;
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
  const range = 30;
  const [
    { data, error: contributorListError },
    { data: list, error },
    { data: mostActiveData, error: mostActiveError },
  ] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=${limit}`,
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
      initialData: data ?? { data: [], meta: {} },
      isError: error || contributorListError || mostActiveError,
      activityData: {
        contributorStats,
        topContributor: contributorStats?.data?.length ? contributorStats.data[0] : null,
      },
    },
  };
};

const dateFilters = {
  last7days: "Last 7 days",
  last30days: "Last 30 days",
  last3months: "Last 3 months",
};

const ListActivityPage = ({ list, initialData, isError, activityData }: ContributorListPageProps) => {
  const isOwner = false;
  const [contributorStats, setContributorStats] = useState(activityData.contributorStats.data);
  const [currentDateFilter, setCurrentDateFilter] = useState<keyof typeof dateFilters>("last7days");

  return (
    <ListPageLayout list={list} numberOfContributors={initialData.meta.itemCount} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <>
          <div className="mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="items-center gap-1">
                  <Icon IconImage={CalendarIcon} className="w-4 h-4" />
                  {dateFilters[currentDateFilter]}
                  <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-2">
                {Object.entries(dateFilters).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    className="rounded-md !cursor-pointer"
                    onClick={() => setCurrentDateFilter(key as keyof typeof dateFilters)}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <MostActiveContributorsCard data={contributorStats} topContributor={activityData.topContributor} />
          </div>
        </>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
