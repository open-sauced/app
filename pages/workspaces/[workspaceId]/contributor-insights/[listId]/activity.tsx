import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { NodeMouseEventHandler } from "@nivo/treemap";
import { useRef } from "react";
import ContributionsEvolutionByType from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";
import { ContributionsTreemap } from "components/Graphs/ContributionsTreemap/contributions-treemap";
import Error from "components/atoms/Error/Error";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ListPageLayout from "layouts/lists";
import MostActiveContributorsCard from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
import useMostActiveContributors from "lib/hooks/api/useMostActiveContributors";
import { useContributorsByProject } from "lib/hooks/api/useContributorsByProject";
import { useContributionsByProject } from "lib/hooks/api/useContributionsByProject";
import { getGraphColorPalette } from "lib/utils/color-utils";
import useContributionsEvolutionByType from "lib/hooks/api/useContributionsByEvolutionType";
import { FeatureFlagged } from "components/shared/feature-flagged";
import { FeatureFlag, getAllFeatureFlags } from "lib/utils/server/feature-flags";
import { OnToggleResizeEventType } from "components/Graphs/shared/graph-resizer";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

export interface ContributorListPageProps {
  list?: DBList;
  workspaceId: string;
  numberOfContributors: number;
  isError: boolean;
  isOwner: boolean;
  featureFlags: Record<FeatureFlag, boolean>;
  owners: string[];
}

export type FilterParams = {
  listId: string;
  range?: string;
  limit?: string;
  workspaceId: string | null;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const { listId, range: rawRange, limit: rawLimit, workspaceId = null } = ctx.params as FilterParams;

  const range = rawRange ? Number(rawRange) : 30;
  const limit = rawLimit ? Number(rawLimit) : 20;
  const [{ data, error: contributorListError }, { data: list, error }, { data: workspaceMembers }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=1`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
    fetchApiData<any>({ path: `workspaces/${workspaceId}/members`, bearerToken, pathValidator: () => true }),
  ]);

  if (error?.status === 404 || error?.status === 401) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);
  const featureFlags = await getAllFeatureFlags(userId);

  const owners = Array.from(workspaceMembers.data, (member: { role: string; member: Record<string, any> }) => {
    if (member.role === "owner") {
      return member.member.login;
    }
  });

  return {
    props: {
      list,
      workspaceId,
      numberOfContributors: data?.meta.itemCount,
      isError: error || contributorListError,
      isOwner: list && list.user_id === userId,
      featureFlags,
      owners,
    },
  };
};

// if no repoName is set,  want the id

const getTreemapData = ({
  currentOrgName,
  repoName,
  projectData = [],
  projectContributionsByUser = [],
}: {
  currentOrgName: string | null;
  repoName: string | null;
  projectData: DbProjectContributions[];
  projectContributionsByUser: DBProjectContributor[] | undefined;
}) => {
  let children;

  switch (true) {
    case currentOrgName === null:
      children = Object.values(
        projectData.reduce((acc, { repo_name, total_contributions }) => {
          const [orgName] = repo_name.split("/");

          if (!acc[orgName]) {
            acc[orgName] = { id: orgName, value: 0, orgName };
          }
          acc[orgName].value += total_contributions;
          return acc;
        }, {} as any)
      );
      break;
    case currentOrgName !== null && repoName === null:
      children = projectData
        .filter(({ repo_name }) => {
          const [org_id] = repo_name.split("/");

          return org_id === currentOrgName;
        })
        .map(({ repo_name, total_contributions }) => {
          return {
            id: repo_name,
            value: total_contributions,
            repoName: `${repo_name}`,
          };
        });
      break;

    case repoName !== null:
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

const ListActivityPage = ({
  list,
  workspaceId,
  numberOfContributors,
  isError,
  isOwner,
  featureFlags,
  owners,
}: ContributorListPageProps) => {
  const router = useRouter();
  const range = router.query.range as string;
  const {
    data: contributorStats,
    isLoading,
    isError: isMostActiveError,
    setContributorType,
    contributorType,
  } = useMostActiveContributors({ listId: list!.id });
  const [currentOrgName, setCurrentOrgName] = useState<string | null>(null);
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

  const onDrillDown: NodeMouseEventHandler<{ orgName: null; repoName: null; id: string | null }> = (node) => {
    if (currentOrgName === null) {
      setCurrentOrgName(node.data.orgName);
      return;
    } else {
      setRepoName(node.data.repoName);
      setProjectId(node.data.id);
    }
  };

  const onDrillUp = () => {
    if (repoName !== null) {
      setRepoName(null);
      setProjectId(null);
    } else {
      setCurrentOrgName(null);
    }
  };

  const treemapData = getTreemapData({ currentOrgName, repoName, projectData, projectContributionsByUser });

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
    <WorkspaceLayout workspaceId={workspaceId}>
      <ListPageLayout
        list={list}
        workspaceId={workspaceId}
        numberOfContributors={numberOfContributors}
        isOwner={isOwner}
        owners={owners}
      >
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
                orgName={currentOrgName}
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
    </WorkspaceLayout>
  );
};

export default ListActivityPage;
