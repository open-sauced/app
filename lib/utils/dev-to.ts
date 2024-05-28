import { isValidUrlSlug } from "./url-validators";

export const getDevToBlogDetails = async (blogLink: string) => {
  const trimmedUrl = blogLink.trim();
  const devToUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
  const { pathname } = devToUrl;
  const [, username, slug] = pathname.split("/");

  if (!isValidUrlSlug(username) || !isValidUrlSlug(slug)) {
    throw new Error("Invalid input");
  }

  const response = await fetch(`https://dev.to/api/articles/${username}/${slug}`);
  const data = await response.json();

  return {
    title: data.title,
    markdown: data.body_markdown,
  };
};

export const isValidDevToBlogUrl = (url: string): boolean => {
  return url.match(/((https?:\/\/)?(www\.)?dev\.to\/[^\/]+\/[^\/]+)/) ? true : false;
};
