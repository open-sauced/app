import useSWR from "swr";

interface RepoData {
  id: number,
  default_branch_head_time: number,
  size: number,
  stars: number,
  host_id: number,
  indexing_frequency: number,
  update_started_at: number,
  update_finished_at: number,
  update_synced_issues: boolean,
  update_synced_poms: boolean,
  cloned_at: number,
  created_at: number,
  updated_at: number,
  host_pushed_at: Date,
  host_created_at: Date,
  host_updated_at: Date,
  host: string,
  owner: string,
  name: string,
  description: string,
  source_uri: string,
  owner_avatar: string,
  default_branch: string,
  default_branch_head: string,
  host_parent_repo: string
}

interface MetaData {
  page: number,
  limit: number,
  itemCount: number,
  pageCount: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
}

interface RepoListResponse {
  data: RepoData[];
  meta: MetaData;
}

const useRepositoriesList = () => {
  const { data, error, mutate } = useSWR<RepoListResponse>("repo/list");

  return {
    repoList: data || {data: []},
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoriesList};
