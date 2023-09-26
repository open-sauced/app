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

function convertToContributors(rawContributors: ContributorList["data"] = []) {
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

const useContributorsList = (listId: string) => {
  const { data, error, mutate } = useSWR<ContributorList>(
    `lists/${listId}/contributors`,
    publicApiFetcher as Fetcher<ContributorList, Error>
  );
  const contributors = convertToContributors(data?.data);

  return {
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
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<ContributorList>({
      path: `lists/${listId}/contributors`,
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
      data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
      isLoading: false,
      isError: error || contributorListError,
    },
  };
};

interface ContributorListPageProps {
  list: DBList;
  data: {
    meta: Meta;
    data: DBListContributor[];
  };
  isLoading: boolean;
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

const ContributorsListPage = ({ list, data, isLoading, isError }: ContributorListPageProps) => {
  const { userId } = useSupabaseAuth();
  const [pageData, setPageData] = useState<ContributorListPageProps["data"]>(data);

  // TODO: use this when going through paged data
  // const { data, isError, isLoading } = useContributorsList(list.id);
  const { meta, data: contributors } = pageData;
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);

  // TODO: read from querystring or default to 1
  const [page, setPage] = useState(1);
  const isOwner = useIsOwner(list?.user_id, userId);

  function handleOnSelectAllChecked(contributor: any): void {}

  function handleOnSelectChecked(state: boolean, contributor: DbPRContributor): void {}

  return (
    <ListPageLayout list={list} numberOfContributors={meta.itemCount} isOwner={isOwner}>
      <div className="container flex flex-col gap-3">
        <h2>List Contributors</h2>
        {isError ? (
          <Error errorMessage="Unable to load list of contributors" />
        ) : (
          <div className="lg:min-w-[1150px] px-16 py-8">
            <ContributorListTableHeaders
              selected={selectedContributors.length === meta.limit}
              handleOnSelectAllContributor={handleOnSelectAllChecked}
            />
            <ContributorTable
              loading={isLoading}
              selectedContributors={selectedContributors}
              topic={"*"}
              handleSelectContributors={handleOnSelectChecked}
              contributors={contributors as DbPRContributor[]}
            ></ContributorTable>
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
