// User defined type definitions. Please add type definitions for global types here

// Thanks Chance Strickland!
// https://www.linkedin.com/feed/update/urn:li:activity:7163544802427437056/
declare module React {
  export interface CSSProperties extends CSS.Properties<string | number> {
    [key: `--${string}`]: string | number;
  }
}

interface DbRepoInfo {
  readonly id: number;
  readonly size: number;
  readonly issues: number;
  readonly stars: number;
  readonly forks: number;
  readonly watchers: number;
  readonly subscribers: number;
  readonly network: number;
  readonly is_fork: boolean;
  readonly is_private: boolean;
  readonly is_template: boolean;
  readonly is_archived: boolean;
  readonly is_disabled: boolean;
  readonly has_issues: boolean;
  readonly has_projects: boolean;
  readonly has_downloads: boolean;
  readonly has_wiki: boolean;
  readonly has_pages: boolean;
  readonly has_discussions: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly pushed_at: string;
  readonly default_branch: string;
  readonly node_id: string;
  readonly git_url: string;
  readonly ssh_url: string;
  readonly clone_url: string;
  readonly svn_url: string;
  readonly mirror_url: string;
  readonly name: string;
  readonly full_name: string;
  readonly description: string;
  readonly language: string;
  readonly license: string;
  readonly pushed_at: string;
  readonly url: string;
  readonly homepage: string;
  readonly topics: string[];
}

interface DbRepo {
  readonly id: string;
  readonly host_id: string;
  readonly size: number;
  readonly stars: number;
  readonly forks: number;
  readonly issues: number;
  readonly full_name: string;
  readonly url: string;
  readonly pr_active_count?: number;
  readonly open_prs_count?: number;
  readonly merged_prs_count?: number;
  readonly closed_prs_count?: number;
  readonly draft_prs_count?: number;
  readonly spam_prs_count?: number;
  readonly pr_velocity_count?: number;
  readonly opened_issues_count?: number;
  readonly closed_issues_count?: number;
  readonly issues_velocity_count?: number;
  readonly churnTotalCount?: number;
  readonly activity_ratio?: number;
  readonly contributor_confidence?: number;
  readonly language: string;
  readonly stars: number;
  readonly description: string;
  readonly license?: string;
  readonly updated_at?: string;
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
  readonly oscr: number;
}

