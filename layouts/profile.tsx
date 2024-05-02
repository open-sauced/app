import React from "react";

import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

interface ProfileLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const ProfileLayout = ({ children, showFooter = true }: ProfileLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="page-container flex grow flex-col items-center pt-8 lg:pt-20 md:pt-14">
        <main className="flex w-full flex-1 flex-col items-center bg-light-slate-2">{children}</main>
      </div>
      {showFooter ? <Footer /> : null}
    </div>
  );
};

export default ProfileLayout;
