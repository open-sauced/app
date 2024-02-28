import { useRouter } from "next/router";
import clsx from "clsx";

import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import WorkspaceRepositoryInsightRow from "components/molecules/WorkspaceRepositoryInsightRow/workspace-repository-insight-row";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { useWorkspacesRepositoryInsights } from "lib/hooks/api/useWorkspaceRepositoryInsights";
import Title from "components/atoms/Typography/title";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = Number(session?.user.user_metadata.sub);
  const featureFlags = await getAllFeatureFlags(userId);

  return {
    props: {
      featureFlags,
    },
  };
};

const RepositoryInsights = () => {
  const router = useRouter();
  const { user, sessionToken } = useSupabaseAuth();
  const workspaceId = router.query.workspaceId as string;

  const { session } = useSession(true);
  const { data, meta, isError, isLoading, setPage } = useWorkspacesRepositoryInsights({ workspaceId });

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div>
        <nav className="items-center justify-between block py-4 sm:flex ">
          <div className="text-3xl leading-none mx-0">Repository Insights</div>
        </nav>
        <section className="flex flex-col gap-4 pt-4">
          {user ? (
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
                    <Title className="text-2xl">You currently have no repository insights</Title>
                  ) : null}
                </div>
              )}
            </>
          ) : null}
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
  title: "Repository Insights | Open Sauced Insights",
};

export default RepositoryInsights;
