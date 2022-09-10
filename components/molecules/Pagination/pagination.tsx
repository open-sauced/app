import humanizeNumber from "lib/utils/humanizeNumber";
import React, { useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
interface PaginationProps {
  pages: number[];
  totalPage: number; // represents the total number of pages available from the source
  currentPage: number; // represents the current active page
  pageSize?: number; // represents the maximum number of pages that  are visible in a single page
  onPageChange: (page: number) => void; //  callback function invoked with the updated page value when the page is changed
  divisor?: boolean;
  gotoPage?: boolean;
}

const Pagination = ({ pages, totalPage, currentPage, divisor, gotoPage = false }: PaginationProps): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(1);
  const handleSelected = (pageNumber: number) => {
    setSelected(pageNumber);
  };
  return (
    <div className=" w-max flex gap-x-4 items-center ">
      <div className="flex items-center gap-x-4">
        <RiArrowLeftSLine className="text-lg cursor-pointer text-light-slate-9" />

        {pages.map((page, index) => {
          return (
            index < 5 && (
              <div
                key={index}
                onClick={() => handleSelected(page)}
                className={`${
                  selected === page &&
                  "border !text-light-slate-12 border-light-orange-10 bg-light-orange-2 shadow-search"
                } cursor-pointer text-light-slate-11 transition font-medium text-sm px-[13px]  py-[6px] rounded-lg `}
              >
                {page}
              </div>
            )
          );
        })}

        <RiArrowRightSLine className="text-lg cursor-pointer text-light-slate-9" />
      </div>
      <div className="text-light-slate-9 font-medium">Total {totalPage > 999 ? humanizeNumber(totalPage) : totalPage} pages</div>
      {gotoPage && <div>GotoPage component</div>}
    </div>
  );
};
export default Pagination;
