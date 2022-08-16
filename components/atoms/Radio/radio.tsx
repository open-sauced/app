import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
interface RadioProps {
  id: string | undefined;
  label: string | React.ReactElement;
  checked: boolean;
  onClick: () => void;
  value: string;
}

const Radio: React.FC<RadioProps> = ({ id, label, value, checked = false, onClick }: RadioProps) => {
  return (
    <div className="w-max px-2 rounded-md py-2 text-orange-3">
      <input
        type="radio"
        className="opacity-0"
        value={value}
        name="radio"
        checked={checked}
        onChange={onClick}
        id={id}
      />
      <label className="flex -mt-6 cursor-pointer justify-between font-medium item-center" htmlFor={id}>
        {checked ? (
          <BsFillCheckCircleFill className="text-xl   text-light-orange-9" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-xl text-light-slate-6" />
        )}
        <span className="ml-3 leading-none mt-0.5 ">{label}</span>
      </label>
    </div>
  );
};

export default Radio;
