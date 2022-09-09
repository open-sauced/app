// User defined type definitions. Please add type definitions for global types here

interface DbRepo {
  readonly size: number,
  readonly stars: number,
  readonly name: string
}

interface Meta {
  readonly itemCount: number,
}

interface DbContributions {
  readonly commits: string,
  readonly commit_days: string,
  readonly files_modified: string,
  readonly first_commit_time: string,
  readonly last_commit_time: string,
  readonly email: string,
  readonly name: string,
  readonly langs: string
}