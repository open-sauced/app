const fetchDevToBlogInfo = async (blogLink: string) => {
  try {
    const trimmedUrl = blogLink.trim();
    const devToUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
    const { pathname } = devToUrl;
    const [, username, slug] = pathname.split("/");
    const response = await fetch(`https://dev.to/api/articles/${username}/${slug}`);
    const data = await response.json();

    return {
      data: {
        title: data.title,
        markdown: data.body_markdown,
      },
      isError: null,
    };
  } catch (e) {
    console.log(e);

    return {
      data: null,
      isError: true,
    };
  }
};

export { fetchDevToBlogInfo };
