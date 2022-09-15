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