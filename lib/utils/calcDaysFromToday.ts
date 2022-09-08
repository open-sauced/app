const calcDaysFromToday = (endDate: Date) => {
  const currentDate = new Date(Date.now());

  const difference = currentDate.getTime() - endDate.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return totalDays;
};

export default calcDaysFromToday;