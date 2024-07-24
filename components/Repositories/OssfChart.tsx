import { useMemo } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";

// TODO: change schema to the one returned from the API once `api/#962` is implemented
type OssfData = {
  totalScore: number;
  dependencyUpdateScore: number;
  fuzzingScore: number;
  maintainedScore: number;
};

type OssfChartProps = {
  ossfData: OssfData;
  isLoading: boolean;
  isError: boolean;
  onLearnMoreClick?: () => void;
  className?: string;
};

export default function OssfChart({ ossfData, isLoading, isError, onLearnMoreClick, className }: OssfChartProps) {
  const data = useMemo(
    () => [
      { name: "totalScore", value: ossfData.totalScore },
      { name: "difference", value: 10 - ossfData.totalScore },
    ],
    [ossfData]
  );

  const getValueBasedOnPercentage = ({ low, med, high }: { low: string; med: string; high: string }) => {
    return ossfData.totalScore < 4 ? low : ossfData.totalScore < 8 ? med : high;
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
        {ossfData.totalScore}
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
          href="" // TODO: Link to OpenSSF docs
          onClick={onLearnMoreClick}
          className="text-xs font-semibold text-sauced-orange xl:text-sm hover:underline"
        >
          Learn More
        </a>
      </header>

      {!isError && (isLoading || !ossfData) ? (
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
            <p className="text-sm text-slate-600">
              {projectDescription} stargazers and forkers come back later on to a meaningful contribution.
            </p>
          </section>
        </section>
      )}
    </Card>
  );
}
