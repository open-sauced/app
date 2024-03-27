import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, type TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { FaStar } from "react-icons/fa6";
import { differenceInDays } from "date-fns";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";
import Card from "components/atoms/Card/card";

type StarsChartProps = {
  stats: StatsType[] | undefined;
};

export default function StarsChart({ stats }: StarsChartProps) {
  const chartData = getStarsHistogramToDays({ stats });
  return (
    <Card className="flex flex-col gap-8 w-full lg:min-w-[64rem] h-full items-center pt-8">
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="bucket" tick={false} />
          <YAxis />
          <Tooltip content={CustomTooltip} filterNull={false} />
          <Bar dataKey="star_count" fill="#FF5100" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

// adds empty days
function getStarsHistogramToDays({ stats }: StarsChartProps) {
  let previousCount = 0;
  const allDays = stats?.reverse().reduce((days: { [count: number]: StatsType }, current: StatsType) => {
    const today = new Date();
    const count = differenceInDays(today, new Date(current.bucket));

    if (days[count]) {
      days[count].star_count! += current.star_count!;
    } else {
      const newDay = new Date();
      if (count - previousCount > 1) {
        for (let missed = 1; missed < count - previousCount; missed++) {
          const missingDay = new Date(today);
          missingDay.setDate(today.getDate() - (missed + previousCount));
          days[previousCount + missed] = {
            bucket: missingDay.toLocaleDateString(),
            star_count: 0,
          };
        }
      }

      newDay.setDate(today.getDate() - count);
      days[count] = { bucket: newDay.toLocaleDateString(), star_count: current.star_count! };
    }

    previousCount = count;
    return days;
  }, {});

  // convert to array
  const result: StatsType[] = [];
  for (let i = 0; i < 30; i++) {
    let temp: StatsType | undefined = allDays && allDays[i];
    if (!temp) {
      const today = new Date();
      temp = { bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(), star_count: 0 };
    }
    result.push(temp);
  }

  result.reverse();
  return result;
}

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    return (
      <figcaption className="flex flex-col gap-1 bg-white px-4 py-2 rounded-lg border">
        <section className="flex gap-2 items-center">
          <FaStar className="fill-sauced-orange" />
          <p>Stars: {payload[0]?.value}</p>
        </section>

        <p className="text-light-slate-9 text-sm">{payload[0]?.payload.bucket}</p>
      </figcaption>
    );
  }
}
