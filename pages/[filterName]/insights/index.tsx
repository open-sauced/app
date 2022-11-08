import Link from "next/link";

import Button from "components/atoms/Button/button";
import InsightPageCard from "components/molecules/InsightPageCard/insight-page-card";
import InsightPageTable from "components/molecules/InsightPageTable/insight-page-table";
import Title from "components/atoms/Typography/title";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import { useUserInsights } from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const InsightsHub: WithPageLayout = () => {
  const { user } = useSupabaseAuth();

  const { data: insightsData, isError, isLoading } = useUserInsights();
  const favorites = insightsData.filter(insight => insight.is_favorite).slice(0, 3);

  return (
    <div className="flex flex-col w-full gap-4 py-2">
      <div className="flex justify-between py-2">
        <Title className="!text-2xl !leading-none !font-medium" level={1}>
            Insights Dashboard
        </Title>
        <Link href={`/${user?.user_metadata.user_name}/insights/new`}>
          <Button type="primary">
            Add Insight Page
          </Button>
        </Link>
      </div>

      <div className="flex justify-center py-8">
        <section className="flex flex-wrap gap-4 justify-center lg:flex-row max-w-full">
          {
            favorites.map(insight => <InsightPageCard key={`insight_${insight.id}`} insight={insight} user={user}/>)
          }
        </section>
      </div>

      { isLoading ? "Loading..." : isError ? "Error...": <InsightPageTable insights={insightsData} /> }
    </div>
  );
};

InsightsHub.PageLayout = HubLayout;

export default InsightsHub;
