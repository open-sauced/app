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

export const getRelativeDays = (days: number) => {
  if (days === 0) {
    return "-";
  }

  if (days >= 365) {
    return `${Math.floor(days / 365)}y`;
  }

  if (days > 30 && days < 365) {
    return `${Math.floor(days / 30)}mo`;
  }

  return `${days}d`;
};

export const calcDistanceFromToday = (endDate: Date) => {
  const daysFromNow = calcDaysFromToday(endDate);

  if (daysFromNow >= 365) {
    return `${getRelativeDays(calcDaysFromToday(endDate))}`;
  }

  if (daysFromNow > 30 && daysFromNow < 365) {
    return `${getRelativeDays(calcDaysFromToday(endDate))}`;
  }

  return `${getRelativeDays(daysFromNow)}`;
};
