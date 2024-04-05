import { FaStar } from "react-icons/fa6";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  type TooltipProps,
  Line,
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { useMemo, useState } from "react";
import Card from "components/atoms/Card/card";

import { getCumulativeStarsHistogramToDays, getDailyStarsHistogramToDays } from "lib/utils/repo-page-utils";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";
import Button from "components/shared/Button/button";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

type StarsChartProps = {
  stats: StatsType[] | undefined;
  total: number;
  syncId: string;
  range: number;
  isLoading: boolean;
};

export default function StarsChart({ stats, total, syncId, range = 30, isLoading }: StarsChartProps) {
  const [category, setCategory] = useState<"daily" | "cumulative">("daily");
  const dailyData = useMemo(() => getDailyStarsHistogramToDays({ stats, range }), [stats, range]);
  const cumulativeData = useMemo(() => getCumulativeStarsHistogramToDays({ stats, total, range }), [stats, range]);

  const renderChart = () => {
    switch (category) {
      case "daily":
        return (
          <BarChart data={dailyData} syncId={syncId}>
            <XAxis dataKey="bucket" tick={false} />
            <YAxis interval={1} />
            <Tooltip content={CustomTooltip} filterNull={false} />
            <Bar dataKey="star_count" fill="#FF5100" />
          </BarChart>
        );
      case "cumulative":
        return (
          <LineChart data={cumulativeData} syncId={syncId}>
            <XAxis dataKey="bucket" tick={false} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip content={CustomTooltip} filterNull={false} />
            <Line dataKey="star_count" stroke="#FF5100" />
          </LineChart>
        );
    }
  };

  return (
    <Card className="flex flex-col gap-8 w-full h-full items-center pt-8 px-8">
      <section className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-4 lg:justify-between">
        {isLoading ? (
          <SkeletonWrapper width={100} height={24} />
        ) : (
          <>
            <div className="flex gap-1 items-center w-fit">
              <h3 className="text-sm font-semibold md:text-xl text-slate-800">Stars</h3>
              <p className="text-sm md:text-xl w-fit pl-2 text-slate-500 font-medium">{range} days</p>
            </div>
            <div className="flex gap-4 items-center">
              <Button variant={category === "daily" ? "outline" : "default"} onClick={() => setCategory("daily")}>
                Daily
              </Button>
              <Button
                variant={category === "cumulative" ? "outline" : "default"}
                onClick={() => setCategory("cumulative")}
              >
                Cumulative
              </Button>
            </div>
          </>
        )}
      </section>
      <ResponsiveContainer width="100%" height={300}>
        {isLoading ? <SkeletonWrapper width={100} height={100} /> : renderChart()}
      </ResponsiveContainer>
    </Card>
  );
}

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    return (
      <figcaption className="flex flex-col gap-1 bg-white px-4 py-2 rounded-lg border">
        <section className="flex gap-2 items-center">
          <FaStar className="fill-sauced-orange" />
          <p>Stars: {payload[0]?.value}</p>
        </section>

        <p className="text-light-slate-9 text-sm">{payload[0]?.payload.bucket}</p>
      </figcaption>
    );
  }
}
