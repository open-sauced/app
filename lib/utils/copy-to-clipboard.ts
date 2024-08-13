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
    const data = await fetch(imageUrl);

    if (data.ok) {
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
