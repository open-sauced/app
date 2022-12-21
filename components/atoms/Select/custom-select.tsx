import * as Select from "@radix-ui/react-select";
import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { MdCheck } from "react-icons/md";

// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface SelectProps {
  placeholder: string;
  error?: string;
  onChange?: Function;
  label?: string;
  options: { name: string; value: any }[];
  className?: string;
}

type SelectedState = {
  name: string;
  value: any;
};


const CustomSelect = ({
  placeholder = "10 per page",
  options,
  error, // TODO: see if this is necessary, probably not
  label,
  className, // TODO: use className with clsx
  onChange
}: SelectProps): JSX.Element => {
  // TODO: remove this console.log
  console.log({options, label, className});

  return (
    <Select.Root>
      {/* TODO: add an outline orange color on focus */}
      <Select.Trigger
        aria-label="Select a limit"
        // TODO: what does these focus-within classes do? Hummm
        className="inline-flex px-4 bg-white border border-light-slate-6 rounded-lg focus-within:border-light-orange-9 focus-within:ring focus-within:ring-light-orange-5 items-center"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          {/* TODO: remove these borders */}
          <RiArrowUpSLine className="border border-red-400" />
          <RiArrowDownSLine className="border border-red-400" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        {/* TODO: fix dropdown position */}
        <Select.Content className="bg-white overflow-hidden rounded-lg border shadow-superlative font-normal top-12 absolute w-48">
          <Select.Viewport className="p-2 text-center">
            {options ?
              options.map((option, index) => (
                <Select.Item
                // TODO: not safe to use index as key, change it
                  key={index}
                  className="group flex items-center text-sm text-light-slate-12 relative pl-8 pr-5 py-1.5 rounded-md outline-none hover:bg-light-orange-9 hover:text-white"
                  value={option.name}
                  onClick={() => onChange?.(option.value)}
                >
                  <Select.ItemText>{option.name}</Select.ItemText>
                  <Select.ItemIndicator
                    className="absolute left-0 inline-flex items-center justify-center w-4"
                  >
                    <MdCheck
                      className="ml-2 text-light-orange-9 group-hover:text-white" size="sm"
                    />
                  </Select.ItemIndicator>
                </Select.Item>
              ))
              : "No options"
            }
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CustomSelect;

// return (
//   <div
//     className={`${
//       className
//         ? className
//         : "relative bg-white cursor-pointer  focus:border-light-orange-9 focus:ring focus:ring-light-orange-5 items-center overflow-x-hidden  rounded-lg   text-base text-light-slate-10"
//     }`}
//   >
//     <div
//       onClick={() => handleToggle()}
//       className="flex px-4 py-1.5 bg-white border border-light-slate-6 rounded-lg focus-within:border-light-orange-9 focus-within:ring focus-within:ring-light-orange-5 items-center"
//     >
//       {label && <span className="text-sm inline-flex text-light-slate-9 mr-2">{label}:</span>}
//       <input
//         value={selected.name === "" ? placeholder : selected.name}
//         readOnly
//         type="text"
//         className="overflow-scroll text-sm cursor-pointer text-light-slate-12 focus:outline-none bg-transparent"
//       />
//       <div className="w-6 h-4 relative overflow-hidden">
//         {" "}
//         <RiArrowUpSLine className="absolute bottom-1" /> <RiArrowDownSLine className="absolute top-1  " />
//       </div>
//     </div>
// {isOpen && (
//   <div className="relative w-full">
//     <div className="left-0 right-0 transition bg-white overflow-hidden z-50 rounded-lg border shadow-superlative absolute font-normal ">
//       {options
//         ? options.map((option, index) => (
//           <div
//             className="  cursor-pointer text-sm text-light-slate-12 hover:text-light-orange-11 hover:bg-light-orange-3 py-2 md:py-1 px-4 transition"
//             onClick={() => handleSelected(option)}
//             key={index}
//           >
//             {option.name}
//           </div>
//         ))
//         : "No options"}
//     </div>
//   </div>
// );}
//   </div>
// );
