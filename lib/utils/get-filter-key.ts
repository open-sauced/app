/**
 * This translates the filter options from human-readable
 * text to dash-cased names. The filter options need to be refactored
 * to separate the description from the value.
 */
const getFilterKey = (filterName: string) => {
  return filterName.toLowerCase().replaceAll(" ", "-");
};

export default getFilterKey;