export const siteUrl = (path: string = "", params: { [key: string]: any } = {}) => {
  let urlString = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  urlString = urlString.includes("http") ? urlString : `https://${urlString}`;
  // Make sure to including trailing `/`.
  urlString = urlString.charAt(urlString.length - 1) === "/" ? urlString : `${urlString}/`;

  if (path) {
    urlString = path.charAt(0) === "/" ? `${urlString}${path.slice(1)}` : `${urlString}${path}`;
  }

  let url = new URL(urlString);
  // append params
  Object.keys(params).forEach((key) => {
    if (params[key] !== null || params[key] !== undefined) url.searchParams.append(key, params[key]);
  });

  return url.toString();
};

export const isValidUrl = (url: string) => {
  return /^(http|https):\/\/[A-Za-z0-9.-]+(\/[A-Za-z0-9\/_.-]+)*$/.test(url);
};

/**
 * -------------------------------------------------------------------------------
 *  DevCard URLs
 * -------------------------------------------------------------------------------
 */
export const cardPageUrl = (username: string) => siteUrl(`user/${username}/card`);

export const cardImageUrl = (username: string, opts: { size?: string } = {}) =>
  siteUrl(`og-images/dev-card`, { username, ...opts });

export const twitterCardShareUrl = (username: string) => {
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.append("text", "Check out my open-source contributions card!");
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
