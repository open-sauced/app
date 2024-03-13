import { ResponsiveLine } from "@nivo/line";
import differenceInDays from "date-fns/differenceInDays";
import { FaArrowUp, FaEllipsisVertical } from "react-icons/fa6";
import Card from "components/atoms/Card/card";
import { usePullRequestsHistogram } from "lib/hooks/api/usePullRequestsHistogram";

type MetricCardProps = {
  variant: "bar" | "line";
  repoId: number;
  range?: number;
};

interface GraphData {
  x: number;
  y: number;
}

const getPullRequestsHistogramToDays = (pull_requests: DbPullRequestGitHubEventsHistogram[], range = 30) => {
  const graphDays = pull_requests.reduce(
    (days: { [name: string]: number }, curr: DbPullRequestGitHubEventsHistogram) => {
      const day = differenceInDays(new Date(), new Date(curr.bucket));

      if (days[day]) {
        days[day] += curr.prs_count;
      } else {
        days[day] = curr.prs_count;
      }

      return days;
    },
    {}
  );

  const days: GraphData[] = [];

  for (let d = range; d >= 0; d--) {
    days.push({ x: d, y: graphDays[d] || 0 });
  }

  return days;
};

export default function MetricCard({ variant, repoId, range = 30 }: MetricCardProps) {
  const { data: repositoryPullRequestsHistogram } = usePullRequestsHistogram({
    repoIds: [repoId],
    width: 1,
    range: Number(range || "30"),
  }) as { data: DbPullRequestGitHubEventsHistogram[] };
  const days = getPullRequestsHistogramToDays(repositoryPullRequestsHistogram, range);
  const graphData = [
    {
      id: `last30-${repoId}`,
      color: "hsl(148.07, 100%, 33.53%)",
      data: days,
    },
  ];
  return (
    <Card className="flex flex-col gap-4 px-8 py-6 w-full max-w-sm h-fit">
      <section className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Commits</h3>
        <button>
          <FaEllipsisVertical />
        </button>
      </section>

      <section className="flex gap-8 justify-between items-center">
        <p className="w-fit text-4xl font-bold">2,000</p>
        <div className="grow w-full max-w-3xl">
          {variant === "line" && (
            <ResponsiveLine data={graphData} enableGridX={false} enableGridY={false} enablePoints={false} />
          )}
        </div>
      </section>

      <section className="flex gap-4 items-center">
        <div className="flex gap-1 items-center px-3 py-1 rounded-full bg-green-100 border-2 border-green-300 text-green-500">
          <FaArrowUp />
          <p className="text-lg">10%</p>
        </div>
        <p className="font-medium text-slate-700">vs last period</p>
      </section>
    </Card>
  );
}
