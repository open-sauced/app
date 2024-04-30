import React from "react";

import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="page-container flex grow flex-col items-center pt-8 sm:pt-20">
        <main className="flex w-full flex-1 flex-col items-center bg-light-slate-2">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
