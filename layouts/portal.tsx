import React from "react";
import Footer from "../components/organisms/footer/footer";
import Header from "../components/organisms/header/header";
import Nav from "../components/organisms/toolist/nav";
import TopNav from "../components/organisms/TopNav/top-nav";
import useNav from "lib/hooks/useNav";

const PortalLayout = ({children}: {children: React.ReactNode}) => {

  const { toolList, selectedTool, portalName } = useNav();

  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[88vh] flex-col items-center justify-center">
        <div className="info-container min-w-full min-h-[100px]">
          <Header />
          <Nav
            toolList={toolList}
            selectedTool={selectedTool}
            portalName={portalName}
          />
        </div>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center px-3 md:px-16 pt-8 pb-6">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default PortalLayout;