// User defined type definitions. Please add type definitions for global types here

interface DbRepo {
  readonly id: string;
  readonly host_id: string;
  readonly size: number;
  readonly stars: number;
  readonly issues: number;
  readonly full_name: string;
  readonly pr_active_count?: number;
  readonly open_prs_count?: number;
  readonly merged_prs_count?: number;
  readonly closed_prs_count?: number;
  readonly draft_prs_count?: number;
  readonly spam_prs_count?: number;
  readonly pr_velocity_count?: number;
  readonly churnTotalCount?: number;
  readonly language: string;
  readonly stars: number;
  readonly description: string;
}

interface DbRecommendedInsightsRepo {
  readonly id: string;
  readonly size: number;
  readonly stars: number;
  readonly issues: number;
  readonly full_name: string;
  readonly pr_active_count?: number;
  readonly open_prs_count?: number;
  readonly merged_prs_count?: number;
  readonly closed_prs_count?: number;
  readonly draft_prs_count?: number;
  readonly spam_prs_count?: number;
  readonly pr_velocity_count?: number;
  readonly churnTotalCount?: number;
  readonly language: string;
  readonly stars: number;
  readonly description: string;
  readonly forks: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly watchers: number;
  readonly url: string;
  readonly topics: string[];
  readonly pushed_at: string;
  readonly node_id: string;
  readonly name: string;
  readonly default_branch: string;
}

interface DBListContributor {
  readonly avatar_url: string;
  readonly id: number;
  readonly login: string;
  readonly name: string;
  readonly bio: string;
  readonly url: string;
  readonly company: string;
  readonly location: string;
  readonly twitter_username: string;
  readonly github_sponsors_url: string;
  readonly linkedin_url: string;
  readonly discord_url: string;
  readonly display_email: boolean;
  readonly display_local_time: boolean;
  readonly timezone: string;
  readonly interests: string;
  readonly first_opened_pr_at: string;
  readonly is_open_sauced_member: boolean;
  readonly is_onboarded: boolean;
  readonly is_waitlisted: boolean;
  readonly role: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly languages: Object;
  readonly public_gists: number;
  readonly public_repos: number;
  readonly receive_collaboration: boolean;
  readonly username: string;
}

interface DbRepoPREvents {
  readonly event_id: number;
  readonly pr_number: number;
  readonly pr_state: string;
  readonly pr_is_draft: bool;
  readonly pr_is_merged: bool;
  readonly pr_mergeable_state: string;
  readonly pr_is_rebaseable: bool;
  readonly pr_title: string;
  readonly pr_head_label: string;
  readonly pr_base_label: string;
  readonly pr_head_ref: string;
  readonly pr_base_ref: string;
  readonly pr_author_login: string;
  readonly pr_created_at: string;
  readonly pr_closed_at: string;
  readonly pr_merged_at: string;
  readonly pr_updated_at: string;
  readonly pr_comments: number;
  readonly pr_additions: number;
  readonly pr_deletions: number;
  readonly pr_changed_files: number;
  readonly repo_name: string;
  readonly pr_commits: number;
  linesCount: number;
}

interface DbPRContributor {
  readonly author_login: string;
  readonly username: string;
  readonly updated_at: string;
  readonly user_id: number;
}

interface DbFollowUser {
  readonly id: number;
  readonly user_id: number;
  readonly following_user_id: number;
  readonly created_at: string;
  readonly updated_at: string;
}

interface DbRepoCommit {
  readonly title: string;
  readonly commit_time: string;
}

