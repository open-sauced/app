import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import ListPageLayout from "layouts/lists";
import { fetchApiData } from "helpers/fetchApiData";
import Error from "components/atoms/Error/Error";
import { convertToContributors, useContributorsList } from "lib/hooks/api/useContributorList";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";

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
      // pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken }),
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

const ContributorsListPage = ({ list, initialData, isError }: ContributorListPageProps) => {
  // create useIsOwner(list?.user_id, userId) once we're ready to implement this.
  const isOwner = false;
  const {
    isLoading,
    setPage,
    setLimit,
    setRange,
    range,
    data: { data: contributors, meta },
  } = useContributorsList({ listId: list?.id, initialData });

  return (
    <ListPageLayout list={list} numberOfContributors={meta.itemCount} isOwner={isOwner} setRange={setRange}>
      {isError ? (
        <Error errorMessage="Unable to load list of contributors" />
      ) : (
        <ContributorsList
          contributors={contributors}
          meta={meta}
          isLoading={isLoading}
          setPage={setPage}
          setLimit={setLimit}
          range={range}
        />
      )}
    </ListPageLayout>
  );
};

export default ContributorsListPage;
