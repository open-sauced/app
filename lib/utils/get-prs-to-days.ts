import differenceInDays from "date-fns/differenceInDays";

interface GraphData {
  x: number;
  y: number;
}

const getPullRequestsToDays = (pull_requests: DbRepoPR[]) => {
  const graphDays = pull_requests.reduce((days: { [name: string]: number }, curr: DbRepoPR) => {
    const day = differenceInDays(new Date(), new Date(curr.updated_at));

    if (days[day]) {
      days[day]++;
    } else {
      days[day] = 1;
    }

    return days;
  }, {});

  const collectedDays = Object.keys(graphDays).reduce((days: { day: number; count: number }[], day) => {
    days.push({ day: Number(day), count: graphDays[day] });
    return days;
  }, []);

  collectedDays.slice().sort((a, b) => (b.count > a.count ? 1 : 0));

  const days: GraphData[] = [];
  collectedDays.reverse().forEach((day) => {
    days.push({ x: day.day, y: day.count || 0 });
  });

  return days;
};

export default getPullRequestsToDays;
