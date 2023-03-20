import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import PaginationGotoPage from "components/molecules/PaginationGotoPage/pagination-goto-page";
import humanizeNumber from "lib/utils/humanizeNumber";

interface PaginationProps {
  pages: number[];
  totalPage: number; // represents the total number of pages available from the source
  page: number; // represents the current active page
  pageSize?: number; // represents the maximum number of pages button that  are visible in a single page
  onPageChange: (page: number) => void; //  callback function invoked with the updated page value when the page is changed
  divisor?: boolean;
  goToPage?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
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
  onPageChange
}: PaginationProps): JSX.Element => {
  // This logics are meant for testing purpose
  const [selected, setSelected] = useState(page);

  const handleSelected = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handleNext = () => {
    onPageChange(page + 1);
  };

  const handlePrev = () => {
    onPageChange(page - 1);
  };

  return (
    <>
      <div className=" w-max flex gap-x-4 items-center ">
        <div className="flex items-center gap-x-4">
          <button
            className="text-light-slate-9 disabled:text-light-slate-7"
            disabled={!hasPreviousPage ? true : false}
            onClick={() => handlePrev()}
          >
            <RiArrowLeftSLine onClick={() => handlePrev()} className="text-2xl md:text-lg" />
          </button>
          {pages.map((page, index) => {
            return (
              index < pageSize && (
                <div
                  key={index}
                  onClick={() => handleSelected(page)}
                  className={`${
                    // this check  will be updated from page to currentPage when the implemetation of logic is ready
                    selected === page &&
                    "border !text-light-slate-12 shadow-paginate border-light-orange-10 bg-light-orange-2 shadow-search"
                  } cursor-pointer text-light-slate-11 transition   text-sm px-[13px]  py-[6px] rounded-lg `}
                >
                  {page}
                </div>
              )
            );
          })}

          <button
            className="text-light-slate-9 disabled:text-light-slate-7"
            disabled={!hasNextPage ? true : false}
            onClick={() => handleNext()}
          >
            <RiArrowRightSLine className="text-2xl md:text-lg" />
          </button>
        </div>
        <div
          className={`${divisor && "md:border-r-2 border-r-light-slate-6"} text-sm text-light-slate-9    py-1 md:pr-4`}
        >
          Total {totalPage > 999 ? humanizeNumber(totalPage, null) : totalPage} pages
        </div>
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
