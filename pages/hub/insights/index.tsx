import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import Button from "components/atoms/Button/button";
import InsightRow from "components/molecules/InsightRow/insight-row";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import useUserInsights from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { supabase } from "lib/utils/supabase";
import useSession from "lib/hooks/useSession";
import Text from "components/atoms/Typography/text";

const InsightsHub: WithPageLayout = () => {
  const { data: insightsData, meta: insightsMeta, isError, isLoading, page, setPage } = useUserInsights();
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await supabase.auth.getSession();

        if (!currentUser?.data?.session || onboarded === false) {
          await router.push("/javascript/dashboard/filter/recent");
        }
      } catch (e: unknown) {
        router.push("/javascript/dashboard/filter/recent");
      }
    }

    getUser()
      .catch(console.error)
      .then(() => {});
  }, [router, onboarded]);

  return user && onboarded ? (
    <div className="container flex flex-col w-full gap-4 py-2">
      <div className="justify-between block py-2 sm:flex ">
        <div>
          <Title className="!text-2xl !leading-none !font-medium  mb-4" level={1}>
            Insights
          </Title>
          <Text className="my-8">
            Welcome to your Insights Hub! Here, you can set up pages to view all of your insights or other open source
            insights in one place.
          </Text>
        </div>
        <div className="flex items-center gap-3 mt-4">
          {/* Search box temporarily hidden */}
          <div className="hidden w-58">
            <Search placeholder="Search repositories" className="max-w-full" name={"query"} />
          </div>
          <Link href={"/hub/insights/new"}>
            <Button variant="primary">Add Insight Page</Button>
          </Link>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        {isLoading
          ? "Loading..."
          : isError
            ? "Error..."
            : insightsData.map((insight, index) => {
              return <InsightRow key={`insights_${insight.id}`} user={user} insight={insight} />;
            })}
      </section>

      <Link
        passHref
        href={"/hub/insights/new"}
        className="w-full py-5 text-lg text-center border rounded-lg bg-light-slate-4 text-light-slate-11 md:py-8 lg:py-10 border-light-slate-7"
      >
        Create a new Insight Page
      </Link>

      <div
        className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
          hidden: insightsMeta.itemCount <= insightsMeta.limit
        })}
      >
        <PaginationResults metaInfo={insightsMeta} total={insightsMeta.itemCount} entity={"insights"} />
        <Pagination
          pages={[]}
          hasNextPage={insightsMeta.hasNextPage}
          hasPreviousPage={insightsMeta.hasPreviousPage}
          totalPage={insightsMeta.pageCount}
          page={insightsMeta.page}
          onPageChange={function (page: number): void {
            setPage(page);
          }}
          divisor={true}
          goToPage
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

InsightsHub.PageLayout = HubLayout;
InsightsHub.SEO = {
  title: "Insights Hub | Open Sauced Insights"
};

export default InsightsHub;
