import { useMemo, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { usePostHog } from "posthog-js/react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";
import Button from "components/shared/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";
import OssfRequestModal from "./OssfRequestModal";

type OssfChartProps = {
  repository: string;
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
  repository,
  totalScore,
  dependencyUpdateScore,
  fuzzingScore,
  maintainedScore,
  isLoading,
  isError,
  onLearnMoreClick,
  className,
}: OssfChartProps) {
  const posthog = usePostHog();
  const { toast } = useToast();
  const { user } = useSupabaseAuth();
  const [isOssfRequestModalOpen, setIsOssfRequestModalOpen] = useState(false);
  const data = useMemo(
    () => [
      { name: "totalScore", value: totalScore ?? 0 },
      { name: "difference", value: 10 - (totalScore ?? 0) },
    ],
    [totalScore]
  );

  const onRequestClick = () => {
    if (!user) {
      setIsOssfRequestModalOpen(true);
    } else {
      posthog.capture(`Repo Page: requested OpenSSF score`, {
        repository,
        email: user.email,
      });
      toast({ description: "Request sent! We'll notify you when it's ready.", variant: "success" });
    }
  };

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
    low: "This project might not be safe to use",
    med: "This project is safe to use",
    high: "This project is safe to use",
    error: "Coming soon!",
  });

  const projectDescription = getValueBasedOnScore({
    low: "It might not pass all checks in the OpenSSF software security checklist. ",
    med: "It passes almost all checks in the OpenSSF software security checklist. ",
    high: "It passes almost all checks in the OpenSSF software security checklist with a high score. ",
    error:
      "We are still calculating the OpenSSF Score for this repository that measures the security level of the project.",
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
    <>
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
            data-html2canvas-ignore
          >
            Learn More
          </a>
        </header>

        {!isError && (isLoading || !totalScore) ? ( // check if other scores are null
          <SkeletonWrapper width={300} height={100} />
        ) : (
          <section className="flex justify-between items-center w-full gap-2 lg:flex-col xl:flex-row h-fit max-h-24 lg:max-h-full xl:max-h-24">
            <div className="relative w-full !max-w-[14rem] lg:max-w-full lg:mx-auto h-full lg:max-h-24 xl:h-full">
              <ResponsiveContainer width="100%" height={150} className={`${isError && "blur-[2.5px]"}`}>
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
              {isError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="primary" onClick={onRequestClick} className="!text-xs">
                    I want this now!
                  </Button>
                </div>
              )}
            </div>
            <section className="flex flex-col gap-1 lg:text-center xl:text-start">
              <h3 className="font-medium text-sm text-slate-700">{projectStatus}</h3>
              <p className="text-xs text-slate-600">
                {projectDescription}
                {!isError && (
                  <span data-html2canvas-ignore>
                    You can run the full test{" "}
                    <a
                      href="https://github.com/ossf/scorecard?tab=readme-ov-file#view-a-projects-score"
                      target="_blank"
                      className="text-orange-500"
                    >
                      here
                    </a>
                    .
                  </span>
                )}
              </p>
            </section>
          </section>
        )}
      </Card>

      <OssfRequestModal
        repository={repository}
        isOpen={isOssfRequestModalOpen}
        onClose={() => setIsOssfRequestModalOpen(false)}
      />
    </>
  );
}
