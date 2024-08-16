import html2canvas, { Options } from "html2canvas";
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

/**
 * Copies the content of an HTML element as an image to the clipboard.
 *
 * @param node The HTML element to copy as an image.
 * @param options The options to tweak the image generation.
 *
 * @returns A promise that resolves when the image has been copied to the clipboard.
 */
export async function copyNodeAsImage(node: HTMLElement | null, options?: Partial<Options>) {
  if (!node) {
    throw new Error("Failed to copy image to clipboard");
  }

  await navigator.clipboard.write([
    new ClipboardItem({
      "image/png": new Promise(async (resolve, reject) => {
        html2canvas(node, options).then((canvas) => {
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
