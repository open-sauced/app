import useSWR from "swr";

export interface GsDbRepo {
  readonly id: number;
  readonly default_branch_head_time: string;
  readonly size?: string;
  readonly stars: number;
  readonly host_id: number;
  readonly indexing_frequency?: string;
  readonly update_started_at?: string;
  readonly update_finished_at?: boolean;
  readonly update_synced_issues?: boolean;
  readonly update_synced_poms: boolean;
  readonly cloned_at: string;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly host_pushed_at?: string;
  readonly host_created_at?: string;
  readonly host_updated_at?: string;
  readonly host?: string;
  readonly owner?: string;
  readonly name?: string;
  readonly description?: string;
  readonly source_uri?: string;
  readonly owner_avatar?: string;
  readonly default_branch?: string;
  readonly default_branch_head?: string;
  readonly host_parent_repo?: string;
}

const useRepo = (id: string) => {
  const { data, error, mutate } = useSWR<GsDbRepo, Error>(`repos/${id}`);

  return {
    repo: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

const useRepoList = () => {
  const { data, error, mutate } = useSWR("repos/list");

  return {
    repoList: data || {data: []},
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepo, useRepoList};
