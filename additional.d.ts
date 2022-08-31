// User defined type definitions. Please add type definitions for global types here

interface DBRepo {
  readonly size: number,
  readonly stars: number,
  readonly name: string
}

interface Meta {
  readonly page: number,
  readonly limit: number,
  readonly itemCount: number,
  readonly pageCount: number,
  readonly hasPreviousPage: boolean,
  readonly hasNextPage: boolean
}

interface useRepoList {
  readonly data: DBRepo[];
  readonly meta: Meta;
}