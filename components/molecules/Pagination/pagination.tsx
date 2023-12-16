import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import PaginationGotoPage from "components/molecules/PaginationGotoPage/pagination-goto-page";
import humanizeNumber from "lib/utils/humanizeNumber";

interface PaginationProps {
  // TODO: Passing in pages as a prop should be removed and lean on the meta data plus a new view
  // for the paging component.
  pages: number[];
  totalPage: number; // represents the total number of pages available from the source
  page: number; // represents the current active page
  pageSize?: number; // represents the maximum number of pages button that  are visible in a single page
  onPageChange: (page: number) => void; //  callback function invoked with the updated page value when the page is changed
  divisor?: boolean;
  goToPage?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  showTotalPages?: boolean;
}

const Pagination = ({
  pages,
  totalPage,
  page,
  divisor = true,
  goToPage = false,
  pageSize = 10,
  hasPreviousPage = false,
  hasNextPage = true,
  onPageChange,
  showTotalPages = true,
}: PaginationProps): JSX.Element => {
  const handleSelected = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleNext = () => {
    onPageChange(page + 1);
  };

  const handlePrev = () => {
    onPageChange(page - 1);
  };

  // Calculate the page numbers you see between the back and next arrows
  // These numbers change as you navigate the paging.
  // It might start off as 1,2,3,4,5 but as you move forward it becomes
  // 2,3,4,5,6 and so on.

  const middlePages = Array.from({ length: Math.min(pages.length, pageSize) }, (_, index) =>
    page <= Math.floor(pageSize / 2)
      ? index + 1
      : page >= pages.length - Math.floor(pageSize / 2)
      ? pages.length - pageSize + index + 1
      : page - Math.floor(pageSize / 2) + index
  ).filter((page) => page >= 1 && page <= pages.length);

  return (
    <>
      <div className="w-max flex gap-x-4 items-center">
        <div className="flex items-center gap-x-4">
          <button
            className="text-light-slate-9 disabled:text-light-slate-7"
            disabled={!hasPreviousPage}
            onClick={() => {
              if (!hasPreviousPage) {
                return;
              }

              handlePrev();
            }}
          >
            <RiArrowLeftSLine className="text-2xl md:text-lg" />
          </button>
          {middlePages.map((pageNumber) => {
            return (
              <button
                key={pageNumber}
                onClick={() => {
                  handleSelected(pageNumber);
                }}
                className={`${
                  // this check  will be updated from page to page when the implemetation of logic is ready
                  pageNumber === page &&
                  "border !text-light-slate-12 shadow-paginate border-light-orange-10 bg-light-orange-2 shadow-search"
                } cursor-pointer text-light-slate-11 transition text-sm rounded-lg w-8 h-8 hover:bg-light-orange-2 hover:text-light-orange-10`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            className="text-light-slate-9 disabled:text-light-slate-7"
            disabled={!hasNextPage ? true : false}
            onClick={() => {
              if (!hasNextPage) {
                return;
              }

              handleNext();
            }}
          >
            <RiArrowRightSLine className="text-2xl md:text-lg" />
          </button>
        </div>
        {showTotalPages && (
          <div
            className={`${
              divisor && "md:border-r-2 border-r-light-slate-6"
            } text-sm text-light-slate-9    py-1 md:pr-4`}
          >
            Total {totalPage > 999 ? humanizeNumber(totalPage, null) : totalPage}
            <span className="md:invisible lg:visible"> pages </span>
          </div>
        )}
        {goToPage && (
          <div className="hidden md:block">
            <PaginationGotoPage totalPage={totalPage} page={page} setPage={handleSelected} name={""} />
          </div>
        )}
      </div>
    </>
  );
};
export default Pagination;
