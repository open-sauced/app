import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

type MetricCardProps = {
  repository: string;
  variant: "stars" | "forks";
  range: number;
};

export default function MetricCard({ repository, variant, range }: MetricCardProps) {
  const { data: stats, error } = useFetchMetricStats({ repository, variant, range });

  return (
    <div className="text-black">
      {stats && stats.map((stat, i) => <p key={`${repository}_${variant}_${i}`}>{stat.bucket}</p>)}
    </div>
  );
}
