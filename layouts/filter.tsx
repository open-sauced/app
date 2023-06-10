import React from "react";

import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import Nav from "components/organisms/ToolList/nav";
import TopNav from "components/organisms/TopNav/top-nav";
import FilterHeader from "components/molecules/FilterHeader/filter-header";

import useNav from "lib/hooks/useNav";

const FilterLayout = ({ children }: { children: React.ReactNode }) => {
  const { toolList, selectedTool, filterName, selectedFilter, userOrg } = useNav();

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="page-container flex grow bg-light-slate-3 flex-col items-center">
        <div className="info-container container w-full min-h-[100px]">
          <Header>
            <FilterHeader />
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
