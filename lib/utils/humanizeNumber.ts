const humanizeNumber = (num: number | string, type: "comma" | "abbreviation" | null) => {
  const number = typeof num !== "number" ? parseFloat(num) : num;
  const abs = Math.abs(number);
  const sign = Math.sign(number);
  const commaConverted = abs > 999 ? `${((sign * abs) / 1000).toFixed(3).replace(".", ",")}` : `${sign * abs}`;
  const abbreviated = abs > 999 ? `${((sign * abs) / 1000).toFixed(1)}k` : `${sign * abs}`;

  return type === "comma" ? commaConverted : abbreviated;
};

export default humanizeNumber;
