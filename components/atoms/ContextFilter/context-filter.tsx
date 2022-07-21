import React from "react";

interface ContextFilterButtonProps {
  className?: string;
  children?: any;
}

const ContextFilterButton: React.FC<ContextFilterButtonProps> =(props) => {
  return (
    <button className="flex py-1 px-2 bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium rounded-lg drop-shadow-sm">
      {props.children}
    </button>
  );
};
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
        <div>
          Filter
        </div>
      </div>
    </div>
  );
};

export default ContextFilter;