import { truncateString } from "../lib/funcs/truncate-string";

describe("[lib] truncateString()", () => {
  test("string should truncate with length", () => {
    const string = "test/testtesttest";
    const result = truncateString(string, 9);
    expect(result).toBe("test/test...");
  });

  test("string should be returned unchanged", () => {
    const string = "test/testtesttest";
    const result = truncateString(string, 17);
    expect(result).toBe("test/testtesttest");
  });
});