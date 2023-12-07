import { getBlogDetails, isValidBlogUrl } from "lib/utils/dev-to";

describe("[lib] dev-to methods", () => {
  it("Should return the title and markdown", async () => {
    const result = await getBlogDetails(
      "https://dev.to/opensauced/how-open-source-helped-me-get-a-github-octernship-4f69"
    );
    expect(result).toEqual({
      title: "How Open Source helped me get into the GitHub Octernships program.",
      markdown: expect.stringContaining("Thanks to OpenSauced"),
    });
  });

  it("Should return false", () => {
    const result = isValidBlogUrl("https://gitub.com/open-sauced/hot/pull/448");
    expect(result).toEqual(false);
  });
  it("Should return true", () => {
    const result = isValidBlogUrl("https://dev.to/opensauced/how-open-source-helped-me-get-a-github-octernship-4f69");
    expect(result).toEqual(true);
  });
});
