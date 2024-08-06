import { ParsedUrlQuery } from "querystring";
import Router from "next/router";

/**
 * Sets query parameters in the URL using Next.js Router.
 * @param {Record<string, string>} params - An object containing key-value pairs of query parameters to set. Pass in `{}`(an empty object) to skip.
 * @param {Array<string>} [paramsToRemove=[]] - An optional array of query parameter keys to remove from the URL. To skip use `[]`(an empty array).
 * @param {string | undefined} [pathname] - An optional variable for providing the pathname to go to.
 * @param {boolean} [scroll=false] - An optional boolean to enable or disable scrolling to the top of the page.
 */
function setQueryParams(
  params: Record<string, string>,
  paramsToRemove: Array<string> = [],
  pathname?: string,
  scroll = false
) {
  const presentQueryParams = deleteKeys(Router.query, paramsToRemove);

  // Merge final query and set URL
  Router.push(
    {
      pathname: pathname || Router.pathname,
      query: {
        ...presentQueryParams,
        ...params,
      },
    },
    undefined,
    { scroll }
  );
}

function deleteKeys<T extends ParsedUrlQuery, K extends keyof T>(obj: T, keys: K[]): T {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
}

export { setQueryParams };
