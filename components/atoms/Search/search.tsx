import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "../SpinLoader/spin-loader";
import { ScrollArea } from "../ScrollArea/scroll-area";

interface SearchProps {
  name: string;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch?: (search?: string) => void;
  suggestions?: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
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
  onSelect,
}: SearchProps): JSX.Element => {
  const [cursor, setCursor] = useState(-1);
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
    if (onSelect) {
      onSelect(suggestion);
      setSearch("");
    } else {
      setSearch(suggestion);
      onSearch?.(suggestion);
    }

    setShowSuggestions(false);
    setCursor(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyboardCtrl: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const resultsCount = suggestions?.length || 0;

    if (resultsCount && e.key === "ArrowUp") {
      e.preventDefault();
      setCursor(cursor === 0 ? Math.min(resultsCount - 1, 9) : cursor - 1);
    }

    if (resultsCount && e.key === "ArrowDown") {
      e.preventDefault();
      setCursor(cursor === Math.min(resultsCount - 1, 9) ? 0 : cursor + 1);
    }

    if (resultsCount && e.key === "Enter") {
      e.preventDefault();
      if (document.querySelector("._cursorActive")) {
        const span = document.querySelector("._cursorActive span") as HTMLElement;
        handleOnSelect(span.innerText);
        setCursor(-1);
      }
    }
  };

  return (
    <div
      className={`${
        className && className
      } flex bg-white  py-1 w-60 px-3 shadow-input border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-lg   ring-light-slate-6 items-center relative`}
    >
      <FaSearch className="text-light-slate-9" fontSize={16} onClick={handleOnSearch} />
      <input
        className="w-full pl-2 placeholder:text-sm focus:outline-none placeholder:text-slate-400"
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
        onKeyDown={handleKeyboardCtrl}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}
      />
      {suggestions && suggestions.length > 0 && showSuggestions && (
        <div className="absolute left-0 z-10 w-full pb-1 space-y-1 bg-white border rounded-lg cursor-pointer shadow-input border-light-slate-6 top-full">
          <ScrollArea type="auto" className="h-60">
            {suggestions.map((suggestion, index) => (
              <div
                className={clsx(
                  cursor === index && "_cursorActive bg-slate-100",
                  "px-4 py-2 overflow-hidden break-all text-light-slate-9 hover:bg-light-slate-2"
                )}
                style={suggestionsStyle}
                key={index}
                onClick={() => handleOnSelect(suggestion)}
              >
                <span className="pl-5 text-sm ">{suggestion}</span>
              </div>
            ))}
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
