import React from "react";
import AuthSection from "../../molecules/AuthSection/auth-section";
import HeaderLogo from "../../molecules/HeaderLogo/header-logo";

const TopNav: React.FC = () => {

  return (
    <header className="top-nav-container flex justify-between items-center px-2 md:px-16 py-0.5 bg-zinc-900 border-b">
      <HeaderLogo withBg={false} />
      <AuthSection />
    </header>
  );
};

export default TopNav;
