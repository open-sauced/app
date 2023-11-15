import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ListPageLayout from "layouts/lists";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Error from "components/atoms/Error/Error";
import { convertToContributors, useContributorsList } from "lib/hooks/api/useContributorList";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";
import { setQueryParams } from "lib/utils/query-params";
import { ServerFilterParams } from "./activity";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId, limit: rawLimit, range } = ctx.params as ServerFilterParams;
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
  const userId = Number(session?.user.user_metadata.sub);

  return {
    props: {
      list,
      initialData: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
      isError: error || contributorListError,
      isOwner: list && list.user_id === userId,
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
  isOwner: boolean;
}

const ContributorsListPage = ({ list, initialData, isError, isOwner }: ContributorListPageProps) => {
  const router = useRouter();
  const { range, limit } = router.query;

  useEffect(() => {
    if (!range) {
      setQueryParams({ range: "30" });
    }
  }, [range]);
  const {
    isLoading,
    setPage,
    data: { data: contributors, meta },
  } = useContributorsList({
    listId: list?.id,
    initialData,
    defaultRange: range as string,
    defaultLimit: limit as string,
  });

  return (
    <ListPageLayout list={list} numberOfContributors={meta.itemCount} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list of contributors" />
      ) : (
        <ContributorsList
          contributors={contributors}
          meta={meta}
          isLoading={isLoading}
          setPage={setPage}
          range={range as string}
        />
      )}
    </ListPageLayout>
  );
};

export default ContributorsListPage;
