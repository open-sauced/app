// User defined type definitions. Please add type definitions for global types here

interface DBRepo {
  readonly size: number,
  readonly stars: number,
  readonly name: string
}

interface Meta {
  readonly itemCount: number,
}

interface useRepoList {
  readonly data: DBRepo[];
  readonly meta: Meta;
}