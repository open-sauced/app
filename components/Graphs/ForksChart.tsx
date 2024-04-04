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
import { BiGitRepoForked } from "react-icons/bi";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

import { useState } from "react";
import Button from "components/shared/Button/button";
import Card from "components/atoms/Card/card";
import { getCumulativeForksHistogramToDays, getDailyForksHistogramToDays } from "lib/utils/repo-page-utils";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";

type ForksChartProps = {
  stats: StatsType[] | undefined;
  total: number;
  syncId: string;
  range: number;
};

export default function ForksChart({ stats, total, syncId, range = 30 }: ForksChartProps) {
  const [category, setCategory] = useState<"daily" | "cumulative">("daily");
  const dailyData = getDailyForksHistogramToDays({ stats, range });
  const cumulativeData = getCumulativeForksHistogramToDays({ stats, total, range });

  return (
    <Card className="flex flex-col gap-8 w-full lg:min-w-[64rem] h-full items-center pt-8 px-8">
      <section className="flex w-full items-center justify-between">
        <h3 className="font-semibold text-xl text-slate-800 w-full">
          Forks <span className="pl-2 text-slate-500 text-sm font-medium"> {range} days</span>
        </h3>
        <div className="flex gap-4 items-center">
          <Button variant={category === "daily" ? "outline" : "default"} onClick={() => setCategory("daily")}>
            Daily
          </Button>
          <Button variant={category === "cumulative" ? "outline" : "default"} onClick={() => setCategory("cumulative")}>
            Cumulative
          </Button>
        </div>
      </section>
      <ResponsiveContainer width="100%" height={300}>
        {category === "daily" ? (
          <BarChart data={dailyData} syncId={syncId}>
            <XAxis dataKey="bucket" tick={false} />
            <YAxis interval={1} />
            <Tooltip content={CustomTooltip} filterNull={false} />
            <Bar dataKey="forks_count" fill="#FF5100" />
          </BarChart>
        ) : (
          <LineChart data={cumulativeData} syncId={syncId}>
            <XAxis dataKey="bucket" tick={false} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip content={CustomTooltip} filterNull={false} />
            <Line dataKey="forks_count" stroke="#FF5100" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    return (
      <figcaption className="flex flex-col gap-1 bg-white px-4 py-2 rounded-lg border">
        <section className="flex gap-2 items-center">
          <BiGitRepoForked className="fill-sauced-orange" />
          <p>Forks: {payload[0]?.value}</p>
        </section>

        <p className="text-light-slate-9 text-sm">{payload[0]?.payload.bucket}</p>
      </figcaption>
    );
  }
}
