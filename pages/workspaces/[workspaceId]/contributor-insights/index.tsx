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

import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useFetchFeaturedLists from "lib/hooks/useFetchFeaturedLists";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";

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
    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  const userId = Number(session?.user.user_metadata.sub);
  const featureFlags = await getAllFeatureFlags(userId);

  return {
    props: {
      workspace: data,
      featureFlags,
    },
  };
};

// lazy import DeleteListPageModal component to optimize bundle size they don't load on initial render
const DeleteListPageModal = dynamic(() => import("components/organisms/ListPage/DeleteListPageModal"));

const ListsHub = ({ workspace }: { workspace: Workspace }) => {
  const { sessionToken } = useSupabaseAuth();
  const { data, isLoading, meta, setPage, mutate } = useFetchAllLists(30, !!sessionToken);
  const { data: featuredListsData, isLoading: featuredListsLoading } = useFetchFeaturedLists(
    sessionToken ? false : true
  );
  const { toast } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [listNameToDelete, setListNameToDelete] = useState("");
  const [listIdToDelete, setListIdToDelete] = useState("");

  const handleOnDelete = (name: string, id: string) => {
    setIsDeleteOpen(true);
    setListNameToDelete(name);
    setListIdToDelete(id);
  };

  const handleOnClose = () => {
    setIsDeleteOpen(false);
  };

  const handleOnConfirm = async () => {
    setSubmitted(true);
    setDeleteLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${listIdToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      if (res.ok) {
        setIsDeleteOpen(false);
        mutate();
        toast({ description: "List deleted successfully", variant: "success" });
      }
    } catch (err) {
      setIsDeleteOpen(false);
      // eslint-disable-next-line no-console
      console.log(err);
      toast({ description: "An error occurred while deleting the list", variant: "danger" });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <div>
        <nav className="items-center justify-between block py-4 sm:flex ">
          <div className="text-3xl leading-none mx-0">Contributor Insights</div>
        </nav>

        <section className="flex flex-col gap-4">
          {data && data.length > 0 ? (
            data.map(({ id, is_public, name }, index) => (
              <ListCard
                handleOnDeleteClick={(name, id) => handleOnDelete(name, id)}
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
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-4 ">
              {!isLoading && sessionToken ? <Title className="text-2xl">You currently have no lists</Title> : null}
            </div>
          )}

          {sessionToken && isLoading ? <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} /> : null}

          {!sessionToken && featuredListsLoading ? (
            <SkeletonWrapper count={1} classNames="w-full" height={95} radius={10} />
          ) : null}
          {featuredListsData.map((list, i) => (
            <ListCard
              key={`featured_list_${i}`}
              list={{
                id: list.id,
                user: { login: "bdougie", id: 1, name: "Brian Douglas" },
                name: `Demo | ${list.name}`,
                created_at: " ",
                updated_at: "",
                is_public: list.is_public,
              }}
              workspaceId={workspace.id}
            />
          ))}
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
          submitted={submitted}
          listName={listNameToDelete}
          onConfirm={handleOnConfirm}
          onClose={handleOnClose}
        />
      </div>
    </WorkspaceLayout>
  );
};

ListsHub.SEO = {
  title: "Open Sauced Contributor Insights",
};
export default ListsHub;
