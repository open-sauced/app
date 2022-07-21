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
    <div>Context Filter</div>
  );
};

export default ContextFilter;