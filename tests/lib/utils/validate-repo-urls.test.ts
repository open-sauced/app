import { isValidRepoUrl } from "lib/utils/validate-repo-urls";

describe("[lib] isValidRepoUrl()", () => {
  it("Should return true with a valid repo name", () => {
    const testAbsoluteUrl = "https://github.com/open-sauced/insights";
    const result = isValidRepoUrl(testAbsoluteUrl);

    expect(result[0]).toBe(true);
    expect(result[1]).toEqual("open-sauced/insights");
  });

  it("Should return true with a valid repo name", () => {
    const testRelativeUrl = "open-sauced/insights";
    const result = isValidRepoUrl(testRelativeUrl);

    expect(result[0]).toBe(true);
    expect(result[1]).toEqual("open-sauced/insights");
  });

  it("Should return false", () => {
    const testInvalidAbsoluteUrl = "https://insights.opensauced.pizza/hub/insights/new";
    const result = isValidRepoUrl(testInvalidAbsoluteUrl);

    expect(result[0]).toBeFalsy();
    expect(result[1]).toBe(null);
  });

  it("Should return false", () => {
    const testNotAUrl = "🍕";
    const result = isValidRepoUrl(testNotAUrl);

    expect(result[0]).toBeFalsy();
    expect(result[1]).toBe(null);
  });
});
