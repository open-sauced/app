export function humanizeNumber(num: number | string, type: "comma" | "abbreviation" | null = null) {
  const number = typeof num !== "number" ? parseFloat(num) : num;
  const abs = Math.abs(number);
  const sign = Math.sign(number);
  const commaConverted = abs > 999 ? `${((sign * abs) / 1000).toFixed(3).replace(".", ",")}` : `${sign * abs}`;
  const abbreviated = abs > 999 ? `${((sign * abs) / 1000).toFixed(1)}k` : `${sign * abs}`;

  return type === "comma" ? commaConverted : abbreviated;
}

export function getLocalAsset(url: URL): Promise<ArrayBuffer> {
  return fetch(url).then((res) => res.arrayBuffer());
}

export function getOrgUsernameAvatar(username: string, size = 25.2) {
  return `https://www.github.com/${username}.png?size=${size}`;
}
