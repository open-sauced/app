import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
interface SearchProps {
  name: string;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch?: (search?: string) => void;
}
const Search = ({ placeholder, name, value, autoFocus, className, onSearch }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState(value);

  const handleOnSearch = () => {
    onSearch?.(search);
  };

  const emptySearch = () => {
    setSearch("");
    onSearch?.("");
  };

  return (
    <div
      className={`${
        className && className
      } flex bg-white  py-1 w-max px-3 shadow-input border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-lg   ring-light-slate-6 items-center`}
    >
      <FaSearch className="text-light-slate-9" fontSize={16} onClick={handleOnSearch}/>
      <input
        className="pl-2 w-52   placeholder:text-md  placeholder:  text-md focus:outline-none placeholder:text-light-slate-9"
        autoFocus={autoFocus}
        placeholder={placeholder}
        name={name}
        value={search}
        type="search"
        id={name}
        onChange={(e: any) => setSearch(e.target.value)}
        onKeyUp={e => {
          if (e.code === "Enter") {
            handleOnSearch();
          }
        }}
      />
      { search && <GrClose className="text-light-slate-9" fontSize={16} onClick={emptySearch}/> }

    </div>
  );
};
export default Search;
