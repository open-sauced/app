import { useMemo } from "react";
import { FaUserPlus } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";

type ContributorConfidenceChartProps = {
  contributorConfidence: number | undefined;
  isLoading: boolean;
  isError: boolean;
  onLearnMoreClick?: () => void;
  className?: string;
};

export default function ContributorConfidenceChart({
  contributorConfidence,
  isLoading,
  isError,
  onLearnMoreClick,
  className,
}: ContributorConfidenceChartProps) {
  const percentage = Math.floor((contributorConfidence ?? 0) * 100);
  const data = useMemo(
    () => [
      { name: "confidence", value: percentage > 50 ? 50 : percentage },
      { name: "difference", value: percentage > 50 ? 0 : 50 - percentage },
    ],
    [contributorConfidence]
  );

  const getValueBasedOnPercentage = ({ low, med, high }: { low: string; med: string; high: string }) => {
    return percentage < 10 ? low : percentage < 30 ? med : high;
  };

  const pieColor = getValueBasedOnPercentage({ low: "#f59e0b", med: "#2563eb", high: "#22c55e" });

  const projectStatus = getValueBasedOnPercentage({
    low: "can be intimidating",
    med: "can be initimidating",
    high: "is approachable!",
  });

  const projectDescription = getValueBasedOnPercentage({ low: "Few", med: "Some", high: "A lot of" });

  const renderCustomLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    return (
      <text x={cx} y={cy} dy={-1} textAnchor="middle" className="text-lg lg:text-2xl fill-black font-semibold">
        {percentage}
        <tspan className="text-xs lg:text-sm">%</tspan>
      </text>
    );
  };

  return (
    <Card className={`${className ?? ""} flex flex-col gap-4 w-full h-fit items-center py-8`}>
      <header className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <FaUserPlus className="text-xl" />
          <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Contributor Confidence</h3>
        </div>
        <a
          href="https://opensauced.pizza/docs/features/repo-pages/#insights-into-contributor-confidence"
          onClick={onLearnMoreClick}
          className="text-xs font-semibold text-sauced-orange xl:text-sm hover:underline"
          data-html2canvas-ignore
        >
          Learn More
        </a>
      </header>

      {!isError && (isLoading || contributorConfidence === undefined) ? (
        <SkeletonWrapper width={300} height={100} />
      ) : (
        <section className="flex justify-between w-full gap-2 lg:flex-col xl:flex-row h-fit max-h-24 lg:max-h-full xl:max-h-24">
          <div className="w-full !max-w-[14rem] lg:max-w-full lg:mx-auto h-full lg:max-h-24 xl:h-full">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={data}
                  label={renderCustomLabel}
                  labelLine={false}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={40}
                  paddingAngle={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === "confidence" ? pieColor : "#e2e8f0"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <section className="flex flex-col gap-1 lg:text-center xl:text-start">
            <h3 className="font-medium text-sm text-slate-700">This project {projectStatus}</h3>
            <p className="text-sm text-slate-600">
              {projectDescription} stargazers and forkers come back later on to a meaningful contribution.
            </p>
          </section>
        </section>
      )}
    </Card>
  );
}
