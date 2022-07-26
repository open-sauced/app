import React from "react";
import Footer from "../components/organisms/footer/footer";
import Header from "../components/organisms/header/header";
import Nav from "../components/organisms/toolist/nav";
import TopNav from "../components/organisms/TopNav/top-nav";
import useNav from "lib/hooks/useNav";

const FilterLayout = ({children}: {children: React.ReactNode}) => {

  const { toolList, selectedTool, filterName } = useNav();

  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[88vh] flex-col items-center">
        <div className="info-container min-w-full min-h-[100px]">
          <Header />
          <Nav
            toolList={toolList}
            selectedTool={selectedTool && selectedTool.toString()}
            filterName={filterName}
          />
        </div>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center px-3 md:px-16 pt-6 pb-6">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default FilterLayout;