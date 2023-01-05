const getPercent = (total: number, count: number): number => {
  if (total <= 0) {
    return 0;
  }

  const result = Math.floor((count / total) * 100);

  return result;
};

export default getPercent;
