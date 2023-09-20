import Link from "next/link";
import clsx from "clsx";

import InsightRow from "components/molecules/InsightRow/insight-row";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import useUserInsights from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const InsightsHub: WithPageLayout = () => {
  const { user } = useSupabaseAuth();

  const { data, meta, isError, isLoading, setPage } = useUserInsights();

  return (
    <>
      <section className="flex flex-col gap-4">
        {isLoading ? (
          <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} />
        ) : isError ? (
          "Error..."
        ) : (
          data.map((insight) => {
            return <InsightRow key={`insights_${insight.id}`} user={user} insight={insight} />;
          })
        )}
        <Link
          href={"/hub/insights/new"}
          className="w-full py-5 text-lg text-center border rounded-lg bg-light-slate-4 text-light-slate-11 md:py-8 lg:py-10 border-light-slate-7"
        >
          Create a new Insights Page
        </Link>
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
    </>
  );
};

InsightsHub.PageLayout = HubLayout;
InsightsHub.isPrivateRoute = true;
InsightsHub.SEO = {
  title: "Insights Hub | Open Sauced Insights",
};

export default InsightsHub;
