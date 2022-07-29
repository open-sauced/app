import React from "react";
import HeaderLogo from "../../molecules/HeaderLogo/header-logo";

const LoginTopNav: React.FC = () => {

  return (
    <div className="top-nav-container flex justify-between items-center pr-1 md:px-16 py-0.5">
      <HeaderLogo loginScreen />
    </div>
  );
};

export default LoginTopNav;