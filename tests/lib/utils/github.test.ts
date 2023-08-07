import {
  getAvatarById,
  getAvatarByUsername,
  getProfileLink,
  getRepoIssuesLink,
  generateGhOgImage,
  generateRepoFullName,
} from "lib/utils/github";

describe("[lib] github methods", () => {
  it("Should return a valid avatar link", () => {
    const result = getAvatarById("Deadreyo", 460);
    expect(result).toEqual("https://avatars.githubusercontent.com/u/Deadreyo?size=460&v=4");
  });

  it("Should return a valid avatar link", () => {
    const result = getAvatarByUsername("Deadreyo", 460);
    expect(result).toEqual("https://www.github.com/Deadreyo.png?size=460");
  });

  it("Should return a valid profile link", () => {
    const result = getProfileLink("Deadreyo");
    expect(result).toEqual("https://github.com/Deadreyo");
  });

  it("Should return a valid repo issues link", () => {
    const result = getRepoIssuesLink("Deadreyo/insights");
    expect(result).toEqual("https://github.com/Deadreyo/insights/issues");
  });
  it("Should return a valid image src link", () => {
    const result = generateGhOgImage("https://github.com/open-sauced/hot/pull/448");
    expect(result).toEqual({ isValid: true, url: "https://opengraph.githubassets.com/1/open-sauced/hot/pull/448" });
  });
  it("Should return an object with isValid set to false", () => {
    const result = generateGhOgImage("https://gitub.com/open-sauced/hot/pull/448");
    expect(result).toEqual({ isValid: false, url: "" });
  });
  it("Should return true with a valid repo name", () => {
    const testAbsoluteUrl = "https://github.com/open-sauced/insights";
    const result = generateRepoFullName(testAbsoluteUrl);

    expect(result.isValidRepo).toBe(true);
    expect(result.repoFullName).toEqual("open-sauced/insights");
  });
  it("Should return true with a valid repo name", () => {
    const testRelativeUrl = "open-sauced/insights";
    const result = generateRepoFullName(testRelativeUrl);

    expect(result.isValidRepo).toBe(true);
    expect(result.repoFullName).toEqual("open-sauced/insights");
  });
  it("Should return false", () => {
    const testInvalidAbsoluteUrl = "https://insights.opensauced.pizza/hub/insights/new";
    const result = generateRepoFullName(testInvalidAbsoluteUrl);

    expect(result.isValidRepo).toBeFalsy();
    expect(result.repoFullName).toBe(null);
  });
  it("Should return false", () => {
    const testNotAUrl = "🍕";
    const result = generateRepoFullName(testNotAUrl);

    expect(result.isValidRepo).toBeFalsy();
    expect(result.repoFullName).toBe(null);
  });
});
