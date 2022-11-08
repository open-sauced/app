import React from "react";
import { FaSearch } from "react-icons/fa";
interface SearchProps {
  name: string;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}
const Search = ({ placeholder, name, value, autoFocus, className }: SearchProps): JSX.Element => {
  return (
    <div
      className={`${
        className && className
      } flex bg-white  py-1 w-max px-3 shadow-input border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-lg   ring-light-slate-6 items-center`}
    >
      <FaSearch className="text-light-slate-9" fontSize={16} />
      <input
        className="pl-2 w-52   placeholder:text-md  placeholder:  text-md focus:outline-none placeholder:text-light-slate-9"
        autoFocus={autoFocus}
        placeholder={placeholder}
        name={name}
        value={value}
        type="search"
        id={name}
      />
    </div>
  );
};
export default Search;
