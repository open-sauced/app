const getPercentageChange = (prevCount: number, currentCount: number) => {
  const percentageChange = Math.floor(Math.abs((currentCount - prevCount) / prevCount) * 100);
  return percentageChange;
};

export default getPercentageChange;
