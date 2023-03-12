import React from "react";
import { BsCheck2, BsFillCheckCircleFill } from "react-icons/bs";

interface RadioCheckProps {
  id?: string;
  children: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
  value?: string;
  className?: string;
}

const RadioCheck = ({ className, id, children, value, checked = false, onClick }: RadioCheckProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={
        `px-2 py-1.5 text-sm text-black group  rounded-md  hover:bg-light-orange-3 hover:text-light-orange-9 hover:text-slate-800 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition` +
        `${className}`
      }
    >
      <input
        type="radio"
        className="opacity-0"
        value={value}
        name="radio"
        checked={checked}
        onChange={onClick}
        id={id}
      />
      <label className="flex -mt-5 cursor-pointer item-center" htmlFor={id}>
        {checked ? (
          <BsCheck2 className="text-xl bold text-black" />
        ) : (
          <BsCheck2 className="text-xl group-hover:text-orange-300 invisible" />
        )}
        <span className="ml-3 leading-none my-auto">{children}</span>
      </label>
    </div>
  );
};

export default RadioCheck;
