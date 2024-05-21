export async function writeToClipboard(url: string) {
  setTimeout(async () => await navigator.clipboard.writeText(url));
}
