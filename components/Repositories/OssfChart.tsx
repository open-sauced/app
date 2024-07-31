import { useMemo } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";

type OssfChartProps = {
  totalScore: number | null;
  dependencyUpdateScore: number | null;
  fuzzingScore: number | null;
  maintainedScore: number | null;
  isLoading: boolean;
  isError: boolean;
  onLearnMoreClick?: () => void;
  className?: string;
};

export default function OssfChart({
  totalScore,
  dependencyUpdateScore,
  fuzzingScore,
  maintainedScore,
  isLoading,
  isError,
  onLearnMoreClick,
  className,
}: OssfChartProps) {
  const data = useMemo(
    () => [
      { name: "totalScore", value: totalScore ?? 0 },
      { name: "difference", value: 10 - (totalScore ?? 0) },
    ],
    [totalScore]
  );

  const getValueBasedOnScore = ({
    low,
    med,
    high,
    error,
  }: {
    low: string;
    med: string;
    high: string;
    error: string;
  }) => {
    if (isError) return error;
    if (!totalScore) return error;
    return totalScore < 5 ? low : totalScore < 8 ? med : high;
  };

  const pieColor = getValueBasedOnScore({ low: "#f59e0b", med: "#2563eb", high: "#22c55e", error: "#e2e8f0" });

  const projectStatus = getValueBasedOnScore({
    low: "might not be safe to use",
    med: "is safe to use",
    high: "is safe to use",
    error: "hasn't been calculated yet.",
  });

  const projectDescription = getValueBasedOnScore({
    low: "It might not pass all checks in the OpenSSF software security checklist. ",
    med: "It passes almost all checks in the OpenSSF software security checklist. ",
    high: "It passes almost all checks in the OpenSSF software security checklist with a high score. ",
    error: "No checks have been tested from the OpenSSF software security checklist. ",
  });

  const renderCustomLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    return (
      <text x={cx} y={cy} dy={-1} textAnchor="middle" className="text-lg lg:text-2xl fill-black font-semibold">
        {totalScore ?? "-"}
        <tspan className="text-xs"> / 10</tspan>
      </text>
    );
  };

  return (
    <Card className={`${className ?? ""} flex flex-col gap-4 w-full h-fit items-center py-8`}>
      <header className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-xl" />
          <h3 className="text-sm font-semibold xl:text-lg text-slate-800">OpenSSF Score</h3>
        </div>
        <a
          href="https://opensauced.pizza/docs/features/repo-pages/#insights-into-the-ossf-scorecard"
          onClick={onLearnMoreClick}
          className="text-xs font-semibold text-sauced-orange xl:text-sm hover:underline"
        >
          Learn More
        </a>
      </header>

      {!isError && (isLoading || !totalScore) ? ( // check if other scores are null
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
                    <Cell key={`cell-${index}`} fill={entry.name === "totalScore" ? pieColor : "#e2e8f0"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <section className="flex flex-col gap-1 lg:text-center xl:text-start">
            <h3 className="font-medium text-sm text-slate-700">This project {projectStatus}</h3>
            <p className="text-xs text-slate-600">
              {projectDescription}
              You can run the full test{" "}
              <a
                href="https://github.com/ossf/scorecard?tab=readme-ov-file#view-a-projects-score"
                target="_blank"
                className="text-orange-500"
              >
                here
              </a>
              .
            </p>
          </section>
        </section>
      )}
    </Card>
  );
}
