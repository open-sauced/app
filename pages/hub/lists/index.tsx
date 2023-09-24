import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "@layouts/hub";

import PaginationResults from "@components/molecules/PaginationResults/pagination-result";
import Pagination from "@components/molecules/Pagination/pagination";
import SkeletonWrapper from "@components/atoms/SkeletonLoader/skeleton-wrapper";
import Title from "@components/atoms/Typography/title";
import ListCard from "@components/molecules/ListCard/list-card";

import { useFetchAllLists } from "@lib/hooks/useList";

const ListsHub: WithPageLayout = () => {
  const { data, isLoading, meta, setPage } = useFetchAllLists();

  return (
    <>
      <section className="flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map(({ id, is_public, name }, index) => (
            <ListCard
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
            <Title className="text-2xl">You currently have no list</Title>{" "}
          </div>
        )}

        {isLoading && <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} />}
        <Link
          href={"/hub/lists/new"}
          className="w-full py-5 text-lg text-center border rounded-lg bg-light-slate-4 text-light-slate-11 md:py-8 lg:py-10 border-light-slate-7"
        >
          Create a new List
        </Link>
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
    </>
  );
};

ListsHub.PageLayout = HubLayout;
ListsHub.isPrivateRoute = true;
ListsHub.SEO = {
  title: "Lists Hub | Open Sauced Lists",
};
export default ListsHub;
