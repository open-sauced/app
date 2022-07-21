import React from "react";

interface ContextFilterButtonProps {
  className?: string;
  children?: any;
}

const ContextFilterButton: React.FC<ContextFilterButtonProps> =(props) => {
  return (
    <div>
      {props.children}
    </div>
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