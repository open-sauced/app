import { useRouter } from "next/router";
import React from "react";
import AuthSection from "../../molecules/AuthSection/auth-section";
import HeaderLogo from "../../molecules/HeaderLogo/header-logo";

const TopNav: React.FC = () => {
  const router = useRouter();

  const { filterName } = router.query;

  return (
    <div className="top-nav-container flex justify-between items-center pr-1 md:px-16 py-0.5 bg-zinc-900 border-b">
      <HeaderLogo />
      {filterName && <AuthSection />}
    </div>
  );
};

export default TopNav;