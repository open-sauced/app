import React from "react";

import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const HubLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="page-container flex grow flex-col items-center">
        <main className="flex w-full flex-1 flex-col items-center px-3 md:px-16 py-8 bg-light-slate-2">
          <div className="container mx-auto px-2 md:px-16">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HubLayout;
