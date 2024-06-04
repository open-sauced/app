import { useMemo, useState } from "react";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

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
  CartesianGrid,
} from "recharts";
import { FaStar } from "react-icons/fa6";
import { getHistoryStarsHistogramToDays, getDailyStarsHistogramToDays, getTicks } from "lib/utils/repo-page-utils";
import { type DayRange } from "components/shared/DayRangePicker";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";
import Card from "components/atoms/Card/card";
import Button from "components/shared/Button/button";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import humanizeNumber from "lib/utils/humanizeNumber";

type StarsChartProps = {
  stats: StatsType[] | undefined;
  total: number;
  syncId: number;
  range: DayRange;
  isLoading: boolean;
  className?: string;
};

export default function StarsChart({ stats, total, syncId, range = 30, isLoading, className }: StarsChartProps) {
  const [category, setCategory] = useState<"daily" | "history">("daily");
  const dailyData = useMemo(() => getDailyStarsHistogramToDays({ stats, range }), [stats, range]);
  const historyData = useMemo(() => getHistoryStarsHistogramToDays({ stats, total, range }), [stats, total, range]);
  const bucketTicks = useMemo(() => getTicks({ histogram: dailyData, range }), [dailyData, range]);
  const starsRangedTotal = useMemo(() => stats?.reduce((prev, curr) => prev + curr.star_count!, 0) ?? 0, [stats]);
  const averageOverRange = useMemo(() => Math.round(starsRangedTotal / range), [starsRangedTotal, range]);

  const renderChart = () => {
    switch (category) {
      case "daily":
        return (
          <BarChart data={dailyData} syncId={syncId} className="-left-5">
            <XAxis dataKey="bucket" ticks={bucketTicks} tick={CustomTick} />
            <YAxis
              interval={1}
              domain={["auto", "auto"]}
              fontSize={14}
              tick={{ fill: "#94a3b8" }}
              axisLine={{ stroke: "#94a3b8" }}
              tickLine={{ stroke: "#94a3b8" }}
            />
            <Tooltip content={CustomTooltip} filterNull={false} />
            <CartesianGrid vertical={false} strokeDasharray="4" stroke="#E2E8F0" />
            <Bar dataKey="star_count" fill="#FF5100" />
          </BarChart>
        );
      case "history":
        return (
          <LineChart data={historyData} syncId={syncId} className="-left-5">
            <XAxis dataKey="bucket" ticks={bucketTicks} tick={CustomTick} />
            <YAxis
              domain={["auto", "auto"]}
              fontSize={14}
              tick={{ fill: "#94a3b8" }}
              axisLine={{ stroke: "#94a3b8" }}
              tickLine={{ stroke: "#94a3b8" }}
            />
            <Tooltip content={CustomTooltip} filterNull={false} />
            <CartesianGrid vertical={false} strokeDasharray="4" stroke="#E2E8F0" />
            <Line dataKey="star_count" stroke="#FF5100" />
          </LineChart>
        );
    }
  };

  return (
    <Card className={`${className ?? ""} flex flex-col gap-8 w-full h-full items-center !px-6 !py-8`}>
      <section className="flex flex-col xl:flex-row w-full items-start xl:items-center gap-4 xl:justify-between px-2">
        {isLoading ? (
          <SkeletonWrapper width={100} height={24} />
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center w-fit">
                <FaStar className="text-xl" />
                <div className="flex gap-1 items-center">
                  <h3 className="text-sm font-semibold md:text-lg text-slate-800">Stars</h3>
                  <p className="text-sm md:text-base w-fit pl-2 text-slate-500 font-medium">{range} days</p>
                </div>
              </div>
              <aside className="flex gap-8">
                <div>
                  <h3 className="text-xs lg:text-sm text-slate-500">Total</h3>
                  <p className="font-semibold text-lg lg:text-xl">{humanizeNumber(total)}</p>
                </div>
                <div>
                  <h3 className="text-xs lg:text-sm text-slate-500">Over {range} days</h3>
                  <p className="font-semibold text-lg lg:text-xl">{starsRangedTotal}</p>
                </div>
                <div>
                  <h3 className="text-xs lg:text-sm text-slate-500">Avg. per day</h3>
                  <p className="font-semibold text-lg lg:text-xl">{humanizeNumber(averageOverRange)}</p>
                </div>
              </aside>
            </div>
            <div className="flex gap-2 items-center lg:self-start">
              <Button variant={category === "daily" ? "outline" : "default"} onClick={() => setCategory("daily")}>
                Daily
              </Button>
              <Button variant={category === "history" ? "outline" : "default"} onClick={() => setCategory("history")}>
                History
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

function CustomTick({ x, y, payload }: { x: number; y: number; payload: { value: string } }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={20} textAnchor="middle" fill="#94a3b8" fontSize={14}>
        {payload.value}
      </text>
    </g>
  );
}
