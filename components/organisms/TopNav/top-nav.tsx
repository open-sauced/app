import React from "react";
import AuthSection from "../../molecules/AuthSection/auth-section";
import HeaderLogo from "../../molecules/HeaderLogo/header-logo";

const TopNav: React.FC = () => {

  return (
    <header className="top-nav-container flex justify-between items-center px-2 md:px-16 py-0.5 bg-light-slate-3 border-b">
      <HeaderLogo withBg={false} textIsBlack />
      <AuthSection />
    </header>
  );
};

export default TopNav;
