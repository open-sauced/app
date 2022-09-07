const humanizeNumber = (num: number | string) => {
  const number = typeof num !== "number" ? parseFloat(num) : num;
  const abs = Math.abs(number);
  const sign = Math.sign(number);

  return abs > 999 ? `${((sign * abs) / 1000).toFixed(3).replace(".", ",")}` : `${sign * abs}`;
};

export default humanizeNumber;
