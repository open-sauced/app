import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

import { ErrorBoundary } from "react-error-boundary";
import ListPageLayout from "layouts/lists";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Error from "components/atoms/Error/Error";
import { useContributorsList } from "lib/hooks/api/useContributorList";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";
import { FilterParams } from "./activity";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId } = ctx.params as FilterParams;

  const { data: list, error } = await fetchApiData<DBList>({
    path: `lists/${listId}`,
    bearerToken,
    pathValidator: validateListPath,
  });

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);

  return {
    props: {
      list,
      isError: error,
      isOwner: list && list.user_id === userId,
    },
  };
};

interface ContributorListPageProps {
  list?: DBList;
  isError: boolean;
  isOwner: boolean;
}

const ContributorsListPage = ({ list, isError, isOwner }: ContributorListPageProps) => {
  const router = useRouter();
  const { range, limit } = router.query;

  const {
    isLoading,
    setPage,
    data: { data: contributors, meta },
  } = useContributorsList({
    listId: list?.id,
    defaultRange: range ? (range as string) : "30",
    defaultLimit: limit ? (limit as unknown as number) : 10,
  });

  return (
    <ListPageLayout list={list} numberOfContributors={meta.itemCount} isOwner={isOwner}>
      {isError ? (
        <Error errorMessage="Unable to load list of contributors" />
      ) : (
        <ErrorBoundary
          fallback={<div className="grid place-content-center">Error loading the list of contributors</div>}
        >
          <ContributorsList
            contributors={contributors}
            meta={meta}
            isLoading={isLoading}
            setPage={setPage}
            range={String(range) ?? "30"}
          />
        </ErrorBoundary>
      )}
    </ListPageLayout>
  );
};

export default ContributorsListPage;
