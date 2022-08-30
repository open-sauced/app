// User defined type definitions. Please add type definitions for global types here

interface RepoData {
  readonly id: number,
  readonly default_branch_head_time: number,
  readonly size: number,
  readonly stars: number,
  readonly host_id: number,
  readonly indexing_frequency: number,
  readonly update_started_at: number,
  readonly update_finished_at: number,
  readonly update_synced_issues: boolean,
  readonly update_synced_poms: boolean,
  readonly cloned_at: number,
  readonly created_at: number,
  readonly updated_at: number,
  readonly host_pushed_at: Date,
  readonly host_created_at: Date,
  readonly host_updated_at: Date,
  readonly host: string,
  readonly owner: string,
  readonly name: string,
  readonly description: string,
  readonly source_uri: string,
  readonly owner_avatar: string,
  readonly default_branch: string,
  readonly default_branch_head: string,
  readonly host_parent_repo: string
}

interface MetaData {
  readonly page: number,
  readonly limit: number,
  readonly itemCount: number,
  readonly pageCount: number,
  readonly hasPreviousPage: boolean,
  readonly hasNextPage: boolean
}

interface RepoListResponse {
  readonly data?: RepoData[];
  readonly meta: MetaData;
}