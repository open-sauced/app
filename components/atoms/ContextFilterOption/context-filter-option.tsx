import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
interface ContextFilterOptionProps {
  children?: any;
  isSelected?: boolean;
  onClick?: () => void;
}

const ContextFilterOption: React.FC<ContextFilterOptionProps> = ({ children, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isSelected && "bg-light-orange-3"
      } flex w-full px-2 py-1.5  text-sm text-slate-600   whitespace-nowrap rounded-md  cursor-pointer     hover:bg-light-orange-3 hover:text-slate-800 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition`}
    >
      <div className="flex w-full items-center">
        {isSelected ? (
          <BsFillCheckCircleFill className="text-xl  text-light-orange-9" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-xl  stroke-light-orange-2 stroke-1 text-light-slate-6" />
        )}
        <span className="ml-2">{children}</span>
        <span className="px-1 ml-auto rounded-xl bg-light-orange-5 text-sm text-light-orange-10">
          <small>32k</small>
        </span>
      </div>
    </button>
  );
};

export default ContextFilterOption;
