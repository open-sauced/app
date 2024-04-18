import { getTopContributorLanguages } from "lib/utils/contributor-utils";

describe("contributor utilities", () => {
  describe("getTopContributorLanguages()", () => {
    const baseUser = Object.freeze({
      email: "user@example.com",
      id: 12345,
      open_issues: 5,
      is_private: false,
      is_open_sauced_member: true,
      created_at: "2023-01-01",
      updated_at: "2023-12-31",
      login: "dbuser123",
      is_onboarded: true,
      is_waitlisted: false,
      role: 1,
      bio: "A software developer",
      url: "https://example.com/dbuser123",
      twitter_username: "dbuser_twitter",
      company: "Tech Inc.",
      location: "City, Country",
      display_local_time: true,
      name: "DB User",
      receive_collaboration: true,
      display_email: true,
      timezone: "UTC",
      github_sponsors_url: "https://github.com/sponsors/dbuser123",
      linkedin_url: "https://www.linkedin.com/in/dbuser123",
      discord_url: "https://discordapp.com/user/dbuser123",
      notification_count: 10,
      insights_count: 20,
      first_opened_pr_at: "2022-06-15",
      followers_count: 1000,
      following_count: 500,
      highlights_count: 50,
      is_maintainer: true,
      coupon_code: "DBUSER10",
      receive_product_updates: true,
      interests: "Ultimate Frisbee, Hiking, Biking, C++",
    });

    it("should get the top two languages in alpabetical order", () => {
      const user = Object.assign({}, baseUser, {
        languages: {
          javascript: 1,
          typescript: 2,
          python: 3,
          rust: 4,
          go: 5,
        },
      }) satisfies DbUser;

      expect(getTopContributorLanguages(user)).toEqual(["go", "rust"]);
    });

    it("should get no languages when there are no languages", () => {
      const user = Object.assign({}, baseUser, {
        languages: {},
      }) satisfies DbUser;

      expect(getTopContributorLanguages(user)).toEqual([]);
    });
  });
});
