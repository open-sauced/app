import React from "react";

import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[calc(100vh-(54px+95px))] flex-col items-center">
        <main className="flex w-full flex-1 flex-col items-center bg-light-slate-2">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default ProfileLayout;
