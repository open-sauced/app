import topicNameFormatting from "lib/utils/topic-name-formatting";

describe("[lib] checkCamelCaseNaming()", () => {
  it("should make javascript camelCase and uppercase first letter", () => {
    const testString = "javascript";
    const result = topicNameFormatting(testString);
    expect(result).toBe("JavaScript");
  });

  it("should uppercase python without camelCase", () => {
    const testString = "python";
    const result = topicNameFormatting(testString);
    expect(result).toBe("Python");
  });
});
