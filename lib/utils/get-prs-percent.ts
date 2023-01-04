const getPrsPercent = (total: number, merged: number): number => {
  if (total <= 0) {
    return 0;
  }

  const result = Math.floor((merged / total) * 100);

  return result;
};

export default getPrsPercent;
