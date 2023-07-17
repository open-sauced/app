import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "../SpinLoader/spin-loader";
import { ScrollArea, ScrollViewport } from "../ScrollArea/scroll-area";

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
  "-webkit-box-orient": "vertical",
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
  isLoading,
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
      className={`${
        className && className
      } flex bg-white  py-1 w-max px-3 shadow-input border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-lg   ring-light-slate-6 items-center relative`}
    >
      <FaSearch className="text-light-slate-9" fontSize={16} onClick={handleOnSearch} />
      <input
        className="w-full pl-2 placeholder:text-md placeholder: text-md focus:outline-none placeholder:text-light-slate-9"
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
        onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}
      />
      {suggestions && suggestions.length > 0 && showSuggestions && (
        <div className="absolute left-0 z-10 w-full pb-1 space-y-1 bg-white border rounded-lg cursor-pointer shadow-input border-light-slate-6 top-full">
          <ScrollArea type="auto">
            <ScrollViewport className="max-h-60 w-full">
              {suggestions.map((suggestion, index) => (
                <div
                  className="px-4 py-2 overflow-hidden break-all text-light-slate-9 hover:bg-light-slate-2"
                  style={suggestionsStyle}
                  key={index}
                  onClick={() => handleOnSelect(suggestion)}
                >
                  <span className="pl-5 text-sm ">{suggestion}</span>
                </div>
              ))}
            </ScrollViewport>
          </ScrollArea>
        </div>
      )}

      {search && (
        <>
          {isLoading ? (
            <Spinner className="w-5 h-5 " />
          ) : (
            <GrClose className="cursor-pointer text-light-slate-9" fontSize={16} onClick={handleEmpty} />
          )}
        </>
      )}
    </div>
  );
};
export default Search;
