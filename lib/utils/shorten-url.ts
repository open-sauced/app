export async function shortenUrl(url: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/url/shorten?url=${encodeURIComponent(url)}`);

    if (response.ok) {
      const data = (await response.json()) as { shortUrl: string };
      return data.shortUrl;
    }
  } catch (e) {}

  return url;
}
