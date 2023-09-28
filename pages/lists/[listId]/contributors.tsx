import useSWR, { Fetcher } from "swr";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import ListPageLayout from "layouts/lists";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import Pagination from "components/molecules/Pagination/pagination";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Error from "components/atoms/Error/Error";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

interface ContributorList {
  data: DBListContributor[];
  meta: Meta;
}

function convertToContributors(rawContributors: ContributorList["data"] = []): DbPRContributor[] {
  const contributors = rawContributors
    ? rawContributors.map((contributor) => {
        return {
          author_login: contributor.login,
          updated_at: contributor.created_at,
          user_id: contributor.id,
        };
      })
    : [];

  return contributors;
}

const useContributorsList = ({
  listId,
  initialData,
  initialPage = 1,
  defaultLimit = 10,
}: {
  listId: string;
  initialData?: {
    data: DbPRContributor[];
    meta: Meta;
  };
  initialPage?: number;
  defaultLimit?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(defaultLimit);
  const { data, error, mutate } = useSWR<any>(
    `lists/${listId}/contributors?page=${page}&limit=${limit}`,
    publicApiFetcher as Fetcher<ContributorList, Error>,
    {
      fallbackData: initialData,
    }
  );
  const contributors = convertToContributors(data?.data);

  return {
    setPage,
    setLimit,
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId } = ctx.params as { listId: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<ContributorList>({
      path: `lists/${listId}/contributors?limit=${limit}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
  ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const contributors = convertToContributors(data?.data);

  return {
    props: {
      list,
      initialData: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
      isError: error || contributorListError,
    },
  };
};

interface ContributorListPageProps {
  list?: DBList;
  initialData: {
    meta: Meta;
    data: DbPRContributor[];
  };
  isError: boolean;
}

type UserID = number | null | undefined;

function useIsOwner(listUserId: UserID, userId: UserID) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(listUserId === userId);
  }, [listUserId, userId]);

  return isOwner;
}

const ContributorsListPage = ({ list, initialData, isError }: ContributorListPageProps) => {
  const { userId } = useSupabaseAuth();
  const isOwner = useIsOwner(list?.user_id, userId);
  const {
    isLoading,
    setPage,
    data: { data: contributors, meta },
  } = useContributorsList({ listId: list?.id, initialData });

  return (
    <ListPageLayout list={list} numberOfContributors={meta.itemCount} isOwner={isOwner}>
      <div className="container flex flex-col gap-3">
        <h2>List Contributors</h2>
        {isError ? (
          <Error errorMessage="Unable to load list of contributors" />
        ) : (
          <div className="lg:min-w-[1150px] px-16 py-8">
            <ContributorListTableHeaders />
            <ContributorTable loading={isLoading} topic={"*"} contributors={contributors}></ContributorTable>
            <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
              <div>
                <div className="">
                  <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-4">
                  <Pagination
                    pages={[]}
                    hasNextPage={meta.hasNextPage}
                    hasPreviousPage={meta.hasPreviousPage}
                    totalPage={meta.pageCount}
                    page={meta.page}
                    onPageChange={function (page: number): void {
                      setPage(page);
                    }}
                    divisor={true}
                    goToPage
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ListPageLayout>
  );
};

export default ContributorsListPage;
