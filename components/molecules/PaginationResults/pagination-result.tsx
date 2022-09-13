import humanizeNumber from "lib/utils/humanizeNumber";
import React from "react";

interface PaginationResultsProps {
  from: number; // starting from
  to: number; // ending here
  total: number; // The total number of elements
  entity: string; // The entity name
}
const PaginationResults = ({ from, to, entity, total }: PaginationResultsProps): JSX.Element => {
  return (
    <div className="text-sm items-center flex gap-x-1 text-light-slate-9 font-medium">
      <span>Showing</span> <span className="text-light-slate-12">{from} -</span>
      <span className="text-light-slate-12">{to}</span> of {total > 999 ? humanizeNumber(total, null) : total}
      <span>{entity}</span>
    </div>
  );
};
export default PaginationResults;
