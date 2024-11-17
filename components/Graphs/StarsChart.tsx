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
  syncId: string;
  range: DayRange;
  isLoading: boolean;
  onCategoryClick?: (category: string) => void;
  className?: string;
};

export default function StarsChart({
  stats,
  total,
  syncId,
  range = 30,
  isLoading,
  onCategoryClick,
  className,
}: StarsChartProps) {
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
      <section className="flex flex-col items-start w-full gap-4 px-2 xl:flex-row xl:items-center xl:justify-between">
        {isLoading ? (
          <SkeletonWrapper width={100} height={24} />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 w-fit">
                <FaStar className="text-xl" />
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Stars</h3>
                  <p className="pl-2 text-sm font-medium xl:text-base w-fit text-slate-500">{range} days</p>
                </div>
              </div>
              <aside className="flex gap-8">
                <div>
                  <h3 className="text-xs xl:text-sm text-slate-500">Total</h3>
                  <p className="text-lg font-semibold lg:text-xl">{humanizeNumber(total)}</p>
                </div>
                <div>
                  <h3 className="text-xs xl:text-sm text-slate-500">Over {range} days</h3>
                  <p className="text-lg font-semibold lg:text-xl">{starsRangedTotal}</p>
                </div>
                <div>
                  <h3 className="text-xs xl:mtext-sm text-slate-500">Avg. per day</h3>
                  <p className="text-lg font-semibold lg:text-xl">{humanizeNumber(averageOverRange)}</p>
                </div>
              </aside>
            </div>
            <div className="flex items-center gap-2 lg:self-start">
              <Button
                variant={category === "daily" ? "outline" : "default"}
                onClick={() => {
                  setCategory("daily");
                  onCategoryClick && onCategoryClick("daily");
                }}
              >
                Daily
              </Button>
              <Button
                variant={category === "history" ? "outline" : "default"}
                onClick={() => {
                  setCategory("history");
                  onCategoryClick && onCategoryClick("history");
                }}
              >
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
      <figcaption className="flex flex-col gap-1 px-4 py-2 bg-white border rounded-lg">
        <section className="flex items-center gap-2">
          <FaStar className="fill-sauced-orange" />
          <p>Stars: {payload[0]?.value}</p>
        </section>

        <p className="text-sm text-light-slate-9">{payload[0]?.payload.bucket}</p>
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
