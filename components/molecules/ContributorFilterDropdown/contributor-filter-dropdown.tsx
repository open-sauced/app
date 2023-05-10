import React, { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import Checkbox from "components/atoms/Checkbox/checkbox";

// This list might have to come in as props in future imlementations
const filterOptions: { name: string; value: string }[] = [
  { name: "Language", value: "language" },
  { name: "Timezone", value: "timezone" },
  { name: "Last Contributed", value: "last-contributed" },
  { name: "Repositories", value: "repositories" },
  { name: "Contribution", value: "contribution" },
  { name: "Last 30 Days", value: "last-30-days" },
  { name: "Activities", value: "activities" },
  { name: "Sebiority", value: "seniority" }
];

const ContributorFilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="flex flex-col px-3 border rounded-lg shadow w-max">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between text-sm font-normal cursor-pointer text-light-slate-9 w-44 "
      >
        {open ? <span>Filter: Show/Hide</span> : <span>Filter list:</span>}

        <div>
          <BiChevronUp className="text-lg translate-y-1.5" />
          <BiChevronDown className="text-lg -translate-y-1.5" />
        </div>
      </div>

      <div
        className={clsx(
          " z-50 space-y-1.5 overflow-hidden transition-all text-light-slate-12",
          open ? "h-auto pb-2" : "h-0"
        )}
      >
        {filterOptions.map(({ name, value }, i) => (
          <div key={i.toString()} className="flex items-center gap-2 text-sm ">
            <Checkbox value={value} id={name} className="w-3 h-3 gap-2" />
            <label className="font-normal" htmlFor={name}>
              {name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributorFilterDropdown;
