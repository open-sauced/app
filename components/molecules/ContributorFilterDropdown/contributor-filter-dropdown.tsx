import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const filterOptions: { name: string; value: string }[] = [
  { name: "Language", value: "language" },
  { name: "Timezone", value: "timezone" },
  { name: "Last Contributed", value: "last-contributed" },
  { name: "Repositories", value: "repositories" },
  { name: "Contribution", value: "contribution" },
  { name: "Last 30 Days", value: "last-30-days" },
  { name: "Activities", value: "activities" },
  { name: "Sebiority", value: "seniority" },
];

const ContributorFilterDropdown = () => {
  const [open, setOpen] = useState(false);
  return (
    // <DropdownMenu>
    //   <div className="flex flex-col w-44">
    //     <DropdownMenuTrigger className="px-1.5 border rounded-md w-full">
    //       <div className="flex items-center gap-20 text-sm text-light-slate-9">
    //         <span>Filter by:</span>
    //         <div className="flex flex-col ">
    //           <BiChevronUp className="text-lg translate-y-1" />
    //           <BiChevronDown className="text-lg -translate-y-1" />
    //         </div>
    //       </div>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent sideOffset={0} className="w-full ">
    //       <DropdownMenuItem>Hello</DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </div>
    // </DropdownMenu>
    <div className="flex flex-col border rounded-lg w-max">
      <div className="flex items-center text-sm text-light-slate-9 justify-between  w-44 px-1.5">
        <span>Filter list:</span>
        <div>
          <BiChevronUp className="text-lg translate-y-1" />
          <BiChevronDown className="text-lg -translate-y-1" />
        </div>
      </div>
    </div>
  );
};

export default ContributorFilterDropdown;
