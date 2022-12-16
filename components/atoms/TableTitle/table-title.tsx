import React, { Dispatch, SetStateAction } from "react";

interface TableTitleProps {
    text: string;
    className?: string;
    handleClick?: () => void;
}

const TableTitle: React.FC<TableTitleProps> = ({ className, text, handleClick }) => {

  return (
    <div className={`${className ? className : ""} font-semibold tracking-wide text-xs text-light-slate-11 uppercase`} onClick={handleClick}>
      {text}
    </div>
  );
};

export default TableTitle;
