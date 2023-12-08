import { describe, it, expect } from "vitest";
import humanizeNumber from "lib/utils/humanizeNumber";

describe("Test: humanizeNumber()", () => {
  it("1000 should humanize with abbreviation", () => {
    const num = 1000;
    const result = humanizeNumber(num, "abbreviation");

    expect(result).toBe("1.0k");
  });

  it("1000 should humanize with comma", () => {
    const num = 1000;
    const result = humanizeNumber(num, "comma");

    expect(result).toBe("1,000");
  });
  it("'100' should not humanize", () => {
    const num = "100";
    const result = humanizeNumber(num, null);

    expect(result).toBe("100");
  });

  it("1234 should humanize with abbreviation", () => {
    const num = 1234;
    const result = humanizeNumber(num, "abbreviation");

    expect(result).toBe("1.2k");
  });

  it("1234 should humanize with comma", () => {
    const num = 1234;
    const result = humanizeNumber(num, "comma");

    expect(result).toBe("1,234");
  });
});
