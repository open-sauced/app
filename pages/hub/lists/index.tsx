import React, { useState } from "react";
import clsx from "clsx";

import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
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
import Card from "components/atoms/Card/card";
import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";

const staticContributors = [
  {
    host_login: "brandonroberts",
  },
  {
    host_login: "nickytonline",
  },
  {
    host_login: "bbsmooth",
  },
  {
    host_login: "lunaruan",
  },
  {
    host_login: "bluwy",
  },
  {
    host_login: "lasjorg",
  },
  {
    host_login: "sukkaw",
  },
  {
    host_login: "ogdev-01",
  },
  {
    host_login: "0",
  },
];

const ListsHub: WithPageLayout = () => {
  const { data, isLoading, meta, setPage, mutate } = useFetchAllLists();
  const { toast } = useToast();
  const { sessionToken } = useSupabaseAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [text, setText] = useState("");
  const [listNameToDelete, setListNameToDelete] = useState("");
  const [listIdToDelete, setListIdToDelete] = useState("");

  const testListId = process.env.NEXT_PUBLIC_LIST_PAGE_ID;
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

        {isLoading && sessionToken ? <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} /> : null}

        {!sessionToken ? (
          <div className="w-full -mt-4 ">
            <Text className="text-base">
              Welcome to List Pages, we&apos;ve included a featured List Page for you to test out. You can also create
              your own to get insights on contributors.
            </Text>

            <Card className="mt-4">
              <div className="flex flex-col items-start w-full gap-4 px-4 py-6 bg-white rounded-lg md:items-center md:justify-between md:flex-row lg:px-8 lg:gap-2">
                <div className="flex flex-col flex-1 gap-4 lg:gap-6">
                  <div className="flex items-center gap-4 lg:items-center ">
                    <div className="w-4 h-4 rounded-full bg-light-orange-10"></div>
                    <div className="flex justify-between text-xl text-light-slate-12">
                      <Link href={`/lists/${testListId}/overview`}>Top 10 Open Source Contributors</Link>
                    </div>
                    <div className="px-2 border rounded-2xl text-light-slate-11">public</div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-end w-full gap-8">
                    {/* Contributors section */}
                    <div className="flex flex-col items-center flex-1 gap-1 mr-2">
                      <span className="text-xs text-light-slate-11">Contributors</span>
                      <Text className="flex items-center text-2xl">10</Text>
                    </div>

                    <div className="flex items-center">
                      <StackedAvatar contributors={staticContributors} visibleQuantity={6} classNames="scale-125" />
                    </div>
                    <div className="justify-end flex-1 hidden md:flex">
                      {/* Delete button */}

                      <Link
                        className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
                        href={`/lists/${testListId}/overview`}
                      >
                        <MdOutlineArrowForwardIos title="Go To List Page" className="text-lg text-light-slate-10" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : null}
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
