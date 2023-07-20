export function truncateString(str: string | undefined, num: number) {
  if (str === undefined) {
    return str;
  }

  if (str.length <= num || str === undefined) {
    return str;
  }
  return str.slice(0, num) + "...";
}
