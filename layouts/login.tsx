import React from "react";
import LoginTopNav from "../components/organisms/LoginTopNav/login-top-nav";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#ECECEC] px-3 flex flex-col min-h-screen">
      <LoginTopNav />
      <main className="flex grow w-full flex-1 pt-10 lg:pt-0 lg:items-center lg:justify-center">{children}</main>
    </div>
  );
};

export default LoginLayout;
