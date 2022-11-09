import React from "react";

import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const HubLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[calc(100vh-(54px+95px))] flex-col items-center">
        <main className="flex w-full flex-1 flex-col items-center px-3 md:px-16 py-8 bg-light-slate-2">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HubLayout;