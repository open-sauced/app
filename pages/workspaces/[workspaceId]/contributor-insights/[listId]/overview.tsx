import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import ListPageLayout from "layouts/lists";

import Error from "components/atoms/Error/Error";
import useListStats from "lib/hooks/useListStats";
import HighlightCard from "components/molecules/HighlightCard/highlight-card";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { useContributorsList } from "lib/hooks/api/useContributorList";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { useIsWorkspaceUpgraded } from "lib/hooks/api/useIsWorkspaceUpgraded";
import WorkspaceBanner from "components/Workspaces/WorkspaceBanner";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import ContributorsTable from "components/Tables/ContributorsTable";
import { setQueryParams } from "lib/utils/query-params";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

interface ListsOverviewProps {
  list: DBList;
  numberOfContributors: number;
  isOwner: boolean;
  isError: boolean;
  workspaceId: string;
  owners: string[];
  username: string;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId, workspaceId = null } = ctx.params as { listId: string; workspaceId?: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }, { data: workspaceData, error: workspaceError }] =
    await Promise.all([
      fetchApiData<PagedData<DbContributorInsightUser>>({
        path: `workspaces/${workspaceId}/userLists/${listId}/contributors?limit=${limit}`,
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

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);
  const username = session?.user.user_metadata.user_name ?? null;

  const owners: string[] = Array.from(
    workspaceData?.data || [],
    (member: { role: string; member: Record<string, any> }) => {
      if (member.role === "owner") {
        return member.member.login;
      }
    }
  ).filter(Boolean);

  const isOwner = !!(workspaceData?.data || []).find((member) => member.role === "owner" && member.user_id === userId);

  return {
    props: {
      list,
      numberOfContributors: data?.meta.itemCount || 0,
      isOwner,
      isError: error || contributorListError,
      workspaceId,
      owners,
      username,
    },
  };
};

const ListsOverview = ({
  list,
  numberOfContributors,
  isOwner,
  isError,
  workspaceId,
  owners,
  username,
}: ListsOverviewProps): JSX.Element => {
  const { userId } = useSupabaseAuth();
  const loggedIn = Boolean(userId);
  const router = useRouter();
  const { listId, range, limit } = router.query;
  const orderDirection = router.query.orderDirection as OrderDirection;
  const orderBy = router.query.orderBy as string;

  type OrderDirection = "ASC" | "DESC";

  const setOscrSortDirection = (direction: OrderDirection) => {
    setQueryParams({ orderDirection: direction, orderBy: "oscr" });
  };

  const {
    isLoading,
    setPage,
    data: { data: contributors, meta },
  } = useContributorsList({
    workspaceId,
    listId: list?.id,
    defaultRange: range ? (range as string) : "30",
    defaultLimit: limit ? (limit as unknown as number) : 10,
    showOscr: loggedIn,
    username,
    orderBy,
    orderDirection,
  });

  const {
    data: prevAllContributorStats,
    meta: prevAllContributorMeta,
    isLoading: prevAllContributorStatsLoading,
  } = useListStats(listId as string, "all", 30);
  const {
    data: allContributorStats,
    meta: allContributorMeta,
    isLoading: allContributorStatsLoading,
  } = useListStats(listId as string, "all");

  const { meta: prevNewContributorMeta, isLoading: prevNewContributorStatsLoading } = useListStats(
    listId as string,
    "new",
    30
  );
  const { meta: newContributorMeta, isLoading: newContributorStatsLoading } = useListStats(listId as string, "new");

  const { meta: prevAlumniContributorMeta, isLoading: prevAlumniContributorStatsLoading } = useListStats(
    listId as string,
    "alumni",
    30
  );
  const { meta: alumniContributorMeta, isLoading: alumniContributorStatsLoading } = useListStats(
    listId as string,
    "alumni"
  );

  const allContributorCommits = allContributorStats?.reduce((acc, curr) => acc + curr.commits, 0) || 0;
  const prevAllContributorCommits = prevAllContributorStats?.reduce((acc, curr) => acc + curr.commits, 0) || 0;

  const { data: isWorkspaceUpgraded } = useIsWorkspaceUpgraded({ workspaceId });
  const showBanner = isOwner && !isWorkspaceUpgraded;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

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
        showRangeFilter={false}
        owners={owners}
        overLimit={showBanner}
      >
        <div className="flex flex-col w-full gap-4 px-4 py-8 lg:px-16 lg:py-12">
          <ClientOnly>
            <section className="flex flex-wrap items-center max-w-full gap-4 lg:flex-row lg:flex-nowrap">
              <HighlightCard
                label="Commits"
                icon="commits"
                metricIncreases={allContributorCommits > prevAllContributorCommits}
                increased={allContributorCommits > prevAllContributorCommits}
                value={allContributorCommits}
                valueLabel="in the last 30d"
                tooltip=""
              />
              <HighlightCard
                label="Active Contributors"
                icon="active-contributors"
                metricIncreases={allContributorMeta.itemCount > prevAllContributorMeta.itemCount}
                increased={allContributorMeta.itemCount > prevAllContributorMeta.itemCount}
                numChanged={allContributorMeta.itemCount - prevAllContributorMeta.itemCount}
                value={allContributorMeta.itemCount}
                isLoading={prevAllContributorStatsLoading || allContributorStatsLoading}
                tooltip={`A contributor who has been active in the last ${range ?? 30} days`}
              />
              <HighlightCard
                label="New Contributors"
                icon="new-contributors"
                metricIncreases={newContributorMeta.itemCount > prevNewContributorMeta.itemCount}
                increased={newContributorMeta.itemCount > prevNewContributorMeta.itemCount}
                numChanged={newContributorMeta.itemCount - prevNewContributorMeta.itemCount}
                value={newContributorMeta.itemCount}
                isLoading={prevNewContributorStatsLoading || newContributorStatsLoading}
                tooltip="A contributor who has recently made their first contribution to a project."
              />
              <HighlightCard
                label="Alumni Contributors"
                icon="alumni-contributors"
                metricIncreases={alumniContributorMeta.itemCount > prevAlumniContributorMeta.itemCount}
                increased={alumniContributorMeta.itemCount > prevAlumniContributorMeta.itemCount}
                numChanged={alumniContributorMeta.itemCount - prevAlumniContributorMeta.itemCount}
                value={alumniContributorMeta.itemCount}
                isLoading={prevAlumniContributorStatsLoading || alumniContributorStatsLoading}
                tooltip={`A contributor who has not been active on a project in the last ${range ?? 30} days.`}
              />
            </section>
            <section className="flex flex-col max-w-full gap-4 mb-6 lg:flex-row">
              <div className="flex flex-col w-full">
                {isError ? (
                  <Error errorMessage="Unable to load list of contributors" />
                ) : (
                  <ErrorBoundary
                    fallback={<div className="grid place-content-center">Error loading the list of contributors</div>}
                  >
                    <ContributorsTable
                      contributors={contributors}
                      meta={meta}
                      isLoading={isLoading}
                      isError={isError}
                      oscrSorting={orderDirection}
                      setOscrSorting={setOscrSortDirection}
                    />
                  </ErrorBoundary>
                )}
              </div>
            </section>
          </ClientOnly>
        </div>
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

export default ListsOverview;
