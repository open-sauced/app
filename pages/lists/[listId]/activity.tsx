import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { NodeMouseEventHandler } from "@nivo/treemap";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import MostActiveContributorsCard, {
  ContributorStat,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
import useMostActiveContributors from "lib/hooks/api/useMostActiveContributors";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { ContributionsTreemap } from "components/molecules/ContributionsTreemap/contributions-treemap";
import { useContributorsByProject } from "lib/hooks/api/useContributorsByProject";
import { useContributionsByProject } from "lib/hooks/api/useContributionsByProject";

interface ContributorListPageProps {
  list?: DBList;
  numberOfContributors: number;
  isError: boolean;
  activityData: {
    contributorStats: { data: ContributorStat[]; meta: Meta };
    topContributor: ContributorStat;
    projectData: DbProjectContributions[];
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
    { data: projectData, error: projectError },
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
    fetchApiData<DbProjectContributions>({
      path: `lists/${listId}/stats/contributions-by-project?range=${range}`,
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
        projectData: projectData ?? [],
      },
    },
  };
};

const ListActivityPage = ({ list, numberOfContributors, isError, activityData }: ContributorListPageProps) => {
  const [range, setRange] = useState(30);
  const isOwner = false;
  const {
    data: contributorStats,
    isLoading,
    isError: isMostActiveError,
    setContributorType,
    contributorType,
  } = useMostActiveContributors({ listId: list!.id, initData: activityData.contributorStats.data, range });

  const { setRepoId, error, data: projectContributionsByUser, repoId } = useContributorsByProject(list!.id, range);

  const { data: projectData, error: projectDataError } = useContributionsByProject({
    listId: list!.id,
    range,
    initialData: activityData.projectData,
  });

  const onHandleClick: NodeMouseEventHandler<object> = (node) => {
    // @ts-ignore TODO: fix this
    setRepoId(Number(node.data.repoId));
  };
  const treemapData = {
    id: "root",
    children:
      repoId === null
        ? (projectData ?? []).map(({ org_id, project_id, repo_id, contributions }) => {
            return {
              id: `${org_id}/${project_id}`,
              value: contributions,
              repoId: `${repo_id}`,
            };
          })
        : projectContributionsByUser?.map(({ login, commits, prs_created, prs_reviewed, issues_created, comments }) => {
            return {
              id: login,
              value: commits + prs_created, // Coming soon + prs_reviewed + issues_created + comments,
            };
          }),
  };

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
          <ContributionsTreemap
            setRepoId={setRepoId}
            repoId={repoId}
            onClick={onHandleClick}
            data={treemapData}
            color="hsla(21, 90%, 48%, 1)"
          />
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
