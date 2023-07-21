import React from "react";

const Header = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <section className="header flex flex-col md:flex-row pt-6 px-4 md:px-16 bg-light-slate-3">{children}</section>;
};

export default Header;
