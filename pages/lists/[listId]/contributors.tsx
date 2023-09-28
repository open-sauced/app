import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import ListPageLayout from "layouts/lists";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import Pagination from "components/molecules/Pagination/pagination";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Error from "components/atoms/Error/Error";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { convertToContributors, useContributorsList } from "lib/hooks/api/useContributorList";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId } = ctx.params as { listId: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
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

const ContributorsListPage = ({ list, initialData, isError }: ContributorListPageProps) => {
  const { userId } = useSupabaseAuth();
  // create useIsOwner(list?.user_id, userId) once we're ready to implement this.
  const isOwner = false;
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
