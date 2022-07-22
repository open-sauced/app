import React from "react";

interface ContextFilterButtonProps {
  className?: string;
  children?: any;
}

const ContextFilterButton: React.FC<ContextFilterButtonProps> =(props) => {
  return (
    <button className="flex py-1 px-2 bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium whitespace-nowrap rounded-md drop-shadow-sm hover:bg-slate-100 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition">
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
  return (
    <div className="flex items-center">

      {/* ContextFilterButton */}
      <ContextFilterButton>
        Add Filter
      </ContextFilterButton>

      {/* ContextFilterOptions */}
      <div className="flex items-center py-1 px-2">

        {/* ContextFilterOption */}
        <ContextFilterOption>
          Top 1k Repos
        </ContextFilterOption>
      </div>
    </div>
  );
};

export default ContextFilter;