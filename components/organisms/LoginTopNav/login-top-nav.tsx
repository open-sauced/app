import React from "react";
import HeaderLogo from "../../molecules/HeaderLogo/header-logo";

const LoginTopNav: React.FC = () => {

  return (
    <header className="top-nav-container flex justify-between items-center pr-1 md:px-16 py-0.5">
      <HeaderLogo loginScreen />
    </header>
  );
};

export default LoginTopNav;