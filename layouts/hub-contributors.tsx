import React from "react";
import Footer from "components/organisms/Footer/footer";
import TopNav from "components/organisms/TopNav/top-nav";

const HubContributorsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="flex flex-col items-center pt-20 page-container grow md:pt-14">
        <main className="flex flex-col items-center flex-1 w-full bg-light-slate-3">
          <div className="container w-full mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HubContributorsPageLayout;
