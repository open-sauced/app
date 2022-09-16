import React, { ChangeEvent, useState } from "react";

interface PaginationGotoPageProps {
  currentPage: number;
  name: string;
}

const PaginationGotoPage = ({ currentPage, name }: PaginationGotoPageProps): JSX.Element => {
  const [pageNumber, setPageNumber] = useState<number | string>(currentPage);
  const handleGotoPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(pageNumber === currentPage) return;

    // logic to switch page goes here
  };

  return (
    <form onSubmit={(e) => handleGotoPage(e)} className="flex font-medium gap-x-3">
      <input
        type="text"
        name={name}
        id={name}
        placeholder={`${pageNumber}`}
        onChange={(e)=> setPageNumber(e.target.value)}
        className="min-w-4 w-10 text-center text-sm text-light-slate-10 focus:outline-none border rounded-lg py-1 px-2"
      />
      <button
        className="text-light-orange-10 text-sm px-4 py-1.5 rounded-lg hover:bg-orange-100 bg-light-orange-3"
        type="submit"
      >
        Go to page
      </button>
    </form>
  );
};
export default PaginationGotoPage;
