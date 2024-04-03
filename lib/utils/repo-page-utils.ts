import differenceInDays from "date-fns/differenceInDays";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";

// adds empty days in between those given by the histogram API endpoint
export function getDailyStarsHistogramToDays({ stats, range }: { stats: StatsType[] | undefined; range: number }) {
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
  for (let i = 0; i < range; i++) {
    let temp = allDays?.[i];
    if (!temp) {
      const today = new Date();
      temp = { bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(), star_count: 0 };
    }
    result.push(temp);
  }

  result.reverse();
  return result;
}

export function getCumulativeStarsHistogramToDays({
  stats,
  range,
  total,
}: {
  stats: StatsType[] | undefined;
  range: number;
  total: number;
}) {
  let currentTotal = total;
  let previousCount = 0;

  const today = new Date();
  const allDays = stats?.reduce((days: { [count: number]: StatsType }, current: StatsType) => {
    const count = differenceInDays(today, new Date(current.bucket));

    if (days[count]) {
      days[count].star_count! += currentTotal - current.star_count!;
    } else {
      if (count - previousCount > 1) {
        for (let missed = 1; missed < count - previousCount; missed++) {
          const missingDay = new Date();
          missingDay.setDate(today.getDate() - (previousCount + missed));
          days[previousCount + missed] = {
            bucket: missingDay.toLocaleDateString(),
            star_count: currentTotal,
          };
        }
      }
      const newDay = new Date();
      newDay.setDate(today.getDate() - count);
      days[count] = { bucket: newDay.toLocaleDateString(), star_count: currentTotal - current.star_count! };
    }

    previousCount = count;
    currentTotal -= current.star_count!;
    return days;
  }, {});

  // convert to array
  const result: StatsType[] = [];
  currentTotal = total;
  for (let i = 0; i < range; i++) {
    let temp = allDays?.[i];
    if (!temp) {
      const today = new Date();
      temp = { bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(), star_count: currentTotal };
    }
    result.push(temp);
    currentTotal = temp.star_count!;
  }
  result.reverse();

  return result;
}
