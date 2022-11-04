import Link from "next/link";

import Button from "components/atoms/Button/button";
import InsightPageCard from "components/molecules/InsightPageCard/insight-page-card";
import InsightPageTable from "components/molecules/InsightPageTable/insight-page-table";
import Title from "components/atoms/Typography/title";

import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "layouts/hub";
import { useUserInsights } from "lib/hooks/useUserInsights";

const InsightsHub: WithPageLayout = () => {
  const { data, isError, isLoading } = useUserInsights();
  const favorites = data.filter(insight => insight.is_favorite).slice(0, 3);

  return (
    <div className="py-2">
      <div className="flex justify-between py-2">
        <Title className="!text-2xl !leading-none !font-medium" level={1}>
            Insights Dashboard
        </Title>
        <Link href={"#"}>
            <Button type="primary">
              Add Insight Page
            </Button>
          </Link>
      </div>

      <div className="flex py-8">
        {
          favorites.map(insight => <InsightPageCard insight={insight} />)
        }
      </div>

      { isLoading ? "Loading..." : isError ? "Error...": <InsightPageTable insights={data} /> }
    </div>
  );
};

InsightsHub.PageLayout = HubLayout;

export default InsightsHub;
