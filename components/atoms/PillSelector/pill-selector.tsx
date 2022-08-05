import React, { useState } from "react";

interface PillSelectorButtonProps {
  className?: string;
  children?: any;
  onClick?: () => void;
}

const PillSelectorButton: React.FC<PillSelectorButtonProps> =(props) => {
  return (
    <button 
      onClick={props.onClick} 
      className="flex py-1 px-2 bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium whitespace-nowrap rounded-md drop-shadow-sm hover:bg-slate-100 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition">
      {props.children}
    </button>
  );
};

interface PillSelectorOptionProps {
  className?: string;
  children?: any;
}

const PillSelectorOption: React.FC<PillSelectorOptionProps> =(props) => {
  return (
    <button className="flex px-2 bg-slate-50 border border-slate-200 text-sm text-slate-600 font-medium whitespace-nowrap rounded-md drop-shadow-sm hover:border-orange-500 hover:text-slate-800 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition">
      {props.children}
    </button>
  );
};

interface PillSelectorProps {
  filterOptions: string[];
  className?: string;
  handlePillClick: (filter: string) => void;
}


const PillSelector: React.FC<PillSelectorProps> = ({ filterOptions, className, handlePillClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const show = isOpen ? "flex" : "hidden";
  const toggleFilter = () => setIsOpen(!isOpen);

  return (
    <div 
      className={`${className ? className : ""} inline-flex items-center max-w-full overflow-hidden gap-1 p-0.5 ${isOpen ? "bg-gray-200" : "bg-transparent" } rounded-lg transition`}>

      {/* PillSelectorButton */}
      <PillSelectorButton
        onClick={toggleFilter}>
        Add Filter
      </PillSelectorButton>

      {/* PillSelectorOptions */}
      <div className={`${show} items-center gap-1 px-1 transition`}>

        {/* PillSelectorOption */}
        {filterOptions.map((filter, index) =>
          <PillSelectorButton onClick={() => handlePillClick(filter.replaceAll(" ", "-"))} key={index}>
            {filter}
          </PillSelectorButton>
        )}
      </div>
    </div>
  );
};

export default PillSelector;