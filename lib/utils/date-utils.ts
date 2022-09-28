import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export const calcDaysFromToday = (endDate: Date) => {
  const timeFromNowArray = formatDistanceToNowStrict(endDate, {
    unit: "day"
  }).split(" ");

  const daysFromNow = parseInt(timeFromNowArray[0]);

  return daysFromNow;
};

export const calcMonthsFromToday = (endDate: Date) => {
  const timeFromNowArray = formatDistanceToNowStrict(endDate, {
    unit: "month"
  }).split(" ");

  const monthsFromNow = parseInt(timeFromNowArray[0]);

  return monthsFromNow;
};

export const calcYearsFromToday = (endDate: Date) => {
  const timeFromNowArray = formatDistanceToNowStrict(endDate, {
    unit: "year"
  }).split(" ");

  const monthsFromNow = parseInt(timeFromNowArray[0]);

  return monthsFromNow;
};

export const calcDistanceFromToday = (endDate: Date) => {
  const daysFromNow = calcDaysFromToday(endDate);

  if (daysFromNow === 0) {
    return "-";
  }

  if (daysFromNow >= 365) {
    return `${calcYearsFromToday(endDate)}y`;
  }

  if (daysFromNow > 30 && daysFromNow < 365) {
    return `${calcMonthsFromToday(endDate)}mo`;
  }

  return `${daysFromNow}d`;
};
