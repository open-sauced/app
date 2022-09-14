import Checkbox from "components/atoms/Checkbox/checkbox";
import humanizeNumber from "../../../lib/utils/humanizeNumber";

interface RespositoryRowProps {
  tableRowClassesNoBG: string;
  key: number;
  addCheckboxToRef: (element: any) => void;
  entireRowClickChangesCheckbox: (element: any) => void;
  stars: number;
  size: number;
  name: string;
  allCheckboxRefs: React.MutableRefObject<HTMLElement[]>
}

const RepositoryRow = ({
  tableRowClassesNoBG,
  key,
  addCheckboxToRef,
  entireRowClickChangesCheckbox,
  stars,
  size,
  name,
  allCheckboxRefs
}: RespositoryRowProps) => {
  return (
    <div
      className={tableRowClassesNoBG}
      key={key}
      ref={(element) => addCheckboxToRef(element)}
      onClick={(event: any) => {
        const isNotCheckbox = event.target.getAttribute("type") !== "checkbox";
        if (isNotCheckbox) entireRowClickChangesCheckbox(allCheckboxRefs.current[key]);
      }}
    >
      <></>
      <span className="flex w-1/5 xs:w-2/5 overflow-hidden whitespace-nowrap text-ellipsis md:w-fit flex-row align-middle text-left p-2">
        <>
          <Checkbox className="mt-0.5" label="" />{" "}
          {name}
        </>
      </span>
      <div className="flex gap-x-2.5">
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{humanizeNumber(stars, null)}</span>
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{humanizeNumber(12, null)}</span>
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{humanizeNumber(1234, null)}</span>
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{humanizeNumber(size, null)}</span>
      </div>
    </div>
  );
};

export default RepositoryRow;