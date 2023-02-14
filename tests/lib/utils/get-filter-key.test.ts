import getFilterKey from "lib/utils/get-filter-key";

describe("[lib] getFilterKey()", () => {
// read the function and give me a description of what it does COPILOT
  it("Should format the string for filter key", () => {
    const testString = "FILTER BY DATE";
    const result = getFilterKey(testString);
    expect(result).toEqual("filter-by-date");
  });
});
