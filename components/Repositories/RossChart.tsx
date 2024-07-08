import { FaUsers } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useMemo, useState } from "react";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import humanizeNumber from "lib/utils/humanizeNumber";

type RossChartProps = {
  stats: RepositoryRoss | undefined;
  isLoading: boolean;
  error: Error | undefined;
  range: number;
  className?: string;
};

export default function RossChart({ stats, isLoading, error, range, className }: RossChartProps) {
  const [filterOutside, setFilterOutside] = useState(true);
  const [filterRecurring, setFilterRecurring] = useState(true);
  const [filterInternal, setFilterInternal] = useState(true);

  const filteredTotal = useMemo(() => {
    return (
      stats?.contributors.reduce((prev, curr) => {
        return (prev +=
          (filterOutside ? curr.new : 0) +
          (filterRecurring ? curr.recurring : 0) +
          (filterInternal ? curr.internal : 0));
      }, 0) || 0
    );
  }, [stats, filterOutside, filterRecurring, filterInternal]);

  const rangedAverage = useMemo(
    () => (filteredTotal / (stats ? stats.contributors.length : 1)).toPrecision(2),
    [filteredTotal, stats]
  );

  const weeklyData = useMemo(() => {
    return stats?.contributors.reverse().map((week) => {
      return {
        new: filterOutside ? week.new : 0,
        recurring: filterRecurring ? week.recurring : 0,
        internal: filterInternal ? week.internal : 0,
        bucket: new Date(week.bucket).toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
      };
    });
  }, [stats, filterOutside, filterRecurring, filterInternal]);

  const bucketTicks = useMemo(() => {
    return stats?.contributors.reverse().map((week) => {
      return new Date(week.bucket).toLocaleDateString(undefined, { month: "numeric", day: "numeric" });
    });
  }, [stats]);

  const CONTRIBUTOR_COLORS: Record<string, string> = {
    internal: "#1E3A8A",
    recurring: "#2563EB",
    new: "#60A5FA",
  };

  function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
    if (active && payload) {
      return (
        <figcaption className="flex flex-col gap-1 text-sm bg-white px-4 py-3 rounded-lg border w-fit">
          <section className="flex gap-2 font-medium text-slate-500 items-center text-xs w-fit">
            <FaUsers className="fill-slate-500" />
            <p>Contributors</p>
            <p>{payload[0]?.payload.bucket}</p>
          </section>

          {payload.toReversed().map((data) => (
            <section key={`${data.bucket}_${data.name}`} className="flex justify-between">
              <p className="flex gap-2 items-center px-1 text-slate-500 capitalize">
                <span
                  className={`w-2 h-2 rounded-full bg-[${CONTRIBUTOR_COLORS[data.name || "new"]}] inline-block`}
                ></span>
                {data.name === "new" ? "Outside" : data.name}:
              </p>
              <p className="font-medium pl-2">{data.value}</p>
            </section>
          ))}
        </figcaption>
      );
    }
  }

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
                <p className="font-semibold text-xl xl:text-3xl">{filteredTotal}</p>
              </div>
              <div>
                <h3 className="text-xs xl:text-sm text-slate-500">Average per week</h3>
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
            {filterInternal && <Bar dataKey="internal" stackId="a" fill="#1E3A8A" />}
            {filterRecurring && <Bar dataKey="recurring" stackId="a" fill="#2563EB" />}
            {filterOutside && <Bar dataKey="new" stackId="a" fill="#60A5FA" />}
          </BarChart>
        )}
      </ResponsiveContainer>

      <section className="flex gap-4 w-full px-4 justify-center items-center text-sm">
        <h3>Filter:</h3>
        <label className="flex gap-2">
          <input type="checkbox" checked={filterOutside} onChange={() => setFilterOutside(!filterOutside)} />
          Outside
        </label>
        <label className="flex gap-2">
          <input type="checkbox" checked={filterRecurring} onChange={() => setFilterRecurring(!filterRecurring)} />
          Recurring
        </label>
        <label className="flex gap-2">
          <input type="checkbox" checked={filterInternal} onChange={() => setFilterInternal(!filterInternal)} />
          Internal
        </label>
      </section>
    </Card>
  );
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
