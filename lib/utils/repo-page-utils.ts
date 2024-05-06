import differenceInDays from "date-fns/differenceInDays";
import { DayRange } from "components/shared/DayRangePicker";
import { type StatsType } from "lib/hooks/api/useFetchMetricStats";

export type HistogramData = {
  bucket: string;
  star_count?: number;
  forks_count?: number;
  contributor_count?: number;
  opened_issues?: number;
  closed_issues?: number;
};

export function getTicks({ histogram, range }: { histogram: HistogramData[]; range: DayRange }): string[] {
  // if 30 days, get every 3 days
  // if 90 days, get every week
  // if 7 days, get all days
  const result: string[] = [];
  switch (range) {
    case 7:
      return histogram.map((point) => point.bucket);
    case 30: {
      for (let i = 3; i < 30; i += 3) {
        result.push(histogram[i].bucket);
      }
      return result;
    }
    case 90: {
      for (let i = 7; i < 90; i += 7) {
        result.push(histogram[i].bucket);
      }
      return result;
    }
    case 180: {
      for (let i = 30; i < 180; i += 30) {
        result.push(histogram[i].bucket);
      }
      return result;
    }
    case 360: {
      for (let i = 60; i < 360; i += 60) {
        result.push(histogram[i].bucket);
      }
      return result;
    }
    default:
      return [];
  }
}

// adds empty days in between those given by the histogram API endpoint
export function getDailyStarsHistogramToDays({
  stats,
  range,
}: {
  stats: StatsType[] | undefined;
  range: number;
}): HistogramData[] {
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
            bucket: missingDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
            star_count: 0,
          };
        }
      }

      newDay.setDate(today.getDate() - count);
      days[count] = {
        bucket: newDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
        star_count: current.star_count!,
      };
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
      temp = {
        bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(undefined, {
          month: "numeric",
          day: "numeric",
        }),
        star_count: 0,
      };
    }
    result.push(temp);
  }

  result.reverse();
  return result;
}

export function getHistoryStarsHistogramToDays({
  stats,
  range,
  total,
}: {
  stats: StatsType[] | undefined;
  range: number;
  total: number;
}): HistogramData[] {
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
            bucket: missingDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
            star_count: currentTotal,
          };
        }
      }
      const newDay = new Date();
      newDay.setDate(today.getDate() - count);
      days[count] = {
        bucket: newDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
        star_count: currentTotal - current.star_count!,
      };
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
      temp = {
        bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(undefined, {
          month: "numeric",
          day: "numeric",
        }),
        star_count: currentTotal,
      };
    }
    result.push(temp);
    currentTotal = temp.star_count!;
  }
  result.reverse();

  return result;
}

