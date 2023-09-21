import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import ListPageLayout from "layouts/lists";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";

interface ContributorList {
  data: {
    user_id: string;
    created_at: string;
  }[];
  meta: unknown;
}

const useContributorsList = (listId: string) => {
  const { data, error, mutate } = useSWR<ContributorList>(
    `lists/${listId}/contributors`,
    publicApiFetcher as Fetcher<ContributorList, Error>
  );

  const contributors: DbPRContributor[] = data
    ? data.data?.map((contributor) => {
        return {
          author_login: contributor.user_id,
          updated_at: contributor.created_at,
        };
      })
    : [];

  return {
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
const ContributorsList = () => {
  const router = useRouter();
  const { listId } = router.query as { listId: string };
  const { data, isError, isLoading } = useContributorsList(listId);

  // TODO: Is this topic fine or can it be an empty string?
  return (
    <div className="container flex flex-col gap-3">
      <h2>List Contributors</h2>
      {isError ? (
        <div>error</div>
      ) : (
        <ContributorTable contributors={data.data} topic="contributorList" loading={isLoading} />
      )}
    </div>
  );
};

ContributorsList.PageLayout = ListPageLayout;
export default ContributorsList;
