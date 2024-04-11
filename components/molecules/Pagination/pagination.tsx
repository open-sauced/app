import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import clsx from "clsx";
import PaginationGotoPage from "components/molecules/PaginationGotoPage/pagination-goto-page";
import humanizeNumber from "lib/utils/humanizeNumber";

interface PaginationProps {
  // TODO: Passing in pages as a prop should be removed and lean on the meta data plus a new view
  // for the paging component.
  pages?: number[];
  totalPage: number; // represents the total number of pages available from the source
  page: number; // represents the current active page
  pageSize?: number; // represents the maximum number of pages button that  are visible in a single page
  onPageChange: (page: number) => void; //  callback function invoked with the updated page value when the page is changed
  divisor?: boolean;
  goToPage?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  showTotalPages?: boolean;
  generatePageLinks?: boolean;
  showPages?: boolean;
  numberOfPagesToDisplay?: number;
}

const Pagination = ({
  pages = [],
  totalPage,
  page,
  divisor = true,
  goToPage = false,
  pageSize = 10,
  hasPreviousPage = false,
  hasNextPage = true,
  onPageChange,
  showTotalPages = true,
  showPages = false,
  numberOfPagesToDisplay = 5,
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
  const middlePages = Array.from({ length: Math.min(totalPage, numberOfPagesToDisplay) }, (_, index) =>
    page <= Math.floor(numberOfPagesToDisplay / 2)
      ? index + 1
      : page >= totalPage - Math.floor(numberOfPagesToDisplay / 2)
      ? totalPage - numberOfPagesToDisplay + index + 1
      : page - Math.floor(numberOfPagesToDisplay / 2) + index
  ).filter((page) => page >= 1 && page <= totalPage);

  return (
    <>
      <div className="w-max flex gap-x-4 items-center text-light-slate-11 [&_button]:rounded [&_button]:p-2">
        <div className="flex items-center gap-x-4">
          <button
            aria-disabled={!hasPreviousPage}
            onClick={() => {
              if (!hasPreviousPage) {
                return;
              }

              handlePrev();
            }}
          >
            <RiArrowLeftSLine className="text-2xl md:text-lg" />
          </button>
          {showPages && middlePages.length > 0 ? (
            <>
              <button
                onClick={() => {
                  handleSelected(1);
                }}
              >
                First
              </button>
              {middlePages.map((pageNumber) => {
                return (
                  <button
                    key={pageNumber}
                    className={clsx(page === pageNumber && " text-orange-600")}
                    onClick={() => {
                      handleSelected(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  handleSelected(totalPage);
                }}
              >
                Last
              </button>
            </>
          ) : null}

          <button
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
          <div className={`${divisor && "md:border-r-2 border-r-light-slate-6"} text-sm py-1 md:pr-4`}>
            Total {totalPage > 999 ? humanizeNumber(totalPage, null) : totalPage}
            <span className="md:invisible lg:visible"> pages </span>
          </div>
        )}
        {goToPage && (
          <div className="hidden md:block">
            <PaginationGotoPage totalPage={totalPage} page={page} setPage={handleSelected} name="" />
          </div>
        )}
      </div>
    </>
  );
};
export default Pagination;
