import React from "react";

import { IconContext } from "react-icons";
import { GoDiff } from "react-icons/go";
import { BsFileDiff } from "react-icons/bs";
import { FaRegCheckCircle, FaRegDotCircle } from "react-icons/fa";

import Text from "components/atoms/Typography/text";

const LatestPrTableHeader = () => {
  return (
    <div className="flex gap-2 mt-8 items-center bg-light-slate-3 rounded-md px-2 py-1 pr-4">
      <div className="w-3/5">
        <Text className=" ">Latest PRs</Text>
      </div>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
        <div className="flex justify-end w-[calc(10%-4px)]">
          <FaRegDotCircle title="When Pull Request was created" />
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
        <div className="flex justify-end w-[calc(10%-4px)]">
          <FaRegCheckCircle title="When Pull Request was merged" />
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, strokeWidth: 0.3 } }}>
        <div className="flex justify-end w-[calc(10%-4px)]">
          <GoDiff title="Files changed in Pull Request" />
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, strokeWidth: 0.5 } }}>
        <div className="flex justify-end w-[calc(10%-4px)]">
          <BsFileDiff title="Lines changed in Pull Request" />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default LatestPrTableHeader;
