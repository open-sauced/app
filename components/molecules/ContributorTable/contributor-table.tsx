import Text from "components/atoms/Typography/text";
import { IconContext } from "react-icons";
import { FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";
import { BsFileEarmarkDiff, BsFileDiff } from "react-icons/bs";
import { VscGitPullRequest,VscGitPullRequestClosed, VscGitMerge, VscGitPullRequestDraft } from "react-icons/vsc";

interface PRs {
  prStatus: string;
  prName: string;
  item1: string;
  item2: string;
  item3: number;
  item4: number;
}

interface CardTableProps {
  prList: PRs[];
}

const CardTable = ({ prList }: CardTableProps) => {
  return (
    prList.length > 0 ?
      <>
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
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <FaRegCheckCircle />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <BsFileEarmarkDiff />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
            <div className="flex justify-end w-[calc(10%-4px)]">
              <BsFileDiff />
            </div>
          </IconContext.Provider>
        </div>
        {prList.map(({prName, prStatus, item1, item2, item3, item4}, index) => 
          <div key={index} className="flex gap-2 items-center px-8 py-4">
            <div className="flex item-center gap-2 w-3/5">
              {prStatus === "open" ? 
                <IconContext.Provider value={{ color: "green", style: { width: 14, height: 14, marginTop: 2 } }}>
                  <VscGitPullRequest/>
                </IconContext.Provider>

                :

                prStatus === "closed" ? 
                  <IconContext.Provider value={{ color: "red", style: { width: 14, height: 14, marginTop: 2 } }}>
                    <VscGitPullRequestClosed />
                  </IconContext.Provider>

                  :

                  prStatus === "merged" ? 
                    <IconContext.Provider value={{ color: "purple", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitMerge />
                    </IconContext.Provider>

                    :

                    <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14, marginTop: 2 } }}>
                      <VscGitPullRequestDraft />
                    </IconContext.Provider>
              }
              <Text>
                {item1}
              </Text>
              <Text className="!text-light-slate-12 !font-medium">
                {prName}
              </Text>
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {item1}
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {item2}
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {item3}
            </div>
            <div className="flex justify-end w-[calc(10%-4px)]">
              {item4}
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