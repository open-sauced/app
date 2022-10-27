import { useUserInsights } from "lib/hooks/useUserInsights";
import InsightPageTable from "components/molecules/InsightPageTable/insight-page-table";

const Insights = (): JSX.Element => {
  const { data, isError, isLoading } = useUserInsights();

  return (
    <>
      { isLoading ? "Loading..." : isError ? "Error...": <InsightPageTable insights={data} /> }
    </>
  );
};

export default Insights;