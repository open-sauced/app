const SPLIT_CHARACTER = ",";

const splitQuery = (queryString: string) => {
  const queryArray = queryString.split(SPLIT_CHARACTER, 5);
  return queryArray;
};

export default splitQuery;