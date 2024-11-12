import { useState } from "react";
import { TooltipTrigger, TooltipPortal, Tooltip, TooltipContent, TooltipArrow } from "@radix-ui/react-tooltip";
import { HiOutlineInformationCircle } from "react-icons/hi";
export default function InfoTooltip({ information, icon }: { information: string; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Tooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>
        <button>{icon ? icon : <HiOutlineInformationCircle className="text-slate-500" />}</button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="bottom"
          className="z-50 w-fit max-w-xs text-sm shadow-lg text-slate-100 px-4 py-3 rounded-xl bg-[#171E29]"
        >
          <TooltipArrow className="fill-[#171E29]" />
          {information}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
