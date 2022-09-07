import humanizeNumber from "../../../lib/utils/humanizeNumber";

describe("Test: humanizeNumber()", () => {
  test("1000 should humanize with abbreviation", () => {
    const num = 1000;
    const result = humanizeNumber(num, "abbreviation");

    expect(result).toBe("1.0k");
  });

  test("1000 should humanize with comma", () => {
    const num = 1000;
    const result = humanizeNumber(num, "comma");

    expect(result).toBe("1,000");
  });
  test("'100' should not humanize", () => {
    const num = "100";
    const result = humanizeNumber(num, null);

    expect(result).toBe("100");
  });

  test("1234 should humanize with abbreviation", () => {
    const num = 1234;
    const result = humanizeNumber(num, "abbreviation");

    expect(result).toBe("1.2k");
  });

  test("1234 should humanize with comma", () => {
    const num = 1234;
    const result = humanizeNumber(num, "comma");

    expect(result).toBe("1,234");
  });
});
