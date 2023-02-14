import { getAvatarById, getAvatarByUsername, getProfileLink, getRepoIssuesLink } from "lib/utils/github";

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

});
