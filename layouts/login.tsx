import React from "react";
import Footer from "../components/organisms/footer/footer";
import LoginTopNav from "../components/organisms/LoginTopNav/login-top-nav";

const LoginLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-[#E6E6E6]">
      <LoginTopNav />
      <main className="flex w-full min-h-[calc(100vh-54px)] flex-1 lg:items-center lg:justify-center">
        {children}
      </main>
    </div>
  );
};

export default LoginLayout;