import React from "react";
import { useRouter } from "next/router";

import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import TopNav from "components/organisms/TopNav/top-nav";
import ListHeader from "components/ListHeader/list-header";
import TabsList from "components/TabList/tab-list";
import ComponentDateFilter from "components/molecules/ComponentDateFilter/component-date-filter";
import { setQueryParams } from "lib/utils/query-params";

const ListPageLayout = ({
  children,
  list,
  numberOfContributors,
  isOwner = false,
  showRangeFilter = true,
}: {
  children: React.ReactNode;
  list?: DBList;
  numberOfContributors: number;
  isOwner: boolean;
  showRangeFilter?: boolean;
}) => {
  const router = useRouter();
  const { range } = router.query;
  const paths = router.asPath.split("/");
  const selectedTab = paths[3] ?? "overview";

  const tabList = [{ name: "Overview" }, { name: "Activity" }, { name: "Highlights" }];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="flex flex-col items-center pt-20 page-container grow md:pt-14">
        <div className="info-container md:px-16 container w-full min-h-[100px]">
          <Header classNames="px-0 md:px-0">
            {list && (
              <ListHeader
                name={list.name}
                numberOfContributors={numberOfContributors}
                isPublic={list.is_public}
                listId={list.id}
                isOwner={isOwner}
              />
            )}
          </Header>

          <div className="md:grid md:grid-cols-2 flex flex-col">
            {list && <TabsList tabList={tabList} selectedTab={selectedTab} pageId={`/lists/${list.id}`} />}
            <div>
              <div className="flex justify-end p-4 md:p-0">
                {showRangeFilter && (
                  <ComponentDateFilter
                    defaultRange={Number(range ?? 30)}
                    setRangeFilter={(range) => setQueryParams({ range: `${range}` })}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex flex-col items-center flex-1 w-full py-8  bg-light-slate-2">
          <div className="container px-2 mx-auto md:px-16">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ListPageLayout;
