import { IconContext } from "react-icons";
import { GoDiff } from "react-icons/go";
import { BsFileDiff } from "react-icons/bs";
import { FaRegCheckCircle, FaRegCalendar } from "react-icons/fa";

import Text from "components/atoms/Typography/text";
import Tooltip from "components/atoms/Tooltip/tooltip";

interface LatestPrTableHeaderProps {
  classNames?: string;
  isHoverCard?: boolean;
}

const LatestPrTableHeader = ({ classNames, isHoverCard }: LatestPrTableHeaderProps) => {
  return (
    <div className="flex gap-2 items-center bg-light-slate-3 rounded-md px-2 py-1 ">
      <div className="w-3/5">
        <Text className=" ">Latest PRs</Text>
      </div>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
        <div className={`${isHoverCard && "ml-auto"} justify-end w-[calc(10%-4px)]`}>
          <Tooltip content="Last Commit Date">
            <FaRegCalendar />
          </Tooltip>
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
        <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)]`}>
          <Tooltip content="Date Approved">
            <FaRegCheckCircle />
          </Tooltip>
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, strokeWidth: 0.3 } }}>
        <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)]`}>
          <Tooltip content="Files Touched">
            <GoDiff />
          </Tooltip>
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, strokeWidth: 0.5 } }}>
        <div className={`${isHoverCard ? "hidden" : "flex"} justify-end w-[calc(10%-4px)]`}>
          <Tooltip content="Lines Touched">
            <BsFileDiff />
          </Tooltip>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default LatestPrTableHeader;
