import { useMemo } from "react";
import { FaUserPlus } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";

type ContributorConfidenceChartProps = {
  contributorConfidence: number | undefined;
  isLoading: boolean;
  isError: boolean;
  className?: string;
};

export default function ContributorConfidenceChart({
  contributorConfidence,
  isLoading,
  isError,
  className,
}: ContributorConfidenceChartProps) {
  const percentage = Math.floor((contributorConfidence ?? 0) * 100);
  const data = useMemo(
    () => [
      { name: "confidence", value: percentage },
      { name: "difference", value: 100 - percentage },
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

  return (
    <Card className={`${className ?? ""} flex flex-col gap-4 w-full h-fit items-center py-8`}>
      <header className="flex w-full justify-between items-center px-4">
        <div className="flex gap-2 items-center">
          <FaUserPlus className="text-xl" />
          <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Contributor Confidence</h3>
        </div>
        <a
          href="https://opensauced.pizza/docs"
          className="text-sauced-orange text-xs xl:text-sm font-semibold hover:underline"
        >
          Learn More
        </a>
      </header>

      <section className="flex lg:flex-col xl:flex-row gap-2 justify-between w-full h-fit max-h-24 lg:max-h-full xl:max-h-24">
        {!isError && (isLoading || !contributorConfidence) ? (
          <SkeletonWrapper width={200} height={150} />
        ) : (
          <div className="w-full !max-w-[14rem] lg:max-w-full lg:mx-auto h-full lg:max-h-24 xl:h-full">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={data} dataKey="value" startAngle={180} endAngle={0} innerRadius={40} paddingAngle={0}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === "confidence" ? pieColor : "#e2e8f0"} />
                  ))}
                  <Label
                    value={`${percentage}%`}
                    position="center"
                    className="fill-black text-base xl:text-xl font-semibold"
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        <section className="flex flex-col gap-1 lg:text-center xl:text-start">
          <h3 className="font-medium text-base lg:text-sm text-slate-700">This project {projectStatus}</h3>
          <p className="text-base lg:text-sm text-slate-600">
            {projectDescription} stargazers and forkers come back later on to a meaningful contribution.
          </p>
        </section>
      </section>
    </Card>
  );
}
