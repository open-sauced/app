import { describe, it, expect } from "vitest";
import { truncateString } from "lib/utils/truncate-string";

describe("[lib] truncateString()", () => {
  it("string should truncate with length", () => {
    const string = "test/testtesttest";
    const result = truncateString(string, 9);
    expect(result).toBe("test/test...");
  });

  it("string should be returned unchanged", () => {
    const string = "test/testtesttest";
    const result = truncateString(string, 17);
    expect(result).toBe("test/testtesttest");
  });
});
