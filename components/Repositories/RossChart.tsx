import { FaUsers } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

type RossChartProps = {
  stats: RepositoryRoss;
  isLoading: boolean;
  error: boolean;
  range: number;
  syncId: string;
  className?: string;
};

export default function RossChart({ stats, isLoading, error, range, syncId, className }: RossChartProps) {
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
                <h3 className="text-xs xl:text-sm text-slate-500">New</h3>
                <p className="font-semibold text-xl xl:text-3xl">{rangedTotal}</p>
              </div>
              <div>
                <h3 className="text-xs lg:text-sm text-slate-500">Recurring</h3>
                <p className="font-semibold text-xl xl:text-3xl">{humanizeNumber(rangedAverage)}</p>
              </div>
              <div>
                <h3 className="text-xs lg:text-sm text-slate-500">Internal</h3>
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
