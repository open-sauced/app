import Link from "next/link";

import Button from "components/atoms/Button/button";
import InsightRow from "components/molecules/InsightRow/insight-row";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import { useUserInsights } from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const InsightsHub: WithPageLayout = () => {
  const { data: insightsData, isError, isLoading } = useUserInsights();
  const { user } = useSupabaseAuth();
  return (
    <div className="flex  flex-col w-full gap-4 py-2">
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
            <Button type="primary">Add Insight Page</Button>
          </Link>
        </div>
      </div>

      {isLoading
        ? "Loading..."
        : isError
          ? "Error..."
          : insightsData.map((insight, index) => (
            <InsightRow key={`insights_${insight.id}`} user={user} insight={insight} />
          ))}

      <Link passHref href={"/hub/insights/new"}>
        <a className="w-full bg-light-slate-4 text-lg text-light-slate-11 py-5 md:py-8 lg:py-10 rounded-lg text-center border border-light-slate-7">
          Create a new Insight Page
        </a>
      </Link>
    </div>
  );
};

InsightsHub.PageLayout = HubLayout;

export default InsightsHub;
