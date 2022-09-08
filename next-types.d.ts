// User defined type definitions. Please add type definitions for global types here

interface DBRepo {
  readonly size: number,
  readonly stars: number,
  readonly name: string
}

interface Meta {
  readonly itemCount: number,
}

interface DBContributions {
  commits: number,
  commit_days: number,
  files_modified: number,
  updated_at: number,
  email: string,
  name: string,
  langs: string
}