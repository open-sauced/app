import EChartsReact from "echarts-for-react";
import { FaArrowUp, FaEllipsisVertical } from "react-icons/fa6";
import { StatsType } from "lib/hooks/api/useFetchMetricStats";
import Card from "components/atoms/Card/card";
import Button from "components/shared/Button/button";
import humanizeNumber from "lib/utils/humanizeNumber";

type MetricCardProps = {
  stats: StatsType[] | undefined;
  variant: "stars" | "forks";
};

export default function MetricCard({ stats, variant }: MetricCardProps) {
  const seriesData = stats
    ?.map((stat) => (variant === "stars" ? stat.star_count || 0 : stat.forks_count || 0))
    .reverse();
  const bucketData = stats?.map((stat) => new Date(stat.bucket).toDateString()).reverse();

  const option = {
    xAxis: {
      type: "category",
      data: bucketData,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series: [
      {
        data: seriesData,
        symbol: "none",
        type: variant === "stars" ? "line" : "bar",
      },
    ],
    color: "hsla(19, 100%, 50%, 1)",
  };

  const total = seriesData?.reduce((stat, currentValue) => (stat || 0) + (currentValue || 0), 0);

  return (
    <Card className="w-full max-w-sm h-fit p-5 pl-6">
      <section className="flex justify-between items-center">
        <p className="text-xl font-semibold capitalize">{variant} per day</p>
        <Button variant="default" className="!p-1 rounded-full">
          <FaEllipsisVertical />
        </Button>
      </section>

      <section className="flex justify-between items-center px-2 gap-8">
        <p className="text-5xl font-bold">{humanizeNumber(total || 0, "abbreviation")}</p>
        <div className="h-fit w-full pl-6">
          <EChartsReact option={option} style={{ height: "100%", width: "100%" }} />
        </div>
      </section>

      <section className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2 py-0.5 border-green-300 border-2 rounded-full bg-green-200">
          <FaArrowUp className="text-green-800" />
          <p className="text-green-800">10%</p>
        </div>
        <p>vs. last period</p>
      </section>
    </Card>
  );
}
