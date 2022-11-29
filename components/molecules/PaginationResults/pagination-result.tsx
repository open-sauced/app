import humanizeNumber from "lib/utils/humanizeNumber";
import React from "react";

interface PaginationResultsProps {
  from: number; // starting from
  to: number; // ending here
  total: number; // The total number of elements
  entity: string; // The entity name
  className?: string;
}
const PaginationResults = ({ from, to, entity, total, className }: PaginationResultsProps): JSX.Element => {
  return (
    <div className={`${className && className} flex items-center gap-x-1   text-sm text-light-slate-9 tracking-tight`}>
      <span className="hidden md:block">Showing</span> <span className="text-light-slate-12">{from} -</span>
      <span className="text-light-slate-12">{to}</span> of {total > 999 ? humanizeNumber(total, null) : total}
      <span>{entity}</span>
    </div>
  );
};
export default PaginationResults;
