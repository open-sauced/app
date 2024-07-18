import React from "react";

import Footer from "components/organisms/Footer/footer";
import Header from "components/organisms/Header/header";
import Nav from "components/organisms/ToolList/nav";
import FilterHeader from "components/molecules/FilterHeader/filter-header";

import useNav from "lib/hooks/useNav";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import useSession from "lib/hooks/useSession";

const FilterLayout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSession(true);
  const { toolList, selectedTool, filterName, selectedFilter, userOrg } = useNav();

  return (
    <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
      <Header>
        <FilterHeader />
      </Header>
      <div className="px-4 lg:px-16">
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
      <Footer />
    </WorkspaceLayout>
  );
};

export default FilterLayout;
