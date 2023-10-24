export const handleCopyToClipboard = async (content: any) => {
  const url = new URL(content, window.location.origin).toString();
  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    console.log(error);
  }
};
