import React from "react";

interface TableTitleProps {
  className?: string;
  children: React.ReactNode;
}

const TableTitle: React.FC<TableTitleProps> = ({ className, children }) => {
  return (
    <div className={`${className ? className : ""} font-semibold tracking-wide text-xs text-light-slate-11 uppercase`}>
      {children}
    </div>
  );
};

export default TableTitle;
