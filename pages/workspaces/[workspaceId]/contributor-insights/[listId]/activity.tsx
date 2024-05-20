import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { useIsWorkspaceUpgraded } from "lib/hooks/api/useIsWorkspaceUpgraded";
import WorkspaceBanner from "components/Workspaces/WorkspaceBanner";
import { OptionKeys } from "components/atoms/Select/multi-select";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

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
  workspaceId: string;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const { listId, range: rawRange, limit: rawLimit, workspaceId } = ctx.params as FilterParams;

  const range = rawRange ? Number(rawRange) : 30;
  const limit = rawLimit ? Number(rawLimit) : 20;
  const [{ data, error: contributorListError }, { data: list, error }, { data: workspaceMembers }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `workspaces/${workspaceId}/userLists/${listId}/contributors?limit=1`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({
      path: `workspaces/${workspaceId}/userLists/${listId}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<{ data?: WorkspaceMember[] }>({
      path: `workspaces/${workspaceId}/members`,
      bearerToken,
      pathValidator: () => true,
    }),
  ]);

  if (error?.status === 404 || error?.status === 401) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);
  const featureFlags = await getAllFeatureFlags(userId);

  const owners = Array.from(workspaceMembers?.data || [], (member: { role: string; member: Record<string, any> }) => {
    if (member.role === "owner") {
      return member.member.login;
    }
  }).filter(Boolean);

  const isOwner = !!(workspaceMembers?.data || []).find(
    (member) => member.role === "owner" && member.user_id === userId
  );

  return {
    props: {
      list,
      workspaceId,
      numberOfContributors: data?.meta.itemCount,
      isError: error || contributorListError,
      isOwner,
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
    data: projectData = [],
    error: projectDataError,
    isLoading: isTreemapLoading,
  } = useContributionsByProject({
    listId: list!.id,
    range: Number(range ?? "30"),
  });
  const [filteredRepositories, setFilteredRepositories] = useState<OptionKeys[]>(
    projectData.map((pd) => ({ label: pd.repo_name, value: pd.repo_name }))
  );
  const filteredRepos = filteredRepositories.map(({ label }) => label);
  const filterOptions = projectData.map(({ repo_name }) => {
    return { label: repo_name, value: repo_name };
  });
  const {
    data: contributorStats,
    isLoading,
    isError: isMostActiveError,
    setContributorType,
    contributorType,
  } = useMostActiveContributors({ listId: list!.id, repos: filteredRepos });
  const [currentOrgName, setCurrentOrgName] = useState<string | null>(null);
  const {
    setRepoName,
    error,
    data: projectContributionsByUser,
    repoName,
    isLoading: isLoadingProjectContributionsByUser,
  } = useContributorsByProject(list!.id, Number(range ?? "30"), filteredRepos);
  const [projectId, setProjectId] = useState<string | null>(null);

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
  const filteredProjectData = filteredRepos.length
    ? projectData.filter(({ repo_name }) => {
        return filteredRepos.includes(repo_name);
      })
    : projectData;

  const treemapData = getTreemapData({
    currentOrgName,
    repoName,
    projectData: filteredProjectData,
    projectContributionsByUser,
  });

  const {
    data: evolutionData,
    isError: evolutionError,
    isLoading: isLoadingEvolution,
  } = useContributionsEvolutionByType({ listId: list!.id, range: Number(range ?? "30"), repos: filteredRepos });
  const treemapRef = useRef<HTMLSpanElement>(null);
  const mostActiveRef = useRef<HTMLSpanElement>(null);
  const graphResizerLookup = new Map();
  const { data: isWorkspaceUpgraded } = useIsWorkspaceUpgraded({ workspaceId });
  const showBanner = isOwner && !isWorkspaceUpgraded;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

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

  useEffect(() => {
    setFilteredRepositories(projectData.map(({ repo_name }) => ({ label: repo_name, value: repo_name })));
  }, [projectData]);

  return (
    <WorkspaceLayout
      workspaceId={workspaceId}
      banner={
        showBanner ? (
          <WorkspaceBanner workspaceId={workspaceId} openModal={() => setIsInsightUpgradeModalOpen(true)} />
        ) : null
      }
    >
      <ListPageLayout
        list={list}
        workspaceId={workspaceId}
        numberOfContributors={numberOfContributors}
        isOwner={isOwner}
        owners={owners}
        repoFilter={true}
        repoFilterOptions={filterOptions}
        repoFilterSelect={setFilteredRepositories}
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
      <InsightUpgradeModal
        workspaceId={workspaceId}
        variant="contributors"
        isOpen={isInsightUpgradeModalOpen}
        onClose={() => setIsInsightUpgradeModalOpen(false)}
        overLimit={numberOfContributors}
      />
    </WorkspaceLayout>
  );
};

export default ListActivityPage;
