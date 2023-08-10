import {
  getAvatarById,
  getAvatarByUsername,
  getProfileLink,
  getRepoIssuesLink,
  generateGhOgImage,
  generateRepoParts,
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
  it("Should return an object with valid org name, repo name and issue", () => {
    const result = generateRepoParts("https://github.com/open-sauced/insights/pull/1470");
    expect(result.isValidUrl).toEqual(true);
    expect(result.apiPaths).toEqual({
      orgName: "open-sauced",
      repoName: "insights",
      repoFullName: "open-sauced/insights",
      issueId: "1470",
    });
  });
  it("Should return an object with valid org name, repo name and issue", () => {
    const result = generateRepoParts("github.com/open-sauced/insights/pull/1470");
    expect(result.isValidUrl).toEqual(true);
    expect(result.apiPaths).toEqual({
      orgName: "open-sauced",
      repoName: "insights",
      repoFullName: "open-sauced/insights",
      issueId: "1470",
    });
  });
  it("Should return an object with a valid org name and repo name", () => {
    const result = generateRepoParts("https://github.com/open-sauced/insights");
    expect(result.isValidUrl).toEqual(true);
    expect(result.apiPaths).toEqual({
      orgName: "open-sauced",
      repoName: "insights",
      repoFullName: "open-sauced/insights",
      issueId: null,
    });
  });
  it("Should return an object with a valid org name and repo name", () => {
    const result = generateRepoParts("open-sauced/insights");
    expect(result.isValidUrl).toEqual(true);
    expect(result.apiPaths).toEqual({
      orgName: "open-sauced",
      repoName: "insights",
      repoFullName: "open-sauced/insights",
      issueId: null,
    });
  });
  it("Should return an object with isValidUrl set to false", () => {
    const result = generateRepoParts("https://insights.opensauced.pizza/hub/insights/new");
    expect(result.isValidUrl).toBeFalsy();
  });
  it("Should return an object with isValidUrl set to false", () => {
    const result = generateRepoParts("🍕");
    expect(result.isValidUrl).toBeFalsy();
  });
});
