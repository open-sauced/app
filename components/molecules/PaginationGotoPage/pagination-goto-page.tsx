import React, { useEffect, useState } from "react";

interface PaginationGotoPageProps {
  page: number;
  name: string;
  setPage: Function;
  totalPage: number;
}

const PaginationGotoPage = ({ page, name, setPage, totalPage }: PaginationGotoPageProps): JSX.Element => {
  const [pageNumber, setPageNumber] = useState<number | string>(page);
  const [value, setValue] = useState<number | string>("");
  const handleGotoPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pageNumber === page) return;
    if (pageNumber > totalPage) {
      return;
    }

    setPage(pageNumber);
    setValue("");
  };

  useEffect(() => {
    setPageNumber(page);
  }, [page]);

  return (
    <form onSubmit={(e) => handleGotoPage(e)} className="flex gap-x-3">
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        placeholder={`${pageNumber}`}
        onChange={(e) => {
          setPageNumber(e.target.value);
          setValue(e.target.value);
        }}
        className="min-w-4 w-10 text-center text-sm text-light-slate-10 focus:outline-none border rounded-lg py-1 px-2 dark:bg-dark-slate-4 dark:text-dark-slate-12 dark:border-dark-slate-8"
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
