import { FaUsers } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useMemo } from "react";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import { humanizeNumber } from "netlify/og-image-utils";

type RossChartProps = {
  stats: RepositoryRoss | undefined;
  isLoading: boolean;
  error: Error | undefined;
  range: number;
  rangedTotal: number;
  className?: string;
};

export default function RossChart({ stats, rangedTotal, isLoading, error, range, className }: RossChartProps) {
  const rangedAverage = useMemo(() => (rangedTotal / range).toPrecision(2), [rangedTotal, range]);

  const weeklyData = useMemo(() => {
    const result: { bucket: string; new: number; returning: number; internal: number }[] = [];
    stats?.contributors.map((week) => {
      result.push({
        ...week,
        bucket: new Date(week.bucket).toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
      });
    });

    return result;
  }, [stats]);

  const bucketTicks = useMemo(() => {
    const result: string[] = [];
    stats?.contributors.map((week) => {
      result.push(new Date(week.bucket).toLocaleDateString(undefined, { month: "numeric", day: "numeric" }));
    });

    return result;
  }, [stats]);

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
                <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Contributors</h3>
                <p className="text-sm xl:text-base w-fit pl-2 text-slate-500 font-medium">{range} days</p>
              </div>
            </div>
            <aside className="flex gap-8">
              <div>
                <h3 className="text-xs xl:text-sm text-slate-500">Total {range} days</h3>
                <p className="font-semibold text-xl xl:text-3xl">{rangedTotal}</p>
              </div>
              <div>
                <h3 className="text-xs xl:text-sm text-slate-500">Average per day</h3>
                <p className="font-semibold text-xl xl:text-3xl">{humanizeNumber(rangedAverage)}</p>
              </div>
            </aside>
          </>
        )}
      </section>
      <ResponsiveContainer width="100%" height={180}>
        {isLoading ? (
          <SkeletonWrapper width={100} height={100} />
        ) : (
          <BarChart data={weeklyData} className="!-left-6">
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
            <Bar dataKey="internal" stackId="a" fill="#1E3A8A" />
            <Bar dataKey="recurring" stackId="a" fill="#2563EB" />
            <Bar dataKey="new" stackId="a" fill="#60A5FA" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    return (
      <figcaption className="flex flex-col gap-1 text-sm bg-white px-4 py-3 rounded-lg border w-fit">
        <section className="flex gap-2 font-medium text-slate-500 items-center text-xs w-fit">
          <FaUsers className="fill-slate-500" />
          <p>Contributors</p>
          <p>{payload[0]?.payload.bucket}</p>
        </section>
        <section className="flex justify-between">
          <p className="flex gap-2 items-center px-1 text-slate-500">
            <span className={`w-2 h-2 rounded-full bg-[#60A5FA] inline-block`}></span>
            New:
          </p>
          <p className="font-medium pl-2">{payload[2]?.value}</p>
        </section>
        <section className="flex justify-between">
          <p className="flex gap-2 items-center px-1 text-slate-500">
            <span className={`w-2 h-2 rounded-full bg-[#2563EB] inline-block`}></span>
            Recurring:
          </p>
          <p className="font-medium pl-2">{payload[1]?.value}</p>
        </section>
        <section className="flex justify-between">
          <p className="flex gap-2 items-center px-1 text-slate-500">
            <span className={`w-2 h-2 rounded-full bg-[#1E3A8A] inline-block`}></span>
            Internal:
          </p>
          <p className="font-medium pl-2">{payload[0]?.value}</p>
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
