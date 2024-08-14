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

export async function copyImageToClipboard(imageUrl: string) {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": new Promise(async (resolve) => {
          const data = await fetch(imageUrl);
          const blob = await data.blob();

          resolve(new Blob([blob], { type: "image/png" }));
        }),
      }),
    ]);
    return true;
  } catch (err) {
    return false;
  }
}
