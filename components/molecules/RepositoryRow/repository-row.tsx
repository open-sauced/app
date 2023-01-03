import Checkbox from "components/atoms/Checkbox/checkbox";
import { useRepositoryCommits } from "lib/hooks/useRepositoryCommits";
import { useRepositoryPRs } from "lib/hooks/useRepositoryPRs";
import humanizeNumber from "../../../lib/utils/humanizeNumber";

interface RespositoryRowProps {
  key: number;
  id: string;
  stars: number;
  size: number;
  name: string;
  tableRowClassesNoBG: string;
  allCheckboxRefs: React.MutableRefObject<HTMLElement[]>
  addCheckboxToRef: (element: any) => void;
  entireRowClickChangesCheckbox: (element: any) => void;
}

const RepositoryRow = ({
  key,
  id,
  stars,
  size,
  name,
  tableRowClassesNoBG,
  allCheckboxRefs,
  addCheckboxToRef,
  entireRowClickChangesCheckbox
}: RespositoryRowProps) => {
  const { meta: repoPrMetaData, isError: repoPrIsError, isLoading: repoPRIsLoading } = useRepositoryPRs(id);
  const { meta: repoCommitMetaData, isError: repoCommitIsError, isLoading: repoCommitIsLoading } = useRepositoryCommits(id);

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
          <Checkbox className="mt-0.5" label="" title="" />{" "}
          {name}
        </>
      </span>
      <div className="flex gap-x-2.5">
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{humanizeNumber(stars, null)}</span>
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{repoPRIsLoading || repoPrIsError ? 0 : humanizeNumber(repoPrMetaData.itemCount, null)}</span>
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{repoCommitIsLoading || repoCommitIsError ? 0 : humanizeNumber(repoCommitMetaData.itemCount, null)}</span>
        <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">{humanizeNumber(size, null)}</span>
      </div>
    </div>
  );
};

export default RepositoryRow;