interface Meta {
  readonly itemCount: number;
  readonly limit: number;
  readonly page: number;
  readonly pageCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

interface DbContribution {
  readonly id: number;
  readonly commits: string;
  readonly commit_days: string;
  readonly files_modified: string;
  readonly first_commit_time: string;
  readonly last_commit_time: string;
  readonly email: string;
  readonly name: string;
  readonly host_login: string;
  readonly langs: string;
  readonly recent_repo_list: string;
  readonly recent_pr_total: number;
  readonly recent_contribution_count: number;
  readonly recent_opened_prs: number;
  readonly recent_pr_reviews: number;
  readonly recent_pr_velocity: number;
  readonly recent_merged_prs: number;
}

interface DbInsight {
  readonly id: number;
  readonly interval: number;
  readonly day: string;
  readonly all_prs: number;
  readonly accepted_prs: number;
  readonly spam_prs: number;
  readonly all_authors: number;
  readonly spam_authors: number;
  readonly accepted_authors: number;
  readonly all_repos: number;
  readonly spam_repos: number;
  readonly accepted_repos: number;
  readonly all_contributors: number;
  readonly spam_contributors: number;
  readonly accepted_contributors: number;
  readonly all_repo_total: number;
  readonly spam_repo_total: number;
  readonly accepted_repo_total: number;
}

interface DbInsightMember {
  readonly id: string;
  readonly insight_id: number;
  readonly user_id: number;
  readonly name: string;
  readonly access: "pending" | "admin" | "edit" | "view";
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
  readonly invitation_emailed_at: string;
  readonly invitation_email: string;
}
interface DbUserInsight {
  readonly id: number;
  readonly name: string;
  readonly is_public: boolean;
  readonly is_favorite: boolean;
  readonly is_featured: boolean;
  readonly short_code: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly repos: DbUserInsightRepo[];
  readonly members: DbInsightMember[];
}

interface DbUserInsightRepo {
  readonly id: number;
  readonly insight_id: number;
  readonly repo_id: number;
  readonly full_name: string;
  readonly created_at?: string;
}

interface DbUser {
  readonly email: string;
  readonly id: number;
  readonly open_issues: number;
  readonly is_private: boolean;
  readonly is_open_sauced_member: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly login: string;
  readonly is_onboarded: boolean;
  readonly is_waitlisted: boolean;
  readonly role: number;
  readonly bio: string;
  readonly url: string;
  readonly twitter_username: string;
  readonly company: string;
  readonly location: string;
  readonly display_local_time: boolean;
  readonly name: string;
  readonly interests: string;
  readonly receive_collaboration: boolean;
  readonly display_email: boolean;
  readonly timezone: string;
  readonly github_sponsors_url: string;
  readonly linkedin_url: string;
  readonly discord_url: string;
  readonly notification_count: number;
  readonly insights_count: number;
  readonly languages: { [lang]: number };
  readonly first_opened_pr_at: string;
  readonly followers_count: number;
  readonly following_count: number;
  readonly highlights_count: number;
  readonly is_maintainer: boolean;
  readonly coupon_code: string;
  readonly receive_product_updates: boolean;
}

interface DbHighlight {
  readonly id: string;
  readonly user_id: string;
  readonly url: string;
  readonly title: string;
  readonly highlight: string;
  readonly pinned: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
  readonly name: string;
  readonly login: string;
  readonly shipped_at: string;
  readonly type: "issue" | "pull_request";
  readonly tagged_repos: string[];
}

interface SEOobject {
  title?: string;
  description?: string;
  image?: string;
  twitterCard?: string;
  noindex?: boolean;
}

interface GhUser {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly gravatar_id: string;
  readonly url: string;
  readonly repos_url: string;
}

interface GhPRInfoResponse {
  readonly head: { repo: { name: string; full_name: string }; user: { login: string; full_name: string } };
  readonly title: string;
  readonly number: number;
  readonly comments: number;
  readonly user: GhUser;
  readonly created_at: string;
}

interface DbEmojis {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly display_order: number;
  readonly created_at: string;
  readonly updated_at: string;
}

interface DbUserNotification {
  readonly id: string;
  readonly message: string;
  readonly type: "highlight_reaction" | "follow";
  readonly from_user_id: number;
  readonly notified_at: string;
  readonly user_id: number;
  readonly meta_id: string;
  readonly from_user: DbUser;
}

interface DbUserConnection {
  readonly id: string;
  readonly user_id: number;
  readonly request_user_id: number;
  readonly request_user: DbUser;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
  readonly request_emailed_at: string;
  readonly collaboration_emailed_at: string;
  readonly status: "pending" | "accept" | "reject";
  readonly message: string;
}

interface DbListOwner {
  readonly id: number;
  readonly login: string;
  readonly name: string;
}

interface DbListContributor {
  readonly id: string;
  readonly list_id: string;
  readonly user_id: string;
  readonly login: string;
  readonly created_at: string;
  readonly username: string;
}

interface DbUserList {
  readonly id: string;
  readonly user: DbListOwner;
  readonly name: string;
  readonly is_public: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

interface DBList {
  id: string;
  user_id: number;
  name: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface PagedData<T> {
  data?: T[];
  meta: Meta;
}

interface DbListContributorStat {
  login: string;
  commits: number;
  prsCreated: number;
}

interface DbProjectContributions {
  repo_name: string;
  commits: number;
  prs_created: number;
  issues_created: number;
  commit_comments: number;
  issue_comments: number;
  pr_review_comments: number;
  comments: number;
  total_contributions: number;
}

interface DBProjectContributor {
  login: string;
  commits: number;
  prs_created: number;
  prs_reviewed: number;
  issues_created: number;
  commit_comments: number;
  issue_comments: number;
  pr_review_comments: number;
  comments: number;
  total_contributions: number;
}

interface DbUserOrganization {
  id: number;
  user_id: number;
  organization_id: number;
  user: DbUser;
  organization_user: DbUser;
}

interface GhOrgTeam {
  id: number;
  name: string;
  slug: string;
}

interface GhOrgTeamMember {
  id: number;
  login: string;
}
