import { shortenUrl } from "./shorten-url";

export const copyToClipboard = async (content: string) => {
  try {
    const shortUrl = await shortenUrl(content);
    await navigator.clipboard.writeText(shortUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("This browser does not support the clipboard.", error);
  }
};
