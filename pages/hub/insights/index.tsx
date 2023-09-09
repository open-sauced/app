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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import ListCard from "components/molecules/ListCard/list-card";

type TabKey = "insights" | "lists";

const tabs: Record<TabKey, string> = {
  insights: "Insights",
  lists: "Lists",
};

const InsightsHub: WithPageLayout = () => {
  const { data: insightsData, meta: insightsMeta, isError, isLoading, page, setPage } = useUserInsights();
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { onboarded } = useSession();

  const onTabChange = (value: string) => {
    const tabValue = value as TabKey;
    router.push(`/hub/${tabValue}`);
  };
  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await supabase.auth.getSession();

        if (!currentUser?.data?.session || onboarded === false) {
          await router.push("/feed");
        }
      } catch (e: unknown) {
        router.push("/feed");
      }
    }

    getUser()
      .catch(console.error)
      .then(() => {});
  }, [router, onboarded]);

  useEffect(() => {
    if (router.pathname === "/hub") {
      router.push("/hub/insights");
    }
  }, [router]);

  return user && onboarded ? (
    <Tabs value={router.pathname.split("/")[2] as TabKey} onValueChange={onTabChange}>
      <div className="container flex flex-col w-full gap-4 py-2">
        <Title className="-mb-6 text-base text-sauced-orange">Your pages</Title>
        <div className="justify-between block py-2 sm:flex ">
          <TabsList className="gap-3">
            {(Object.keys(tabs) as TabKey[]).map((tab) => (
              <TabsTrigger
                asChild
                key={tab}
                className="!px-0 !justify-start data-[state=active]:text-black text-gray-300/80 cursor-pointer"
                value={tab}
              >
                <Title className={clsx("!text-3xl !leading-none !font-medium mx-0")} level={1}>
                  {tabs[tab]}
                </Title>
              </TabsTrigger>
            ))}
          </TabsList>
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

        <TabsContent value={"insights" satisfies TabKey}>
          <section className="flex flex-col gap-4">
            {isLoading
              ? "Loading..."
              : isError
              ? "Error..."
              : insightsData.map((insight) => {
                  return <InsightRow key={`insights_${insight.id}`} user={user} insight={insight} />;
                })}
          </section>
        </TabsContent>
        <TabsContent value={"lists" satisfies TabKey}>
          <section className="flex flex-col gap-4">
            <ListCard
              list={{
                id: "1",
                user: { login: "bdougie", id: 1, name: "crap" },
                name: "my ne list",
                created_at: " ",
                updated_at: "",
                is_public: true,
              }}
            />
          </section>
        </TabsContent>

        <Link
          passHref
          href={"/hub/insights/new"}
          className="w-full py-5 text-lg text-center border rounded-lg bg-light-slate-4 text-light-slate-11 md:py-8 lg:py-10 border-light-slate-7"
        >
          Create a new Insight Page
        </Link>

        <div
          className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
            hidden: insightsMeta.itemCount <= insightsMeta.limit,
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
    </Tabs>
  ) : (
    <></>
  );
};

InsightsHub.PageLayout = HubLayout;
InsightsHub.isPrivateRoute = true;
InsightsHub.SEO = {
  title: "Insights Hub | Open Sauced Insights",
};

export default InsightsHub;
