import React from "react";
import { useRouter } from "next/router";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import TopNav from "components/organisms/TopNav/top-nav";
import ListHeader from "components/ListHeader/list-header";
import TabsList from "components/TabList/tab-list";

import { useList } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const ListPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userId } = useSupabaseAuth();
  const { listId } = router.query;
  const { data: list, isLoading } = useList(listId as string);
  const paths = router.asPath.split("/");
  const selectedTab = paths[3] ?? "overview";

  const tabList = [
    { name: "Overview" },
    // { name: "Activity" },
    { name: "Contributors" },
  ];

  // TODO: list does not have a user property
  const isOwner = true; //!!(userId && list && `${userId}` === `${list.user.id}`);
  const { name, is_public, id } = list ?? {};

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="flex flex-col items-center pt-20 page-container grow bg-light-slate-3 md:pt-14">
        <div className="info-container container w-full min-h-[100px]">
          <Header>
            {list ? (
              <ListHeader name={name} isPublic={is_public} listId={id} isOwner={isOwner} />
            ) : isLoading ? (
              <div className="flex justify-between w-full h-46">
                <div className="flex items-center gap-3">
                  <SkeletonWrapper radius={10} width={140} height={140} />
                  <div className="flex flex-col gap-3">
                    <SkeletonWrapper width={110} height={25} />
                    <SkeletonWrapper width={200} height={25} />
                    <SkeletonWrapper classNames="mt-3" width={150} height={30} />
                  </div>
                </div>
                <div>
                  <SkeletonWrapper classNames="mt-6" width={150} height={40} />
                </div>
              </div>
            ) : (
              <div>An error occurred</div>
            )}
          </Header>

          <TabsList tabList={tabList} selectedTab={selectedTab} pageId={`/lists/${listId}`} />
        </div>

        <main className="flex flex-col items-center flex-1 w-full px-3 py-8 md:px-16 bg-light-slate-2">
          <div className="container px-2 mx-auto md:px-16">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ListPageLayout;
