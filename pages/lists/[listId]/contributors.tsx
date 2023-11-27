import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

import ListPageLayout from "layouts/lists";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Error from "components/atoms/Error/Error";
import { convertToContributors, useContributorsList } from "lib/hooks/api/useContributorList";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";
import { FilterParams } from "./activity";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId, limit: rawLimit, range } = ctx.params as FilterParams;

  const limit = rawLimit ?? "10"; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=${limit}&range=${range ?? "30"}`,
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

  const {
    isLoading,
    setPage,
    data: { data: contributors, meta },
  } = useContributorsList({
    listId: list?.id,
    initialData,
    defaultRange: range ? (range as string) : "30",
    defaultLimit: limit ? (limit as unknown as number) : 10,
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
          range={String(range) ?? "30"}
        />
      )}
    </ListPageLayout>
  );
};

export default ContributorsListPage;
