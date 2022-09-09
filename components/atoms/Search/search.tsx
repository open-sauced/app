import React from "react";
import { FaSearch } from "react-icons/fa";
interface SearchProps {
  name: string;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
}
const Search = ({ placeholder, name, value , autoFocus}: SearchProps): JSX.Element => {
  return (
    <div className="flex  py-2 w-max px-3 shadow-search border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-lg   ring-light-slate-6 items-center">
      <FaSearch className="text-light-slate-9" fontSize={18} />
      <input
        className="pl-2 w-52  placeholder:text-md  placeholder:font-medium text-md focus:outline-none placeholder:text-light-slate-9"
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
