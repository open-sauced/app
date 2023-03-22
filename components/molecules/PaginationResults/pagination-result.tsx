import humanizeNumber from "lib/utils/humanizeNumber";

interface PaginationResultsProps {
  metaInfo: Meta;
  total: number; // The total number of elements
  entity: string; // The entity name
  className?: string;
}
const PaginationResults = ({ metaInfo, entity, total, className }: PaginationResultsProps): JSX.Element => {
  const from =
    metaInfo && metaInfo.page === 1
      ? metaInfo.itemCount > 0
        ? metaInfo.page
        : 0
      : (metaInfo.page - 1) * metaInfo.limit + 1;

  const to =
    metaInfo && metaInfo.page * metaInfo.limit <= metaInfo.itemCount
      ? metaInfo.page * metaInfo.limit
      : metaInfo.itemCount;
  return (
    <div className={`${className && className} flex items-center gap-x-1   text-sm text-light-slate-9 tracking-tight`}>
      <span className="hidden md:block">Showing</span> <span className="text-light-slate-12">{from} -</span>
      <span className="text-light-slate-12">{to}</span> of {total > 999 ? humanizeNumber(total, null) : total}
      <span>{entity}</span>
    </div>
  );
};
export default PaginationResults;
