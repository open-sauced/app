import React, { useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import Pagination from "components/molecules/Pagination/pagination";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Title from "components/atoms/Typography/title";
import ListCard from "components/molecules/ListCard/list-card";
import { useToast } from "lib/hooks/useToast";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { useWorkspacesContributorInsights } from "lib/hooks/api/useWorkspaceContributorInsights";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import Button from "components/shared/Button/button";
import { deleteWorkspaceContributorInsight } from "lib/utils/workspace-utils";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    bearerToken,
    pathValidator: () => true,
  });

  if (error) {
    deleteCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME });

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  setCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME, value: workspaceId });

  return {
    props: {
      workspace: data,
    },
  };
};

// lazy import DeleteListPageModal component to optimize bundle size they don't load on initial render
const DeleteListPageModal = dynamic(() => import("components/organisms/ListPage/DeleteListPageModal"));

const ListsHub = ({ workspace }: { workspace: Workspace }) => {
  const { sessionToken, user } = useSupabaseAuth();
  const { data, isLoading, meta, setPage, mutate } = useWorkspacesContributorInsights({ workspaceId: workspace.id });
  const { toast } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [listNameToDelete, setListNameToDelete] = useState("");
  const [listIdToDelete, setListIdToDelete] = useState("");

  const deleteInsight = async () => {
    setDeleteLoading(true);

    const { error: deleteError } = await deleteWorkspaceContributorInsight({
      workspaceId: workspace.id,
      bearerToken: sessionToken!,
      listId: listIdToDelete,
    });

    if (deleteError) {
      toast({ description: "An error has occurred. Try again.", variant: "danger" });
      setDeleteLoading(false);
      return;
    }

    toast({ description: "Insight deleted!", variant: "success" });
    mutate();
    setDeleteLoading(false);
    setIsDeleteOpen(false);
  };

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <div className="grid gap-6 max-w-4xl px-4 py-8 lg:px-16 lg:py-12">
        <nav className="items-center justify-between block py-4 sm:flex ">
          <div className="text-3xl leading-none mx-0">Contributor Insights</div>
        </nav>

        <section className="flex flex-col gap-4">
          {data && data.length > 0 ? (
            data.map(({ id, is_public, name }, index) => (
              <ListCard
                handleOnDeleteClick={(name, id) => {
                  setListIdToDelete(id);
                  setListNameToDelete(name);
                  setIsDeleteOpen(true);
                }}
                key={`list_${id}_${index}`}
                list={{
                  id: id,
                  user: { login: "bdougie", id: 1, name: "crap" },
                  name: name,
                  created_at: " ",
                  updated_at: "",
                  is_public: is_public,
                }}
                workspaceId={workspace.id}
                user={user}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-4 ">
              {!isLoading && sessionToken ? (
                <>
                  <Title className="text-2xl">You currently have no contributor insights</Title>
                  <Button variant="primary" href={`/workspaces/${workspace.id}/contributor-insights/new`}>
                    Create a new contributor insight
                  </Button>
                </>
              ) : null}
            </div>
          )}

          {sessionToken && isLoading ? <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} /> : null}
        </section>
        <div
          className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
            hidden: meta.itemCount <= meta.limit,
          })}
        >
          <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"insights"} />
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

        <DeleteListPageModal
          isLoading={deleteLoading}
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          submitted={false}
          listName={listNameToDelete}
          onConfirm={deleteInsight}
          onClose={() => setIsDeleteOpen(false)}
        />
      </div>
    </WorkspaceLayout>
  );
};

ListsHub.SEO = {
  title: "OpenSauced Contributor Insights",
};
export default ListsHub;
