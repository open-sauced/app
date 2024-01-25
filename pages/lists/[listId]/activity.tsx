import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { NodeMouseEventHandler } from "@nivo/treemap";
import { useRef } from "react";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import MostActiveContributorsCard from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
import useMostActiveContributors from "lib/hooks/api/useMostActiveContributors";
import { ContributionsTreemap } from "components/Graphs/ContributionsTreemap/contributions-treemap";
import { useContributorsByProject } from "lib/hooks/api/useContributorsByProject";
import { useContributionsByProject } from "lib/hooks/api/useContributionsByProject";
import { getGraphColorPalette } from "lib/utils/color-utils";
import ContributionsEvolutionByType from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";
import useContributionsEvolutionByType from "lib/hooks/api/useContributionsByEvolutionType";
import { FeatureFlagged } from "components/shared/feature-flagged";
import { FeatureFlag, getAllFeatureFlags } from "lib/utils/server/feature-flags";
import { OnToggleResizeEventType } from "components/Graphs/shared/graph-resizer";

export interface ContributorListPageProps {
  list?: DBList;
  numberOfContributors: number;
  isError: boolean;
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

  const range = rawRange ? Number(rawRange) : 30;
  const limit = rawLimit ? Number(rawLimit) : 20;
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=1`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
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
      isError: error || contributorListError,
      isOwner: list && list.user_id === userId,
      featureFlags,
    },
  };
};

// if no repoId is set,  want the id

const getTreemapData = ({
  orgId,
  repoId,
  projectData = [],
  projectContributionsByUser = [],
}: {
  orgId: string | null;
  repoId: number | null;
  projectData: DbProjectContributions[];
  projectContributionsByUser: DBProjectContributor[] | undefined;
}) => {
  let children;

  switch (true) {
    case orgId === null:
      children = Object.values(
        projectData.reduce((acc, { org_id, contributions }) => {
          if (!acc[org_id]) {
            acc[org_id] = { id: org_id, value: 0, orgId: org_id };
          }
          acc[org_id].value += contributions;
          return acc;
        }, {} as any)
      );
      break;
    case orgId !== null && repoId === null:
      children = projectData
        .filter(({ org_id }) => org_id === orgId)
        .map(({ org_id, project_id, repo_id, contributions }) => {
          return {
            id: project_id,
            value: contributions,
            repoId: `${repo_id}`,
          };
        });
      break;

    case repoId !== null:
      children = projectContributionsByUser.map(
        ({ login, commits, prs_created, prs_reviewed, issues_created, comments }) => {
          return {
            id: login,
            value: commits + prs_created, // Coming soon + prs_reviewed + issues_created + comments,
          };
        }
      );
      break;
  }

  return {
    id: "root",
    children,
  };
};

const ListActivityPage = ({ list, numberOfContributors, isError, isOwner, featureFlags }: ContributorListPageProps) => {
  const router = useRouter();
  const range = router.query.range as string;
  const {
    data: contributorStats,
    isLoading,
    isError: isMostActiveError,
    setContributorType,
    contributorType,
  } = useMostActiveContributors({ listId: list!.id });
  const [orgId, setOrgId] = useState<string | null>(null);
  const {
    setRepoName,
    error,
    data: projectContributionsByUser,
    repoName,
    isLoading: isLoadingProjectContributionsByUser,
  } = useContributorsByProject(list!.id, Number(range ?? "30"));
  const [projectId, setProjectId] = useState<string | null>(null);

  const {
    data: projectData = [],
    error: projectDataError,
    isLoading: isTreemapLoading,
  } = useContributionsByProject({
    listId: list!.id,
    range: Number(range ?? "30"),
  });

  const onDrillDown: NodeMouseEventHandler<{ orgId: null; repoId: null; id: string | null }> = (node) => {
    if (orgId === null) {
      setOrgId(node.data.orgId);
      return;
    } else {
      setRepoId(Number(node.data.repoId));
      setProjectId(node.data.id);
    }
  };

  const onDrillUp = () => {
    if (repoId !== null) {
      setRepoId(null);
      setProjectId(null);
    } else {
      setOrgId(null);
    }
  };

  const treemapData = getTreemapData({ orgId, repoId, projectData, projectContributionsByUser });

  const {
    data: evolutionData,
    isError: evolutionError,
    isLoading: isLoadingEvolution,
  } = useContributionsEvolutionByType({ listId: list!.id, range: Number(range ?? "30") });
  const treemapRef = useRef<HTMLSpanElement>(null);
  const mostActiveRef = useRef<HTMLSpanElement>(null);
  const graphResizerLookup = new Map();

  if (treemapRef.current) {
    graphResizerLookup.set(treemapRef.current, true);
  }

  if (mostActiveRef.current) {
    graphResizerLookup.set(mostActiveRef.current, true);
  }

  const onToggleResize: OnToggleResizeEventType = (checked) => {
    const treemap = treemapRef.current;

    if (!treemap) {
      return;
    }

    treemap.style.gridColumn = checked ? "1 / span 2" : "";
    treemap.style.gridRow = checked ? "1 / span 2" : "";
  };

  return (
    <ListPageLayout list={list} numberOfContributors={numberOfContributors} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list activity" />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <MostActiveContributorsCard
            data={contributorStats?.data ?? []}
            totalContributions={contributorStats?.meta.allContributionsCount ?? 0}
            topContributor={contributorStats?.data?.length ? contributorStats.data[0] : undefined}
            setContributorType={setContributorType}
            contributorType={contributorType}
            isLoading={isLoading}
          />
          <span ref={treemapRef} className="relative">
            <ContributionsTreemap
              projectId={projectId}
              orgId={orgId}
              onDrillDown={onDrillDown as NodeMouseEventHandler<object>}
              onDrillUp={onDrillUp}
              data={treemapData}
              color={getGraphColorPalette()}
              isLoading={isLoadingProjectContributionsByUser || isTreemapLoading}
              onToggleResize={onToggleResize}
            />
          </span>
          <FeatureFlagged flag="contributions_evolution_by_type" featureFlags={featureFlags}>
            <ContributionsEvolutionByType data={evolutionData} isLoading={isLoadingEvolution} />
          </FeatureFlagged>
        </div>
      )}
    </ListPageLayout>
  );
};

export default ListActivityPage;
