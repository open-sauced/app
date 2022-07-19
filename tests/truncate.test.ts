import { truncateString } from "../lib/funcs/truncate-string";

describe("Test: truncate()", () => {
  test("string should truncate with length", () => {
    const string = "test/testtesttest";
    const result = truncateString(string, 9);
    expect(result).toBe("test/test...");
  });
});