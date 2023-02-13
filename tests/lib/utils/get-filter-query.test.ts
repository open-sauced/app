import getFilterQuery from "lib/utils/get-filter-query";

describe("[lib] getFilterQuery()", () => {

  it("Should return a filter query if single string or array of 1 string", () => {
    let testString = "recent";
    let result = getFilterQuery(testString);
    expect(result).toEqual("&filter=recent");

    let testString2 = ["recent"];
    result = getFilterQuery(testString);
    expect(result).toEqual("&filter=recent");
  });

  it("Should return an empty string if no filter is provided", () => {
    const testString = "";
    const result = getFilterQuery(testString);
    expect(result).toEqual("");
  });

  // in cae the input is string array of more than one item
  it("Should return repo query if an array of 2 items", () => {
    const testString = ["recent", "popular"];
    const result = getFilterQuery(testString);
    expect(result).toEqual("&repo=recent%2Fpopular");
  });
});
