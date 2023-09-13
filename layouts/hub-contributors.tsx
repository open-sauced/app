import React from "react";
import { useRouter } from "next/router";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import TopNav from "components/organisms/TopNav/top-nav";
import HubContributorsHeader from "components/molecules/HubContributorsHeader/hub-contributors-header";

import { useList } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const HubContributorsPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userId } = useSupabaseAuth();
  const { listId } = router.query;
  const { data: list } = useList(listId as string);
  const isLoading = false;
  const paths = router.asPath.split("/");
  const selectedTab = paths[3] ?? "overview";

  const isOwner = !!(userId && list && `${userId}` === `${list.user.id}`);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="flex flex-col items-center pt-20 page-container grow bg-light-slate-2 md:pt-14">
        <div className="info-container container w-full min-h-[100px]">
          <Header>
            {list ? (
              <HubContributorsHeader
                setLimit={() => {}}
                setRangeFilter={() => {}}
                list={list}
                listId={list.id}
                isOwner={isOwner}
              />
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
        </div>

        <main className="flex flex-col items-center flex-1 w-full py-8 bg-light-slate-3">
          <div className="container w-full px-16 mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HubContributorsPageLayout;
