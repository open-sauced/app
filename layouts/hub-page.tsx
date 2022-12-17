import React from "react";
import { useRouter } from "next/router";

import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import Nav from "components/organisms/ToolList/nav";
import TopNav from "components/organisms/TopNav/top-nav";
import InsightHeader from "components/molecules/InsightHeader/insight-header";

import useNav from "lib/hooks/useNav";
import useInsight from "lib/hooks/useInsight";

const HubPageLayout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const { filterName } = router.query;
  const insightId = filterName as string;
  const { data: insight } = useInsight(insightId);
  const repositories = insight?.repos.map(repo => repo.repo_id);

  const { toolList, selectedTool, selectedFilter, userOrg } = useNav(repositories);

  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[calc(100vh-(54px+95px))] flex-col items-center">
        <div className="info-container min-w-full min-h-[100px]">
          <Header>
            <InsightHeader insight={insight} repositories={repositories} />
          </Header>

          <Nav
            toolList={toolList}
            selectedTool={selectedTool && selectedTool.toString()}
            filterName={filterName}
            selectedFilter={selectedFilter}
            username={userOrg}
          />
        </div>

        <main className="flex w-full flex-1 flex-col items-center px-3 md:px-16 py-8 bg-light-slate-2">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HubPageLayout;
