import { useMemo } from "react";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipProps,
  Line,
  CartesianGrid,
} from "recharts";
import { BiGitPullRequest } from "react-icons/bi";
import { type DayRange } from "components/shared/DayRangePicker";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";
import { getTicks, getDailyPullRequestsHistogramToDays } from "lib/utils/repo-page-utils";

import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import { humanizeNumber } from "netlify/og-image-utils";

type PRChartProps = {
  stats: StatsType[] | undefined;
  velocity: number;
  syncId: string;
  range: DayRange;
  isLoading: boolean;
  className?: string;
};

export default function PRChart({ stats, velocity, syncId, range = 30, isLoading, className }: PRChartProps) {
  const dailyData = useMemo(() => getDailyPullRequestsHistogramToDays({ stats, range }), [stats, range]);
  const bucketTicks = useMemo(() => getTicks({ histogram: dailyData, range }), [dailyData, range]);
  const { openedRangedTotal, closedRangedTotal } = useMemo(
    () =>
      stats?.reduce(
        (prev, curr) => {
          return {
            openedRangedTotal: prev.openedRangedTotal + curr.active_prs!,
            closedRangedTotal: prev.closedRangedTotal + curr.accepted_prs!,
          };
        },
        { openedRangedTotal: 0, closedRangedTotal: 0 }
      ) ?? { openedRangedTotal: 0, closedRangedTotal: 0 },
    [stats]
  );

  return (
    <Card className={`${className ?? ""} flex flex-col gap-8 w-full h-full items-center !px-6 !py-8`}>
      <section className="flex flex-col items-start w-full gap-4 px-2 lg:flex-row lg:justify-between">
        {isLoading ? (
          <SkeletonWrapper width={100} height={24} />
        ) : (
          <div className="flex flex-col items-start justify-between w-full gap-4 px-2">
            <div className="flex items-center gap-1 w-fit">
              <BiGitPullRequest className="text-xl" />
              <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Pull Requests</h3>
              <p className="pl-2 text-sm font-medium xl:text-lg w-fit text-slate-500">{range} days</p>
            </div>
            <aside className="flex gap-4">
              <div>
                <h3 className="text-xs xl:text-sm !font-medium text-slate-500">
                  Opened
                  <span className={`w-2 h-2 rounded-full bg-[#16a34a] mx-1 inline-block`}></span>
                </h3>
                <p className="text-xl font-semibold xl:text-2xl">{humanizeNumber(openedRangedTotal)}</p>
              </div>
              <div>
                <h3 className="text-xs xl:text-sm !font-medium text-slate-500">
                  Merged
                  <span className={`w-2 h-2 rounded-full bg-[#9333ea] mx-1 inline-block`}></span>
                </h3>
                <p className="text-xl font-semibold xl:text-2xl">{humanizeNumber(closedRangedTotal)}</p>
              </div>
              <div>
                <h3 className="text-xs xl:text-sm !font-medium text-slate-500">Velocity</h3>
                <p className="text-xl font-semibold xl:text-2xl">
                  {humanizeNumber(velocity)}
                  <span className="text-lg xl:text-xl text-slate-500 pl-0.5">d</span>
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
      <ResponsiveContainer width="100%" height={220}>
        {isLoading ? (
          <SkeletonWrapper width={100} height={100} />
        ) : (
          <LineChart data={dailyData} syncId={syncId} className="-left-6">
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
            <Line dataKey="active_prs" stroke="#16a34a" strokeWidth={2} dot={false} />
            <Line dataKey="accepted_prs" stroke="#9333ea" strokeWidth={2} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    return (
      <figcaption className="flex flex-col gap-1 px-4 py-3 text-sm bg-white border rounded-lg w-fit">
        <section className="flex items-center gap-2 text-xs font-medium text-slate-500 w-fit">
          <BiGitPullRequest className="fill-slate-500" />
          <p>Pull Requests</p>
          <p>{payload[0]?.payload.bucket}</p>
        </section>
        <section className="flex justify-between">
          <p className="flex items-center gap-2 px-1 text-slate-500">
            <span className={`w-2 h-2 rounded-full bg-[#16a34a] inline-block`}></span>
            Opened:
          </p>
          <p className="pl-2 font-medium">{payload[0]?.value}</p>
        </section>
        <section className="flex justify-between">
          <p className="flex items-center gap-2 px-1 text-slate-500">
            <span className={`w-2 h-2 rounded-full bg-[#9333ea] inline-block`}></span>
            Merged:
          </p>
          <p className="pl-2 font-medium">{payload[1]?.value}</p>
        </section>
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
