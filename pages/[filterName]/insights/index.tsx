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
          router.push("/");
        }
      } catch (e: unknown) {
        router.push("/");
      }
    }

    getUser();
  }, [router, onboarded]);

  return user && onboarded ? (
    <div className="flex  flex-col w-full gap-4 py-2 container">
      <div className="flex justify-between py-2">
        <Title className="!text-2xl !leading-none !font-medium" level={1}>
          Your Pages
        </Title>
        <div className="flex gap-3 items-center">
          {/* Search box temporarily hidden */}
          <div className="w-58 hidden">
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
        className="w-full bg-light-slate-4 text-lg text-light-slate-11 py-5 md:py-8 lg:py-10 rounded-lg text-center border border-light-slate-7"
      >
        Create a new Insight Page
      </Link>

      <div className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
        "hidden": insightsMeta.itemCount <= insightsMeta.limit
      })}>
        <PaginationResults
          from={page === 1 ? (insightsMeta.itemCount > 0 ? page : 0) : (page - 1) * insightsMeta.limit + 1}
          to={page * insightsMeta.limit <= insightsMeta.itemCount ? page * insightsMeta.limit : insightsMeta.itemCount}
          total={insightsMeta.itemCount}
          entity={"insights"}
        />
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
