export const getBlogDetails = async (blogLink: string) => {
  const trimmedUrl = blogLink.trim();
  const devToUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
  const { pathname } = devToUrl;
  const [, username, slug] = pathname.split("/");
  const response = await fetch(`https://dev.to/api/articles/${username}/${slug}`);
  const data = await response.json();

  return {
    title: data.title,
    markdown: data.body_markdown,
  };
};

export const isValidBlogUrl = (url: string): boolean => {
  return url.match(/((https?:\/\/)?(www\.)?dev\.to\/[^\/]+\/[^\/]+)/) ? true : false;
};
