import React from "react";
import Text from "../Typography/text";
import { FiPlus } from "react-icons/fi";
interface ContextFilterButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  isSelected: boolean;
}

const ContextFilterButton: React.FC<ContextFilterButtonProps> = ({ className, children, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 py-1 px-2 bg-slate-100 border border-slate-300 text-sm text-slate-800 font-medium whitespace-nowrap rounded-md drop-shadow-sm hover:bg-slate-50 focus:outline-none focus:border-orange-500 focus:ring-orange-100 focus-visible:border-orange-500 focus:ring focus-visible:ring focus-visible:ring-orange-100 transition"
    >
      <Text className="!text-sm font-semibold tracking-tight !text-slate-900">{children}</Text>
      {!isSelected && <FiPlus onClick={onClick} />}
    </button>
  );
};

export default ContextFilterButton;