export function getDailyForksHistogramToDays({
  stats,
  range,
}: {
  stats: StatsType[] | undefined;
  range: number;
}): HistogramData[] {
  let previousCount = 0;
  const allDays = stats?.reverse().reduce((days: { [count: number]: StatsType }, current: StatsType) => {
    const today = new Date();
    const count = differenceInDays(today, new Date(current.bucket));

    if (days[count]) {
      days[count].forks_count! += current.forks_count!;
    } else {
      const newDay = new Date();
      if (count - previousCount > 1) {
        for (let missed = 1; missed < count - previousCount; missed++) {
          const missingDay = new Date(today);
          missingDay.setDate(today.getDate() - (missed + previousCount));
          days[previousCount + missed] = {
            bucket: missingDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
            forks_count: 0,
          };
        }
      }

      newDay.setDate(today.getDate() - count);
      days[count] = {
        bucket: newDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
        forks_count: current.forks_count!,
      };
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
      temp = {
        bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(undefined, {
          month: "numeric",
          day: "numeric",
        }),
        forks_count: 0,
      };
    }
    result.push(temp);
  }

  result.reverse();
  return result;
}

export function getHistoryForksHistogramToDays({
  stats,
  range,
  total,
}: {
  stats: StatsType[] | undefined;
  range: number;
  total: number;
}): HistogramData[] {
  let currentTotal = total;
  let previousCount = 0;

  const today = new Date();
  const allDays = stats?.reduce((days: { [count: number]: StatsType }, current: StatsType) => {
    const count = differenceInDays(today, new Date(current.bucket));

    if (days[count]) {
      days[count].forks_count! += currentTotal - current.forks_count!;
    } else {
      if (count - previousCount > 1) {
        for (let missed = 1; missed < count - previousCount; missed++) {
          const missingDay = new Date();
          missingDay.setDate(today.getDate() - (previousCount + missed));
          days[previousCount + missed] = {
            bucket: missingDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
            forks_count: currentTotal,
          };
        }
      }
      const newDay = new Date();
      newDay.setDate(today.getDate() - count);
      days[count] = {
        bucket: newDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
        forks_count: currentTotal - current.forks_count!,
      };
    }

    previousCount = count;
    currentTotal -= current.forks_count!;
    return days;
  }, {});

  // convert to array
  const result: StatsType[] = [];
  currentTotal = total;
  for (let i = 0; i < range; i++) {
    let temp = allDays?.[i];
    if (!temp) {
      const today = new Date();
      temp = {
        bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(undefined, {
          month: "numeric",
          day: "numeric",
        }),
        forks_count: currentTotal,
      };
    }
    result.push(temp);
    currentTotal = temp.forks_count!;
  }
  result.reverse();

  return result;
}

// adds empty days in between those given by the histogram API endpoint
export function getDailyContributorHistogramToDays({
  stats,
  range,
}: {
  stats: StatsType[] | undefined;
  range: number;
}): HistogramData[] {
  let previousCount = 0;
  const allDays = stats?.reverse().reduce((days: { [count: number]: StatsType }, current: StatsType) => {
    const today = new Date();
    const count = differenceInDays(today, new Date(current.bucket));

    if (days[count]) {
      days[count].contributor_count! += current.contributor_count!;
    } else {
      const newDay = new Date();
      if (count - previousCount > 1) {
        for (let missed = 1; missed < count - previousCount; missed++) {
          const missingDay = new Date(today);
          missingDay.setDate(today.getDate() - (missed + previousCount));
          days[previousCount + missed] = {
            bucket: missingDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
            contributor_count: 0,
          };
        }
      }

      newDay.setDate(today.getDate() - count);
      days[count] = {
        bucket: newDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
        contributor_count: current.contributor_count!,
      };
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
      temp = {
        bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(undefined, {
          month: "numeric",
          day: "numeric",
        }),
        contributor_count: 0,
      };
    }
    result.push(temp);
  }

  result.reverse();
  return result;
}

// adds empty days in between those given by the histogram API endpoint
export function getDailyIssuesHistogramToDays({
  stats,
  range,
}: {
  stats: StatsType[] | undefined;
  range: number;
}): HistogramData[] {
  let previousCount = 0;
  const allDays = stats?.reverse().reduce((days: { [count: number]: StatsType }, current: StatsType) => {
    const today = new Date();
    const count = differenceInDays(today, new Date(current.bucket));

    if (days[count]) {
      days[count].opened_issues! += current.opened_issues!;
      days[count].closed_issues! += current.closed_issues!;
    } else {
      const newDay = new Date();
      if (count - previousCount > 1) {
        for (let missed = 1; missed < count - previousCount; missed++) {
          const missingDay = new Date(today);
          missingDay.setDate(today.getDate() - (missed + previousCount));
          days[previousCount + missed] = {
            bucket: missingDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
            opened_issues: 0,
            closed_issues: 0,
          };
        }
      }

      newDay.setDate(today.getDate() - count);
      days[count] = {
        bucket: newDay.toLocaleDateString(undefined, { month: "numeric", day: "numeric" }),
        opened_issues: current.opened_issues!,
        closed_issues: current.closed_issues!,
      };
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
      temp = {
        bucket: new Date(today.setDate(today.getDate() - i)).toLocaleDateString(undefined, {
          month: "numeric",
          day: "numeric",
        }),
        opened_issues: 0,
        closed_issues: 0,
      };
    }
    result.push(temp);
  }

  result.reverse();
  return result;
}
