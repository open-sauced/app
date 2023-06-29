
import React, { useEffect, useRef, useState } from "react";
import ContextFilterButton from "components/atoms/ContextFilterButton/context-filter-button";
import cancelIcon from "img/x-circle.svg";
import Radio from "components/atoms/Radio/radio";
import humanizeNumber from "lib/utils/humanizeNumber";
import getFilterKey from "lib/utils/get-filter-key";
import Icon from "../../atoms/Icon/icon";

interface SuperlativeSelectorProps {
  filterOptions: string[];
  filterValues: { [name: string]: number | undefined };
  handleFilterClick: (filter: string) => void;
  handleCancelClick: () => void;
  className?: string;
  selected?: string;
}

const SuperativeSelector: React.FC<SuperlativeSelectorProps> = ({
  filterOptions,
  filterValues,
  handleFilterClick,
  handleCancelClick,
  selected
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  const filterOption = filterOptions.find((option) => getFilterKey(option) === selected);
  const filterDescription = filterOption ? filterOption : selected;

  return (
    <div className="truncate" ref={ref}>
      <ContextFilterButton onClick={toggleFilter} isSelected={!!selected}>
        {selected ? (
          <div className="flex" onClick={toggleFilter}>
            <span className="inline-block text-dark-slate-10">Filtered by:</span>
            <div className="block truncate pr-4 ml-1 text-light-slate-12">
              {filterDescription}

              <Icon
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                IconImage={cancelIcon}
                onClick={() => {
                  handleCancelClick();
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div onClick={toggleFilter}>Add Filter </div>
        )}
      </ContextFilterButton>
      {isOpen && (
        <div className="absolute transform -translate-x-1/3 md:translate-x-0 space-y-1 mt-1 shadow-superlative z-10 w-72 bg-white rounded-lg px-1.5 py-2">
          {filterOptions.length > 0 &&
            filterOptions.map((option, index) => {
              const filterKey = getFilterKey(option);
              const filterValue = filterValues[filterKey];

              return (
                <Radio
                  withLabel={filterValue ? humanizeNumber(filterValue, "abbreviation") : "-"}
                  key={index}
                  onClick={() => {
                    handleFilterClick(filterKey);
                    toggleFilter();
                  }}
                  className="!w-full"
                  checked={selected === filterKey ? true : false}
                >
                  {option}
                </Radio>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SuperativeSelector;
