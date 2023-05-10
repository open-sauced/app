import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import clsx from "clsx";

import { Spinner } from "../SpinLoader/spin-loader";
interface SearchProps {
  name: string;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch?: (search?: string) => void;
  suggestions?: string[];
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

const suggestionsStyle = {
  "-webkit-line-clamp": "1",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical"
};

const Search = ({
  placeholder,
  name,
  value,
  autoFocus,
  className,
  onSearch,
  suggestions,
  onChange,
  isLoading
}: SearchProps): JSX.Element => {
  const [search, setSearch] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOnSearch = () => {
    onSearch?.(search);
  };

  const handleEmpty = () => {
    setSearch("");
    onSearch?.("");
    onChange?.("");
  };

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleOnSelect = (suggestion: string) => {
    setSearch(suggestion);
    onSearch?.(suggestion);
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div
      className={clsx(
        "flex items-center py-1 w-max px-3 shadow-input transition relative",
        "rounded-lg bg-white border ring-light-slate-6",
        "focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100",
        "dark:bg-dark-slate-4 dark:border-dark-slate-8 dark:ring-dark-slate-6",
        className && className
      )}
    >
      <FaSearch className="text-light-slate-9" fontSize={16} onClick={handleOnSearch} />
      <input
        className="w-full pl-2 placeholder:text-md text-md focus:outline-none placeholder:text-light-slate-9 dark:bg-dark-slate-4 dark:text-dark-slate-12"
        autoFocus={autoFocus}
        placeholder={placeholder}
        name={name}
        value={search}
        type="search"
        id={name}
        onChange={handleChange}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleOnSearch();
          }
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />

      {suggestions && suggestions.length > 0 && showSuggestions && (
        <div className="absolute left-0 z-10 w-full pb-3 bg-white border rounded-lg cursor-pointer shadow-input border-light-slate-6 top-full dark:bg-dark-slate-3 dark:border-dark-slate-8">
          {suggestions.map((suggestion, index) => (
            <div
              className="px-4 py-2 my-0.5 h-8 break-all overflow-hidden"
              style={suggestionsStyle}
              key={index}
              onClick={() => handleOnSelect(suggestion)}
            >
              <span className="pl-5 text-sm text-light-slate-9 dark:text-slate-400">{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      {search && (
        <>
          {isLoading ? (
            <Spinner className="w-5 h-5 " />
          ) : (
            <GrClose className="cursor-pointer text-light-slate-9 dark:text-dark-slate-12" fontSize={16} onClick={handleEmpty} />
          )}
        </>
      )}
    </div>
  );
};
export default Search;
