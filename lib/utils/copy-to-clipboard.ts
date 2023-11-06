export const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("This browser does not support the clipboard.", error);
  }
};
