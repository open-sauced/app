// User defined type definitions. Please add type definitions for global types here

interface DbRepo {
  readonly id: string,
  readonly size: number,
  readonly stars: number,
  readonly name: string;
  readonly owner: string;
  readonly prActiveCount: number;
  readonly openPrsCount?: number;
  readonly mergedPrsCount?: number;
  readonly closedPrsCount?: number;
  readonly draftPrsCount?: number;
  readonly churnTotalCount?: number;
  readonly churnDirection?: string;
  readonly amount?: string;
  readonly churn?: string;
  readonly spamPrsCount?: number;
  readonly prVelocityCount?: number;
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
  readonly linesCount: number;
  readonly merged: boolean;
  readonly repo_owner: string;
  readonly repo_name: string;
  readonly number: number;
}

interface DbRepoCommit {
  readonly title: string;
  readonly commit_time: string;
}

interface Meta {
  readonly itemCount: number,
  readonly limit: number,
  readonly page: number,
  readonly pageCount: number,
  readonly hasNextPage: boolean,
  readonly hasPreviousPage: boolean
}

interface DbContribution {
  readonly id: number;
  readonly commits: string,
  readonly commit_days: string,
  readonly files_modified: string,
  readonly first_commit_time: string,
  readonly last_commit_time: string,
  readonly email: string,
  readonly name: string,
  readonly host_login: string,
  readonly langs: string,
  readonly recent_repo_list: string;
  readonly recent_pr_total: number;
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

interface DbUserInsight {
  readonly id: number;
  readonly user_id: number;
  readonly name: string;
  readonly is_public: boolean;
  readonly is_favorite: boolean;
  readonly short_code: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly repos: DbUserInsightRepo[]
}

interface DbUserInsightRepo {
  readonly id: number;
  readonly insight_id: number;
  readonly repo_id: number;
  readonly created_at: string;
}
