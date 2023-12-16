import { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import InsightRow from "components/molecules/InsightRow/insight-row";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import useUserInsights from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useStore from "lib/store";
import useSession from "lib/hooks/useSession";
import { useToast } from "lib/hooks/useToast";
import Text from "components/atoms/Typography/text";

const InsightsHub: WithPageLayout = () => {
  const router = useRouter();
  const { user } = useSupabaseAuth();
  const store = useStore();
  const dismissFeaturedInsights = useStore((store) => store.dismissFeaturedInsights);
  const { toast } = useToast();
  const { session } = useSession(true);
  const { data, meta, isError, isLoading, setPage } = useUserInsights();

  function handleView() {
    const insight = data.slice(0, 1).shift();
    router.push(`/pages/${user?.user_metadata.user_name}/${insight!.id}/dashboard`);
  }

  function openInsightToast() {
    const toaster = toast({
      description: "Welcome to your Insights Hub!",
      variant: "success",
      action: (
        <div className="flex flex-col">
          <div className="flex align-middle">
            <Text>
              We&apos;ve included a featured Insight Page for you to test out. You can also create your own to get
              insights on repositories.
            </Text>
          </div>
          <div className="flex flex-start">
            <button
              onClick={() => {
                toaster && toaster.dismiss();
              }}
            >
              <Text className="pr-2 cursor-pointer">Dismiss</Text>
            </button>
            <button
              onClick={() => {
                toaster && toaster.dismiss();
                handleView();
              }}
            >
              <Text className="text-orange-500 cursor-pointer">Open Insight Page</Text>
            </button>
          </div>
        </div>
      ),
    });

    store.setDismissFeaturedInsights();
  }

  useEffect(() => {
    if (session && session.insights_count === 0 && !dismissFeaturedInsights) {
      openInsightToast();
    }
  }, [session, user]);

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
          currentPage={meta.page}
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
