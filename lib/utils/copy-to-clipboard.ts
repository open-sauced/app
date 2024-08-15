import html2canvas from "html2canvas";
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

/**
 * Copies the content of an HTML element as an image to the clipboard.
 *
 * @param node The HTML element to copy as an image.
 *
 * @returns A promise that resolves when the image has been copied to the clipboard.
 */
export async function copyNodeAsImage(node: HTMLElement | null) {
  if (!node) {
    throw new Error("Failed to copy image to clipboard");
  }

  await navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve, reject) => {
        html2canvas(node).then((canvas) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject("Failed to copy image to clipboard");
              return;
            }

            resolve(new Blob([blob], { type: "image/png" }));
          }, "image/png");
        });
      }),
    }),
  ]);
}
