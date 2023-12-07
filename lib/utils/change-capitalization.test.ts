import changeCapitalization from "lib/utils/change-capitalization";

describe("[lib] changeCapitalization()", () => {
  it("should make the first letter of a string upper case", () => {
    const testString = "chad";
    const result = changeCapitalization(testString, true);
    expect(result).toBe("Chad");
  });

  it("should make the first letter of a string lower case", () => {
    const testString = "Chad";
    const result = changeCapitalization(testString, false);
    expect(result).toBe("chad");
  });
});
