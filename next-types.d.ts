// User defined type definitions. Please add type definitions for global types here

interface DbRepo {
  readonly id: string,
  readonly size: number,
  readonly stars: number,
  readonly name: string
}

interface DbRepoPR {
  readonly title: string;
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
  readonly repo_list: string
}
