import React, { useState } from "react";
import Icon from "../Icon/icon";
import cancelIcon from "public/x-circle.svg";

interface PillSelectorButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const PillSelectorButton: React.FC<PillSelectorButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-1 py-1 px-2 bg-slate-50 border border-slate-200 text-sm text-slate-800   whitespace-nowrap rounded-md drop-shadow-sm hover:bg-slate-100 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition"
    >
      {props.children}
    </button>
  );
};

interface PillSelectorOptionProps {
  className?: string;
  children?: any;
}

const PillSelectorOption: React.FC<PillSelectorOptionProps> = (props) => {
  return (
    <button className="flex px-2 bg-slate-50 border border-slate-200 text-sm text-slate-600   whitespace-nowrap rounded-md drop-shadow-sm hover:border-orange-500 hover:text-slate-800 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition">
      {props.children}
    </button>
  );
};

interface PillSelectorProps {
  pillOptions: string[];
  handlePillClick: (filter: string) => void;
  handleCancelClick: () => void;
  className?: string;
  selected?: string;
}

const PillSelector: React.FC<PillSelectorProps> = ({
  pillOptions,
  handlePillClick,
  handleCancelClick,
  className,
  selected
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const show = isOpen ? "flex" : "hidden";
  const toggleFilter = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${
        className ? className : ""
      } inline-flex items-center max-w-[60vw] xl:max-w-full overflow-x-auto xl:overflow-hidden gap-1 p-0.5 ${
        isOpen ? "bg-gray-200" : "bg-transparent"
      } rounded-lg transition`}
    >
      {/* PillSelectorButton */}
      <PillSelectorButton>
        {selected ? (
          <>
            <div onClick={toggleFilter}>
              {pillOptions.find((option) => option.toLowerCase().replaceAll(" ", "-") === selected)}
            </div>
            <Icon IconImage={cancelIcon} onClick={handleCancelClick} />
          </>
        ) : (
          <div onClick={toggleFilter}>Add Filter</div>
        )}
      </PillSelectorButton>

      {/* PillSelectorOptions */}
      <div className={`${show} items-center gap-1 px-1 transition`}>
        {/* PillSelectorOption */}
        {pillOptions.map((pillOption, index) => (
          <PillSelectorButton
            onClick={() => {
              handlePillClick(pillOption.replaceAll(" ", "-"));
              toggleFilter();
            }}
            key={index}
          >
            {pillOption}
          </PillSelectorButton>
        ))}
      </div>
    </div>
  );
};

export default PillSelector;
