import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { NodeMouseEventHandler } from "@nivo/treemap";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
import { getGraphColorPalette } from "lib/utils/color-utils";
import ContributionsEvolutionByType from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";
import useContributionsEvolutionByType from "lib/hooks/api/useContributionsByEvolutionType";
import { setQueryParams } from "lib/utils/query-params";
import { FeatureFlagged } from "components/shared/feature-flagged";
import { FeatureFlag, getAllFeatureFlags } from "lib/utils/server/feature-flags";
import { MostUsedLanguagesGraph } from "components/Graphs/MostUsedLanguagesGraph/most-used-languages-graph";
import useMostLanguages from "lib/hooks/api/useMostLanguages";

interface ContributorListPageProps {
  list?: DBList;
  numberOfContributors: number;
  isError: boolean;
  activityData: {
    contributorStats: { data: ContributorStat[]; meta: Meta };
    topContributor: ContributorStat;
    projectData: DbProjectContributions[];
  };
  isOwner: boolean;
  featureFlags: Record<FeatureFlag, boolean>;
}

export type FilterParams = {
  listId: string;
  range?: string;
  limit?: string;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const { listId, range: rawRange, limit: rawLimit } = ctx.params as FilterParams;

  const range = rawRange ? Number(rawRange) : "30";
  const limit = rawLimit ? Number(rawLimit) : "20";
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
      path: `lists/${listId}/stats/most-active-contributors?range=${range}&orderDirection=DESC&orderBy=total_contributions&limit=${limit}&contributorType=all`,
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

  const userId = Number(session?.user.user_metadata.sub);
  const featureFlags = await getAllFeatureFlags(userId);

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
      isOwner: list && list.user_id === userId,
      featureFlags,
    },
  };
};

const ListActivityPage = ({
  list,
  numberOfContributors,
  isError,
  activityData,
  isOwner,
  featureFlags,
}: ContributorListPageProps) => {
  const router = useRouter();
  const range = router.query.range as string;
  const {
    data: contributorStats,
    isLoading,
    isError: isMostActiveError,
    setContributorType,
    contributorType,
  } = useMostActiveContributors({ listId: list!.id, initData: activityData.contributorStats.data });

  useEffect(() => {
    if (!range) {
      setQueryParams({ range: "30" });
    }
  }, [range]);

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

  const {
    data: evolutionData,
    isError: evolutionError,
    isLoading: isLoadingEvolution,
  } = useContributionsEvolutionByType({ listId: list!.id, range });
  const {
    data: languagesData,
    isError: languageError,
    isLoading: isLanguagesLoading,
  } = useMostLanguages({ listId: list!.id });
  const languages = languagesData?.data ?? [];

  return (
    <ListPageLayout list={list} numberOfContributors={numberOfContributors} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ClientOnly>
            {/* TODO: Remove client only once server data is being used in the hook on initial load client-side */}
            <MostActiveContributorsCard
              data={contributorStats?.data ?? []}
              totalContributions={contributorStats?.meta.allContributionsCount ?? 0}
              topContributor={contributorStats?.data?.length ? contributorStats.data[0] : undefined}
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
            color={getGraphColorPalette()}
          />
          <FeatureFlagged flag="contributions_evolution_by_type" featureFlags={featureFlags}>
            <ContributionsEvolutionByType data={evolutionData} isLoading={isLoadingEvolution} />
          </FeatureFlagged>
          <MostUsedLanguagesGraph
            contributorType={contributorType}
            setContributorType={setContributorType}
            data={languages}
            isLoading={isLanguagesLoading}
            hasError={true}
          />
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
