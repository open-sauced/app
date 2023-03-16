const getFilterQuery = (filter: string | string[] | undefined): string => {
  const query = new URLSearchParams();

  if (Array.isArray(filter) && filter.length === 2) {
    query.set("repo", filter.join("/"));
  } else if (filter) {
    query.set("filter", Array.isArray(filter) ? filter[0] : filter);
  }

  return `${query}` ? `&${query}` : "";
};

export default getFilterQuery;