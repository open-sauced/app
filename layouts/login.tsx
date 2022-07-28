import React from "react";
import Footer from "../components/organisms/footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const LoginLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <TopNav />
      <main className="flex w-full min-h-[calc(100vh-(54px+95px))] flex-1 items-center justify-center text-center">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LoginLayout;