interface DbRepoPREvents {
  readonly event_id: number;
  readonly pr_number: number;
  readonly pr_state: "open" | "closed";
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

interface DbRepoIssueEvents {
  readonly event_id: number;
  readonly id: string;
  readonly issue_number: number;
  readonly issue_state: "open" | "closed" | "reopened";
  readonly issue_title: string;
  readonly issue_body: string;
  readonly issue_author_login: string;
  readonly issue_created_at: string;
  readonly issue_closed_at: string;
  readonly issue_updated_at: string;
  readonly issue_comments: string;
  readonly repo_name: string;
  readonly issue_reactions_plus_one: number;
  readonly issue_reactions_minus_one: number;
  readonly issue_reactions_laugh: number;
  readonly issue_reactions_hooray: number;
  readonly issue_reactions_confused: number;
  readonly issue_reactions_heart: number;
  readonly issue_reactions_rocket: number;
  readonly issue_reactions_eyes: number;
}

interface DbIssueComment {
  readonly event_id: number;
  readonly actor_login: string;
  readonly event_time: string;
  readonly repo_name: string;
  readonly comment_body: string;
  readonly comment_html_url: string;
}

interface DbPRContributor {
  readonly author_login: string;
  readonly oscr?: number;
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

type WorkspaceMemberRole = "owner" | "editor" | "viewer";

interface DbWorkspaceMember {
  readonly id: string;
  readonly user_id: number;
  readonly workspace_id: string;
  readonly role: WorkspaceMemberRole;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
}

type DbUserInsightWorkspace = Workspace & { workspace_id: string };

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
  readonly workspaces?: DbUserInsightWorkspace;
}

interface DbWorkspaceRepositoryInsight {
  readonly id: number;
  readonly name: string;
  readonly is_public: boolean;
  readonly is_favorite: boolean;
  readonly is_featured: boolean;
  readonly short_code: string;
  readonly created_at: string;
  readonly updated_at: string;
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
  readonly languages: { [lang: string]: number };
  readonly first_opened_pr_at: string;
  readonly followers_count: number;
  readonly following_count: number;
  readonly highlights_count: number;
  readonly is_maintainer: boolean;
  readonly coupon_code: string;
  readonly receive_product_updates: boolean;
  readonly personal_workspace_id: string;
  readonly oscr: number;
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

interface GhRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: GhUser;
}

interface GhOrg {
  id: number;
  name: string;
  full_name: string;
  pushed_at: string;
  private: boolean;
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

type UserListWorkspace = Workspace & { workspace_id: string };

interface DbUserList {
  readonly id: string;
  readonly user: DbListOwner;
  readonly name: string;
  readonly is_public: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly workspaces?: UserListWorkspace;
}

interface DbWorkspaceContributorInsight {
  readonly id: string;
  readonly user_id: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string;
  readonly name: string;
  readonly is_public: boolean;
  readonly is_featured: boolean;
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
  prs_created: number;
  issues_created: number;
  commit_comments: number;
  issue_comments: number;
  pr_review_comments: number;
  comments: number;
  total_contributions: number;
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

interface DbPullRequestGitHubEventsHistogram {
  bucket: string;
  interval: number;
  prs_count: number;
  accepted_prs: number;
  open_prs: number;
  closed_prs: number;
  draft_prs: number;
  active_prs: number;
  spam_prs: number;
  pr_velocity: number;
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  is_public: boolean;
  payee_user_id: string | null;
  members: WorkspaceMember[];
  exceeds_upgrade_limits: boolean;
}

interface WorkspaceMember {
  id: string;
  user_id: number;
  role: string;
  member: DbUser;
}

interface DbWorkspacesReposStats {
  pull_requests: {
    opened: number;
    merged: number;
    velocity: number;
  };
  issues: {
    opened: number;
    closed: number;
    velocity: number;
  };
  repos: {
    stars: number;
    forks: number;
    activity_ratio: number;
  };
}

type LottoFactor = "very-high" | "high" | "moderate" | "low";

interface ContributorLottoFactor {
  contributor: string;
  count: number;
  percent_of_total: number;
  lotto_factor: LottoFactor;
}

interface RepositoryLottoFactor {
  all_contribs: ContributorLottoFactor[];
  all_lotto_factor: LottoFactor;
}

interface RepositoryRoss {
  ross: { bucket: string; index: number }[];
  contributors: {
    bucket: string;
    new: number;
    recurring: number;
    internal: number;
  }[];
}

interface RepositoryYolo {
  num_yolo_pushes: number;
  num_yolo_pushed_commits: number;
  data: {
    actor_login: string;
    event_time: string;
    sha: string;
    push_num_commits: number;
  }[];
}

// sourced from open-sauced/api

type ThreadHistoryItem = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  type: string;
  message: string;
  is_error: boolean;
  error: string | null;
  actor: string;
  mood: number;
  starsearch_thread_id: string;
};

interface StarSearchThread {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  archived_at: string | null;
  thread_summary: string | null;
  is_publicly_viewable: boolean;
  public_link: string | null;
  thread_history: ThreadHistoryItem[];
}

type StarSearchEvent = "content" | "final" | "function_call" | "user_prompt";
type StarSearchPayloadStatus = "in_progress" | "done";

interface StarSearchContent {
  type: StarSearchEvent;
  parts: string[];
}

interface StarSearchError {
  type: string;
  message: string;
}

interface StarSearchPayload {
  id?: string;
  author?: string;
  iso_time: string;
  content: StarSearchContent;
  status: StarSearchPayloadStatus;
  error?: StarSearchError;
}
