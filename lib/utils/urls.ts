export const siteUrl = (path: string = "") => {
  let url = process.env.NEXT_PUBLIC_BASE_URL || "/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  if (path) {
    url = path.charAt(0) === "/" ? `${url}${path.slice(1)}` : `${url}${path}`;
  }

  return url;
};



/**
 * -------------------------------------------------------------------------------
 *  DevCard URLs
 * -------------------------------------------------------------------------------
 */
export const cardPageUrl = (username: string) => siteUrl(`user/${username}/card`);

export const cardImageUrl = (username: string) => siteUrl(`api/card.png?username=${username}`);

export const twitterCardShareUrl = (username: string) => {
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.append("text", "Check out my Open Sauced DevCard!");
  url.searchParams.append("via", "saucedopen");
  url.searchParams.append("url", cardPageUrl(username));
  return url.toString();
};

export const linkedinCardShareUrl = (username: string, summary: string) => {
  const url = new URL("https://www.linkedin.com/shareArticle?mini=true");
  url.searchParams.append("url", cardPageUrl(username));
  url.searchParams.append("title", "Check out my open-source contributions card!");
  url.searchParams.append("summary", summary);
  return url.toString();
};
