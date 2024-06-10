import { useMemo } from "react";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, type TooltipProps, CartesianGrid } from "recharts";
import { FaUserAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { getTicks, getDailyContributorHistogramToDays } from "lib/utils/repo-page-utils";
import { type DayRange } from "components/shared/DayRangePicker";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import humanizeNumber from "lib/utils/humanizeNumber";

type ContributorsChartProps = {
  stats: StatsType[] | undefined;
  rangedTotal: number;
  syncId: number;
  range: DayRange;
  isLoading: boolean;
  className?: string;
};

export default function ContributorsChart({
  stats,
  rangedTotal,
  syncId,
  range = 30,
  isLoading,
  className,
}: ContributorsChartProps) {
  const dailyData = useMemo(() => getDailyContributorHistogramToDays({ stats, range }), [stats, range]);
  const bucketTicks = useMemo(() => getTicks({ histogram: dailyData, range }), [dailyData, range]);
  const rangedAverage = useMemo(() => (rangedTotal / range).toPrecision(2), [rangedTotal, range]);

  return (
    <Card className={`${className ?? ""} flex flex-col gap-8 w-full h-full items-center !px-6 !py-8`}>
      <section className="flex flex-col lg:flex-row w-full items-start lg:items-start gap-4 lg:justify-between px-2">
        {isLoading ? (
          <SkeletonWrapper width={100} height={24} />
        ) : (
          <>
            <div className="flex gap-2 items-center w-fit">
              <FaUsers className="text-xl" />
              <div className="flex gap-1 items-center">
                <h3 className="text-sm font-semibold md:text-lg text-slate-800">Contributors</h3>
                <p className="text-sm md:text-base w-fit pl-2 text-slate-500 font-medium">{range} days</p>
              </div>
            </div>
            <aside className="flex gap-8">
              <div>
                <h3 className="text-xs lg:text-sm text-slate-500">Total {range} days</h3>
                <p className="font-semibold text-xl lg:text-3xl">{rangedTotal}</p>
              </div>
              <div>
                <h3 className="text-xs lg:text-sm text-slate-500">Average per day</h3>
                <p className="font-semibold text-xl lg:text-3xl">{humanizeNumber(rangedAverage)}</p>
              </div>
            </aside>
          </>
        )}
      </section>
      <ResponsiveContainer width="100%" height={180}>
        {isLoading ? (
          <SkeletonWrapper width={100} height={100} />
        ) : (
          <BarChart data={dailyData} syncId={syncId} className="!-left-6">
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
            <Bar dataKey="contributor_count" fill="#2563eb" />
          </BarChart>
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
          <FaUserAlt className="fill-[#2563eb]" />
          <p>Contributors: {payload[0]?.value}</p>
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
