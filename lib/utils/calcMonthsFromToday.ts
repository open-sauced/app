const calcMonthsFromToday = (endDate: Date) => {
  const today = new Date(Date.now());
  const monthDifference = today.getMonth() - endDate.getMonth() + 12 * (today.getFullYear() - endDate.getFullYear());

  return monthDifference;
};

export default calcMonthsFromToday;