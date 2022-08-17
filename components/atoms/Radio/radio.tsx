import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
interface RadioProps {
  id?: string | undefined;
  children?: any;
  checked?: boolean;
  onClick?: () => void;
  value?: string;
  withLabel: boolean;
  css?: string;
}

const Radio = ({ css, withLabel, id, children, value, checked = false, onClick }: RadioProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={
        `${
          checked && "!bg-light-orange-3"
        }  px-2 py-1.5 text-sm text-slate-600 font-medium group  rounded-md  hover:bg-light-orange-3 hover:text-slate-800 focus:outline-none focus-visible:border-orange-500 focus-visible:ring focus-visible:ring-orange-200 transition` +
        `${css}`
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
      <label className="flex -mt-5 cursor-pointer justify-between font-medium item-center" htmlFor={id}>
        {checked ? (
          <BsFillCheckCircleFill className="text-xl   text-light-orange-9" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-xl group-hover:text-orange-300 text-light-slate-6" />
        )}
        <span className="ml-3 leading-none my-auto">{children}</span>
        {withLabel && (
          <span className="px-1 ml-auto rounded-xl bg-light-orange-5 text-sm text-light-orange-10">
            <small>32k</small>
          </span>
        )}
      </label>
    </div>
  );
};

export default Radio;
