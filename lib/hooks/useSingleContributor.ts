import useSWR from "swr";


interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}
