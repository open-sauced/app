import checkCamelCaseNaming from "lib/utils/check-camelcase-naming";

describe("[lib] checkCamelCaseNaming()", () => {
  it("should make javascript camelCase and uppercase first letter", () => {
    const testString = "javascript";
    const result = checkCamelCaseNaming(testString);
    expect(result).toBe("JavaScript");
  });

  it("should uppercase python without camelCase", () => {
    const testString = "python";
    const result = checkCamelCaseNaming(testString);
    expect(result).toBe("Python");
  });
});
