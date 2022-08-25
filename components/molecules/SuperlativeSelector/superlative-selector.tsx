import ContextFilterButton from "components/atoms/ContextFilterButton/context-filter-button";
import ContextFilterOption from "components/atoms/ContextFilterOption/context-filter-option";
import React, { useState } from "react";
import Icon from "../../atoms/Icon/icon";
import cancelIcon from "public/x-circle.svg";
import Radio from "components/atoms/Radio/radio";
interface SuperlativeSelectorProps {
  filterOptions: string[];
  handleFilterClick: (filter: string) => void;
  handleCancelClick: () => void;
  className?: string;
  selected?: string;
}
const SuperativeSelector: React.FC<SuperlativeSelectorProps> = ({
  filterOptions,
  handleFilterClick,
  handleCancelClick,
  selected
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-max relative">
      <ContextFilterButton isSelected={selected ? true : false}>
        {selected ? (
          <div className="flex">
            <div className="flex" onClick={toggleFilter}>
              <span className="text-dark-slate-10">Filtered by:</span>
              <div className="ml-1 text-light-slate-12">
                {filterOptions.find((option) => option.toLowerCase().replaceAll(" ", "-") === selected)}
              </div>
            </div>
            <Icon
              className="ml-2"
              IconImage={cancelIcon}
              onClick={() => {
                handleCancelClick();
                toggleFilter();
              }}
            />
          </div>
        ) : (
          <div onClick={toggleFilter}>Add Filter</div>
        )}
      </ContextFilterButton>
      {isOpen && (
        <div className="absolute -left-full md:left-0 space-y-1 mt-1 shadow-superlative w-64 z-10 bg-white rounded-lg px-1.5 py-2">
          {filterOptions.length > 0 &&
            filterOptions.map((option, index) => (
              <Radio
                withLabel={true}
                key={index}
                onClick={() => {
                  handleFilterClick(option.replaceAll(" ", "-"));
                  toggleFilter();
                }}
                css="!w-full"
                checked={selected === option.toLocaleLowerCase().replaceAll(" ", "-") ? true : false}
              >
                {option}
              </Radio>
            ))}
        </div>
      )}
    </div>
  );
};

export default SuperativeSelector;
