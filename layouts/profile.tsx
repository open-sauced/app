import React from "react";

import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="page-container flex grow flex-col items-center pt-20 md:pt-14">
        <main className="flex pb-16 w-full flex-1 flex-col items-center">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
