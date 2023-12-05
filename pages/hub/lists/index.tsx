import React, { useState } from "react";
import clsx from "clsx";

import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "layouts/hub";

import { Dialog, DialogContent, DialogTitle } from "components/molecules/Dialog/dialog";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import Pagination from "components/molecules/Pagination/pagination";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import TextInput from "components/atoms/TextInput/text-input";
import ListCard from "components/molecules/ListCard/list-card";
import Button from "components/atoms/Button/button";
import { useToast } from "lib/hooks/useToast";

import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useFetchFeaturedLists from "lib/hooks/useFetchFeaturedLists";

const ListsHub: WithPageLayout = () => {
  const { sessionToken } = useSupabaseAuth();
  const { data, isLoading, meta, setPage, mutate } = useFetchAllLists(30, !!sessionToken);
  const { data: featuredListsData, isLoading: featuredListsLoading } = useFetchFeaturedLists(
    sessionToken ? false : true
  );
  const { toast } = useToast();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [text, setText] = useState("");
  const [listNameToDelete, setListNameToDelete] = useState("");
  const [listIdToDelete, setListIdToDelete] = useState("");

  const handleOnDelete = (name: string, id: string) => {
    setIsDeleteOpen(true);
    setListNameToDelete(name);
    setListIdToDelete(id);
  };

  const handleOnClose = () => {
    setIsDeleteOpen(false);
    setText("");
  };

  const handleOnConfirm = async () => {
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
      setText("");
    }
  };

  return (
    <>
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

      <Dialog open={isDeleteOpen}>
        <DialogContent className="grid grid-cols-1 gap-4 p-4 max-w-[90%] lg:max-w-xl rounded-t-lg">
          <DialogTitle>
            <Title level={3}>Delete List</Title>
          </DialogTitle>

          <Text>
            Are you sure you want to delete <span className="font-bold text-light-slate-12">{listNameToDelete}</span>?
            If you have data on this list that your team is using, they will lose access.
          </Text>
          <Text>
            <span className="font-bold text-light-slate-12">This action cannot be undone</span>
          </Text>
          <Text>
            Type <span className="font-bold text-light-red-10">{listNameToDelete}</span> to confirm
          </Text>

          <TextInput
            disabled={deleteLoading}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setDisabled(e.target.value !== listNameToDelete);
            }}
          />

          <div className="flex gap-3">
            <Button
              loading={deleteLoading}
              disabled={disabled}
              onClick={handleOnConfirm}
              variant="default"
              className={clsx(
                "bg-light-red-6 border border-light-red-8 hover:bg-light-red-7 text-light-red-10",
                disabled && "cursor-not-allowed !bg-light-red-4 hover:!none !border-light-red-5 !text-light-red-8"
              )}
            >
              Delete
            </Button>
            <Button
              onClick={handleOnClose}
              variant="default"
              className="bg-light-slate-6 text-light-slate-10 hover:bg-light-slate-7"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

ListsHub.PageLayout = HubLayout;
ListsHub.isPrivateRoute = true;
ListsHub.SEO = {
  title: "Lists Hub | Open Sauced Lists",
};
export default ListsHub;
