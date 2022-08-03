import React from "react";
import LoginTopNav from "../components/organisms/LoginTopNav/login-top-nav";

const LoginLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-[#ECECEC]">
      <LoginTopNav />
      <main className="flex w-full min-h-[calc(100vh-54px)] flex-1 pt-10 lg:pt-0 lg:items-center lg:justify-center">
        {children}
      </main>
    </div>
  );
};

export default LoginLayout;