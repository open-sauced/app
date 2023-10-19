import React from "react";

import { useRouter } from "next/router";
import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import Nav from "components/organisms/ToolList/nav";
import TopNav from "components/organisms/TopNav/top-nav";
import FilterHeader from "components/molecules/FilterHeader/filter-header";

import useNav from "lib/hooks/useNav";
import useFilterOptions from "lib/hooks/useFilterOptions";
import { getInterestOptions } from "lib/utils/getInterestOptions";
import useFilterPrefetch from "lib/hooks/useFilterPrefetch";
import { captureAnalytics } from "lib/utils/analytics";

const FilterLayout = ({ children }: { children: React.ReactNode }) => {
  const { toolList, selectedTool, filterName, selectedFilter, userOrg } = useNav();
  const router = useRouter();
  const filterOptions = useFilterOptions();
  const topicOptions = getInterestOptions();
  const { filterValues } = useFilterPrefetch();
  const { toolName } = router.query;

  const filterBtnRouting = (filter: string) => {
    captureAnalytics({ title: "Filters", property: "toolsFilter", value: `${filter} applied` });
    return router.push(`/${filterName}/${toolName}/filter/${filter.toLocaleLowerCase()}`);
  };

  const cancelFilterRouting = () => {
    return router.push(`/${filterName}/${toolName}`);
  };

  const topicRouting = (topic: string) => {
    router.push(`/${topic}/${toolName}${selectedFilter ? `/filter/${selectedFilter}` : ""}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="page-container flex grow bg-light-slate-3 flex-col pt-28 sm:pt-20 md:pt-14 items-center">
        <div className="info-container container w-full min-h-[100px]">
          <Header>
            <FilterHeader
              onFilterRouting={filterBtnRouting}
              onCancelFilterRouting={cancelFilterRouting}
              onTopicRouting={topicRouting}
              filterName={filterName}
              topicOptions={topicOptions}
              selectedFilter={selectedFilter}
              filterOptions={filterOptions}
              filterValues={filterValues}
            />
          </Header>
          <Nav
            toolList={toolList}
            selectedTool={selectedTool && selectedTool.toString()}
            filterName={filterName}
            selectedFilter={selectedFilter}
            username={userOrg}
          />
        </div>

        <main className="flex w-full flex-1 flex-col items-center  py-8 bg-light-slate-2">
          <div className="container mx-auto px-2 md:px-16">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default FilterLayout;
