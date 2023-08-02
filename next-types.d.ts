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

interface DbRepoPR {
  readonly title: string;
  readonly author_login: string;
  readonly state: string;
  readonly created_at: string;
  readonly closed_at: string;
  readonly merged_at: string;
  readonly updated_at: string;
  readonly filesCount: number;
  linesCount: number;
  readonly merged: boolean;
  readonly draft: boolean;
  readonly full_name: string;
  readonly number: number;
  readonly additions: number;
  readonly deletions: number;
  readonly changed_files: number;
  readonly repo_id: number;
  readonly last_updated_at: string;
}

interface DbPRContributor {
  readonly author_login: string;
  readonly updated_at: string;
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
  readonly user_id: number;
  readonly user: DbUser;
  readonly name: string;
  readonly is_public: boolean;
  readonly is_favorite: boolean;
  readonly short_code: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly repos: DbUserInsightRepo[];
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
  readonly languages: { [lang]: number };
  readonly first_opened_pr_at: string;
  readonly followers_count: number;
  readonly following_count: number;
  readonly highlights_count: number;
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
}

interface DbUserCollaboration {
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
