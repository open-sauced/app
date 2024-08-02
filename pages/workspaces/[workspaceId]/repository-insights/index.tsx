import { useRouter } from "next/router";
import clsx from "clsx";

import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import WorkspaceRepositoryInsightRow from "components/Workspaces/WorkspaceRepositoryInsightRow/workspace-repository-insight-row";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { useWorkspacesRepositoryInsights } from "lib/hooks/api/useWorkspaceRepositoryInsights";
import Title from "components/atoms/Typography/title";
import Button from "components/shared/Button/button";

const RepositoryInsights = () => {
  const router = useRouter();
  const { user, sessionToken } = useSupabaseAuth();
  const workspaceId = router.query.workspaceId as string;

  const { session } = useSession(true);
  const { data, meta, isError, isLoading, setPage } = useWorkspacesRepositoryInsights({ workspaceId });

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="px-4 py-8 lg:px-16 lg:py-12">
        <nav className="justify-between py-4 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="text-3xl leading-none mx-0">Repository Insights</div>
          <Button href={`/workspaces/${workspaceId}/repository-insights/new`} variant="primary" className="w-fit">
            Create Insight
          </Button>
        </nav>
        <section className="flex flex-col gap-4 pt-4">
          <>
            {session && isLoading ? (
              <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} />
            ) : isError ? (
              "Error..."
            ) : data && data.length > 0 ? (
              data.map((insight) => {
                return (
                  <WorkspaceRepositoryInsightRow
                    key={`insights_${insight.id}`}
                    user={user}
                    workspaceInsight={insight}
                    workspaceId={workspaceId}
                  />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center w-full gap-4 ">
                {!isLoading && sessionToken ? (
                  <>
                    <Title className="text-2xl">You currently have no repository insights</Title>
                    <Button variant="primary" href={`/workspaces/${workspaceId}/repository-insights/new`}>
                      Create a new repository insight
                    </Button>
                  </>
                ) : null}
              </div>
            )}
          </>
        </section>

        <div
          className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
            hidden: meta.itemCount <= meta.limit,
          })}
        >
          <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"insights"} />
          <Pagination
            pages={[]}
            hasNextPage={meta.hasNextPage}
            hasPreviousPage={meta.hasPreviousPage}
            totalPage={meta.pageCount}
            page={meta.page}
            onPageChange={function (page: number): void {
              setPage(page);
            }}
            divisor={true}
            goToPage
          />
        </div>
      </div>
    </WorkspaceLayout>
  );
};

RepositoryInsights.SEO = {
  title: "Repository Insights | OpenSauced Insights",
};

export default RepositoryInsights;
