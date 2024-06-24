import React from "react";
import { useRouter } from "next/router";

import Header from "components/organisms/Header/header";
import ListHeader from "components/ListHeader/list-header";
import TabsList from "components/TabList/tab-list";
import ComponentDateFilter from "components/molecules/ComponentDateFilter/component-date-filter";
import { setQueryParams } from "lib/utils/query-params";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";

const ListPageLayout = ({
  children,
  list,
  numberOfContributors,
  isOwner = false,
  showRangeFilter = true,
  workspaceId,
  owners,
  repoFilter = false,
  repoFilterOptions = [],
  repoFilterSelect = () => {},
  overLimit,
}: {
  children: React.ReactNode;
  list?: DBList;
  workspaceId?: string;
  numberOfContributors: number;
  isOwner: boolean;
  showRangeFilter?: boolean;
  owners?: string[];
  repoFilter?: boolean;
  repoFilterOptions?: OptionKeys[];
  repoFilterSelect?: (repo: OptionKeys[]) => void;
  overLimit?: boolean;
}) => {
  const router = useRouter();
  const { range } = router.query;
  const paths = router.asPath.split("/");
  const selectedTab = paths[3] ?? "overview";

  const tabList = [
    { name: "Overview", path: "overview" },
    { name: "Activity", path: "activity" },
    { name: "Highlights", path: "highlights" },
  ];

  return (
    <>
      <div className="px-4 py-8 lg:px-16 lg:py-12">
        <Header classNames="px-0 md:px-0">
          {list && (
            <ListHeader
              name={list.name}
              numberOfContributors={numberOfContributors}
              isPublic={list.is_public}
              listId={list.id}
              workspaceId={workspaceId}
              isOwner={isOwner}
              owners={owners}
              overLimit={overLimit}
            />
          )}
        </Header>

        <div className="md:grid md:grid-cols-2 flex flex-col border-b pt-3">
          {list && (
            <TabsList
              tabList={tabList}
              selectedTab={selectedTab}
              pageId={workspaceId ? `/workspaces/${workspaceId}/contributor-insights/${list.id}` : `/lists/${list.id}`}
            />
          )}
          <div>
            <div className="flex justify-end items-center gap-4">
              {showRangeFilter && (
                <ComponentDateFilter
                  defaultRange={Number(range ?? 30)}
                  setRangeFilter={(range) => setQueryParams({ range: `${range}` })}
                />
              )}
              {repoFilter && <TrackedRepositoryFilter options={repoFilterOptions} handleSelect={repoFilterSelect} />}
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center flex-1 w-full py-8  bg-light-slate-2">
        <div className="container px-2 mx-auto md:px-16">{children}</div>
      </main>
    </>
  );
};

export default ListPageLayout;
