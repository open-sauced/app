import { TooltipTrigger, TooltipPortal, Tooltip, TooltipContent, TooltipArrow } from "@radix-ui/react-tooltip";
import { HiOutlineInformationCircle } from "react-icons/hi";

export default function InfoTooltip({ information }: { information: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <HiOutlineInformationCircle className="text-slate-500" />
        </div>
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
