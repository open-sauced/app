import React from "react";

interface TableTitleProps {
    text: string;
    className?: string;
}

const TableTitle: React.FC<TableTitleProps> = ({ className, text }) => {
  return (
    <div className={`${className ? className : ""} font-semibold tracking-wide text-xs text-light-slate-11 uppercase`}>
      {text}
    </div>
  );
};

export default TableTitle;