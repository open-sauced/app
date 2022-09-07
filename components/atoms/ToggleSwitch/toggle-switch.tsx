import React from "react";

interface ToggleSwitchProps {
  name: string;
  checked: boolean;
  className?: string;
  handleToggle: ()=> void;
}

const ToggleSwitch = ({ name, checked = false , className , handleToggle}: ToggleSwitchProps): JSX.Element => {
  return (
    <div className={`${className ? className : ""} relative w-7 h-4 inline-block`}>
      <input type="checkbox" className="hidden" defaultChecked={checked} name={name} id={name} />
      <label className="h-full block cursor-pointer  overflow-hidden rounded-2xl" htmlFor={name}>
        <span
          className={`${
            checked ? "bg-light-orange-10 " : "bg-light-slate-8 "
          }  transition-all duration-300 block ease-in-out w-[200%] h-full `}
        />
        <span
          onClick={() => handleToggle()}
          className={`${
            checked ? "right-0" : "left-0"
          } w-3 h-3 absolute top-0 m-[2px] bg-white block rounded-full transition-all duration-300 ease-in-out`}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
