// User defined type definitions. Please add type definitions for global types here

interface DbRepo {
  readonly id: string,
  readonly size: number,
  readonly stars: number,
  readonly name: string
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
  protected linesCount: number;
  readonly merged: boolean;
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
}