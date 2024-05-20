import { useState } from "react";
import { TooltipTrigger, TooltipPortal, Tooltip, TooltipContent, TooltipArrow } from "@radix-ui/react-tooltip";
import { HiOutlineInformationCircle } from "react-icons/hi";

export default function InfoTooltip({ information }: { information: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open}>
      <TooltipTrigger asChild>
        <button onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={() => setOpen(!open)}>
          <HiOutlineInformationCircle className="text-slate-500" />
        </button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="bottom"
          className="max-w-xs text-sm shadow-lg text-slate-100 px-4 py-3 rounded-xl bg-[#171E29]"
        >
          <TooltipArrow className="fill-[#171E29]" />
          {information}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
