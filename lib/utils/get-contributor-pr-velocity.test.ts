import getContributorPullRequestVelocity from "lib/utils/get-contributor-pr-velocity";

const data = [
  {
    event_id: 1315260200,
    pr_number: 3093,
    pr_state: "merged",
    pr_is_draft: false,
    pr_is_merged: true,
    pr_mergeable_state: "unstable",
    pr_is_rebaseable: false,
    pr_title: "fix(@nguniversal/express-engine): export default bootstrap in server template for standalone apps",
    pr_head_label: "brandonroberts:fix-standalone-prerender",
    pr_base_label: "angular:main",
    pr_head_ref: "feat-generate-pr-description",
    pr_base_ref: "beta",
    pr_author_login: "brandonroberts",
    pr_created_at: "2023-04-15T21:55:37.000Z",
    pr_closed_at: "2023-04-18T12:22:18.000Z",
    pr_merged_at: "2023-04-18T12:22:18.000Z",
    pr_updated_at: "2023-05-19T00:09:53.000Z",
    pr_comments: 1,
    pr_additions: 1,
    pr_deletions: 1,
    pr_changed_files: 1,
    repo_name: "angular/universal",
    pr_commits: 1,
    linesCount: 1,
  },
  {
    event_id: 1356191185,
    pr_number: 168,
    pr_state: "merged",
    pr_is_draft: false,
    pr_is_merged: true,
    pr_mergeable_state: "dirty",
    pr_is_rebaseable: false,
    pr_title: "feat: add endpoint to generate pull request description",
    pr_head_label: "brandonroberts:feat-generate-pr-description",
    pr_base_label: "open-sauced:beta",
    pr_head_ref: "feat-generate-pr-description",
    pr_base_ref: "beta",
    pr_author_login: "brandonroberts",
    pr_created_at: "2023-05-18T19:40:00.000Z",
    pr_closed_at: "2023-05-18T20:01:40.000Z",
    pr_merged_at: "2023-05-18T20:01:40.000Z",
    pr_updated_at: "2023-05-18T20:17:52.000Z",
    pr_comments: 3,
    pr_additions: 184,
    pr_deletions: 3,
    pr_changed_files: 7,
    repo_name: "open-sauced/api.opensauced.pizza",
    pr_commits: 2,
    linesCount: 123,
  },
] as DbRepoPREvents[];

describe("[lib] getContributorPullRequestVelocity()", () => {
  it("should return the average velocity", () => {
    const result = getContributorPullRequestVelocity(data);

    expect(result).toEqual(1);
  });

  it("should return undefined if no records are provided", () => {
    const result = getContributorPullRequestVelocity([]);

    expect(result).toBeUndefined();
  });
});
