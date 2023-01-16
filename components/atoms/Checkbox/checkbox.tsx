import React, { HTMLAttributes } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@primer/octicons-react";

interface CheckboxProps {
  //Add additional prop definitions here
  title: string;
  name: string;
  label: string;
  value?: string | number | readonly string[];
  defaultChecked?: boolean;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ title, name, label, value, defaultChecked }) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox.Root
        id={name}
        title={title}
        defaultChecked={defaultChecked}
        value={value}
        className="w-5 h-5 bg-light-slate-4 rounded-sm border border-light-slate-8"
      >
        <Checkbox.Indicator className="flex justify-center items-center">
          <CheckIcon className="text-red-400" size={16} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="cursor-pointer text-sm text-light-slate-11" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
