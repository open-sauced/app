import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface SelectProps {
  placeholder: string;
  error?: string;
  onChange?: Function;
  label?: string;
  options: { name: string; value: any }[];
  className?: string;

}

type SelectedState = {
  name: string,
  value: any
}
const Select = ({
  placeholder = "Select an option",
  options,
  error, // don't know if this is necessary
  label,
  className,
  onChange
}: SelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectedState>({ name: "", value: "" });
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSelected = (option: { name: string; value: any }) => {
    const { name, value } = option;
    setSelected((prev) => ({ ...prev, name, value }));
    onChange?.(value);
    setIsOpen(false);
  };


  return (
    <div
      className={`${
        className
          ? className
          : "relative bg-white cursor-pointer  focus:border-light-orange-9 focus:ring focus:ring-light-orange-5 items-center   rounded-lg font-medium text-base text-light-slate-10"
      }`}
    >
      <div onClick={()=> handleToggle()} className="flex px-4 py-1.5 border border-light-slate-6 rounded-lg focus-within:border-light-orange-9 focus-within:ring focus-within:ring-light-orange-5 items-center">
        {label && <span className="text-sm text-light-slate-9 mr-2">{label}:</span>}
        <input
          value={selected.name === "" ? placeholder : selected.name}
          readOnly
          type="text"
          className="w-full text-sm cursor-pointer text-light-slate-12 focus:outline-none bg-transparent"
        />
        <div className=" w-6 h-4 relative overflow-hidden"> <RiArrowUpSLine className="absolute bottom-1" />  <RiArrowDownSLine className="absolute top-1 font-medium" /></div>
      </div>
      {isOpen && (
        <div className="w-full transition bg-white overflow-hidden z-50 rounded-lg border shadow-superlative absolute font-normal ">
          {options
            ? options.map((option, index) => (
              <div
                className="font-medium cursor-pointer text-sm text-light-slate-12 hover:text-light-orange-11 hover:bg-light-orange-3 py-1 px-4 transition"
                onClick={() => handleSelected(option)}
                key={index}
              >
                {option.name}
              </div>
            ))
            : "No options"}
        </div>
      )}
    </div>
  );
};
export default Select;
