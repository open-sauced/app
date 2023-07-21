import * as React from "react";
import { DayPicker } from "react-day-picker";

import clsx from "clsx";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: clsx(
          "h-7 w-7 bg-transparent border inline-flex rounded-md  items-center justify-center p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: " rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center hover:bg-orange-100 hover:text-orange-700 rounded-md text-sm p-0 relative [&:has([aria-selected])]:bg-light-slate-3 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        day_selected:
          "bg-orange-100 rounded-md text-orange-700 hover:bg-orange-100 hover:text-orange-700 focus:bg-orange-100 focus:text-orange-600 focus:rounded-md",
        day_today: "bg-light-slate-3 rounded-md",
        day_outside: "opacity-50",
        day_disabled: "opacity-50",
        day_range_middle: "aria-selected:bg-light-slate-3 ",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <HiArrowSmLeft className="w-4 h-4" />,
        IconRight: ({ ...props }) => <HiArrowSmRight className="w-4 h-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
