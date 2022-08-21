import Text from "components/atoms/Typography/text";
import { IconContext } from "react-icons";
import { FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";
import { BsFileEarmarkDiff, BsFileDiff } from "react-icons/bs";

const CardTable = () => {
  return (
    <div>
      <div className="flex gap-2 items-center bg-light-slate-3 rounded-md px-8 py-4">
        <div className="w-3/5">
          <Text>
            Latest PRs
          </Text>
        </div>
        <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
          <div className="flex justify-end w-[calc(10%-4px)]">
            <FaRegDotCircle />
          </div>
        </IconContext.Provider>
        <IconContext.Provider  value={{ color: "gray", style: { width: 14, height: 14 } }}>
          <div className="flex justify-end w-[calc(10%-4px)]">
            <FaRegCheckCircle />
          </div>
        </IconContext.Provider>
        <IconContext.Provider  value={{ color: "gray", style: { width: 14, height: 14 } }}>
          <div className="flex justify-end w-[calc(10%-4px)]">
            <BsFileEarmarkDiff />
          </div>
        </IconContext.Provider>
        <IconContext.Provider  value={{ color: "gray", style: { width: 14, height: 14 } }}>
          <div className="flex justify-end w-[calc(10%-4px)]">
            <BsFileDiff />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default CardTable;