const getFilterQuery = (filter: string | string[] | undefined): string => {
  if (Array.isArray(filter) && filter.length === 2) {
    return `&repo=${encodeURIComponent(filter.join("/"))}`;
  }

  return filter ? `&filter=${Array.isArray(filter) ? filter[0] : filter}` : "";
};

export default getFilterQuery;