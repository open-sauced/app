import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface SelectProps {
  placeholder: string;
  error?: string;
  onChange: (e: any) => void;
  label?: string;
  options: { name: string; value: string }[];
  className?: string;
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
  const [selected, setSelected] = useState({ name: "", value: "" });
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSelected = (option: { name: string; value: string }) => {
    const { name, value } = option;
    setSelected((prev) => ({ ...prev, name, value }));
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        className
          ? className
          : "relative group  focus:border-light-orange-9 focus:ring focus:ring-light-orange-5 items-center   rounded-lg font-medium text-base text-light-slate-10"
      }`}
    >
      <div className="flex px-4 py-2 border border-light-slate-6 rounded-lg focus-within:border-light-orange-9 focus-within:ring focus-within:ring-light-orange-5 items-center">
        {label && <span className="text-base text-light-slate-9 mr-2">{label}:</span>}
        <input
          onChange={onChange}
          defaultValue={placeholder}
          value={selected.value === "" ? placeholder : selected.value}
          readOnly
          type="text"
          onClick={() => handleToggle()}
          className="w-full text-light-slate-12 focus:outline-none bg-transparent"
        />
        {isOpen ? <IoIosArrowUp className="justify-self-end" /> : <IoIosArrowDown className="justify-self-end" />}
      </div>
      {isOpen && (
        <div className="w-full border absolute font-normal ">
          {options
            ? options.map((option, index) => (
              <div
                className="font-normal hover:bg-light-orange-3 py-1 px-4 transition"
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
