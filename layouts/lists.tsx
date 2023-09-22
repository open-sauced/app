import React from "react";
import { useRouter } from "next/router";

import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import TopNav from "components/organisms/TopNav/top-nav";
import ListHeader from "components/ListHeader/list-header";
import TabsList from "components/TabList/tab-list";

const ListPageLayout = ({
  children,
  list,
  numberOfContributors,
  isOwner = false,
}: {
  children: React.ReactNode;
  list: any;
  numberOfContributors: number;
  isOwner: boolean;
}) => {
  const router = useRouter();
  const paths = router.asPath.split("/");
  const selectedTab = paths[3] ?? "overview";

  const tabList = [
    { name: "Overview" },
    // Uncomment once the activity page has been implemented
    // { name: "Activity" },
    { name: "Contributors" },
  ];

  const { name, is_public, id } = list ?? {};

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="flex flex-col items-center pt-20 page-container grow bg-light-slate-3 md:pt-14">
        <div className="info-container container w-full min-h-[100px]">
          <Header>
            {list ? (
              <ListHeader
                name={name}
                numberOfContributors={numberOfContributors}
                isPublic={is_public}
                listId={list.id}
                isOwner={isOwner}
              />
            ) : (
              <div>An error occurred</div>
            )}
          </Header>

          <TabsList tabList={tabList} selectedTab={selectedTab} pageId={`/lists/${list.id}`} />
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
