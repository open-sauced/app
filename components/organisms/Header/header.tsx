import clsx from "clsx";
import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  classNames?: string;
}
const Header = ({ children, classNames }: HeaderProps): JSX.Element => {
  return (
    <section className={clsx("flex flex-col pt-6 header md:flex-row md:px-16 bg-light-slate-3", classNames)}>
      {children}
    </section>
  );
};

export default Header;
