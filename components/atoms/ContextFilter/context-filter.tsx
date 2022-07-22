import React, { useState } from "react";

interface ContextFilterButtonProps {
  className?: string;
  children?: any;
  onClick?: any;
}

const ContextFilterButton: React.FC<ContextFilterButtonProps> =(props) => {
  return (
    <button 
      onClick={props.onClick} 
      className="flex py-1 px-2 bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium whitespace-nowrap rounded-md drop-shadow-sm hover:bg-slate-100 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition">
      {props.children}
    </button>
  );
};

interface ContextFilterOptionProps {
  className?: string;
  children?: any;
}

const ContextFilterOption: React.FC<ContextFilterOptionProps> =(props) => {
  return (
    <button className="flex px-2 bg-slate-50 border border-slate-200 text-sm text-slate-600 font-medium whitespace-nowrap rounded-md drop-shadow-sm hover:border-orange-500 hover:text-slate-800 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition">
      {props.children}
    </button>
  );
};

interface ContextFilterProps {
    className?: string;
}


const ContextFilter: React.FC<ContextFilterProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const show = isOpen ? "flex" : "hidden";

  return (
    <div 
      className={`inline-flex items-center max-w-full overflow-hidden hover:overflow-x-scroll gap-1 p-0.5 ${isOpen ? "bg-gray-200" : "bg-transparent" } rounded-lg transition`}>

      {/* ContextFilterButton */}
      <ContextFilterButton
        onClick={() => setIsOpen(!isOpen)}>
        Add Filter
      </ContextFilterButton>

      {/* ContextFilterOptions */}
      <div className={`${show} items-center gap-1 px-1 transition`}>

        {/* ContextFilterOption */}
        <ContextFilterOption>
          Top 1k Repos
        </ContextFilterOption>
        <ContextFilterOption>
          +5 Contributors
        </ContextFilterOption>
        <ContextFilterOption>
          1k Stars
        </ContextFilterOption>
        <ContextFilterOption>
          Most Active
        </ContextFilterOption>
        <ContextFilterOption>
          Most Spammed
        </ContextFilterOption>
      </div>
    </div>
  );
};

export default ContextFilter;