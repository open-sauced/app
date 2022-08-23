import Text from "components/atoms/Typography/text";
import { IconContext } from "react-icons";
import { FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";
import { BsFileEarmarkDiff, BsFileDiff } from "react-icons/bs";
import { VscGitPullRequest,VscGitPullRequestClosed, VscGitMerge, VscGitPullRequestDraft } from "react-icons/vsc";

interface PRs {
  prStatus: string;
  prName: string;
  prIssuedTime: string;
  prClosedTime: string;
  noOfFilesChanged: number;
  noOfLinesChanged: number;
}

interface CardTableProps {
  prList: PRs[];
}

const CardTable = ({ prList }: CardTableProps) => {
  return (
    prList.length > 0 ?
      <>
        <div className="flex gap-2 items-center bg-light-slate-3 rounded-md px-2 py-1">
          <div className="w-3/5">
            <Text>
              Latest PRs
            </Text>
          </div>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <FaRegDotCircle title="When Pull Request was issued" />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <FaRegCheckCircle title="When Pull Request was merged" />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <BsFileEarmarkDiff title="Files changed in Pull Request" />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <BsFileDiff title="Lines changed in Pull Request" />
            </div>
          </IconContext.Provider>
        </div>
        {prList.map(({prName, prStatus, prIssuedTime, prClosedTime, noOfFilesChanged, noOfLinesChanged}, index) => 
          <div key={index} className="flex gap-2 items-center px-2 py-1">
            <div className="flex item-center gap-2 w-3/5">
              {prStatus === "open" ? 
                <IconContext.Provider value={{ color: "green", style: { width: 14, height: 14, marginTop: 2 } }}>
                  <VscGitPullRequest title="Open Pull Request"/>
                </IconContext.Provider>

                :

                prStatus === "closed" ? 
                  <IconContext.Provider value={{ color: "red", style: { width: 14, height: 14, marginTop: 2 } }}>
                    <VscGitPullRequestClosed title="Closed Pull Request" />
                  </IconContext.Provider>

                  :

                  prStatus === "merged" ? 
                    <IconContext.Provider value={{ color: "purple", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitMerge title="Merged Pull Request" />
                    </IconContext.Provider>

                    :

                    <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitPullRequestDraft title="Draft Pull Request" />
                    </IconContext.Provider>
              }
              <Text>
                {prIssuedTime}
              </Text>
              <Text className="!text-light-slate-12 !font-medium">
                {prName}
              </Text>
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {prIssuedTime}
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {prClosedTime}
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {noOfFilesChanged}
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {noOfLinesChanged}
            </div>
          </div>
        )}
      </>

      :

      <div className="px-2 py-1">
        There are currently no PRs...
      </div>
  );
};

export default CardTable;