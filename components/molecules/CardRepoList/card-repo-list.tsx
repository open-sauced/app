import { StaticImageData } from "next/image";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import Icon from "components/atoms/Icon/icon";
import Tooltip from "components/atoms/Tooltip/tooltip";

export interface RepoList {
  repoOwner: string;
  repoName: string;
  repoIcon: StaticImageData | string;
}

interface CardRepoListProps {
  repoList: RepoList[];
  limit?: number;
  fontSizeClassName?: string;
  total?: number;
  deletable?: boolean;
  onDelete?: (repoName: string) => void;
  onSelect?: (repoName: string) => void;
  showCursor?: boolean;
}

const CardRepoList = ({
  repoList,
  limit = 5,
  fontSizeClassName,
  total,
  deletable = false,
  onDelete = () => {},
  onSelect = () => {},
  showCursor = false,
}: CardRepoListProps): JSX.Element => {
  // The repoList is paginated, the total is the complete count
  const repoTotal = total || repoList.length;
  const sanitizedRepoList = [...new Map(repoList.map((item) => [item["repoName"], item])).values()];
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex gap-1 items-center max-w[175px] truncate flex-wrap text-xs text-light-slate-9">
      {repoList.length > 0 ? (
        <>
          {sanitizedRepoList
            .filter((_, arrCount) => arrCount < limit)
            .map(({ repoOwner, repoName, repoIcon }, index) => {
              return (
                <div
                  key={`repo_${index}`}
                  onClick={() => {
                    if (selected) {
                      onSelect(`${repoOwner}/${repoName}`);
                    } else {
                      onSelect("");
                    }
                    setSelected(!selected);
                  }}
                >
                  {repoName && repoIcon ? (
                    <Tooltip content={`${repoOwner}/${repoName}`}>
                      <div className="flex gap-1  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12">
                        <Icon IconImage={repoIcon} className="rounded-[4px] overflow-hidden" />
                        <span
                          className={`max-w-[45px] md:max-w-[100px] truncate ${fontSizeClassName} ${
                            showCursor && "cursor-pointer"
                          }`}
                        >
                          {repoName}
                        </span>
                        {deletable ? (
                          <button
                            className="flex items-center justify-center w-4 h-4 rounded-full bg-light-slate-6 hover:bg-light-slate-5 transition-colors duration-300 p-1"
                            onClick={(e) => {
                              e.preventDefault();
                              onDelete(repoName);
                            }}
                          >
                            <ImCross className="w-3 h-3 text-light-slate-12" />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          <div>{repoTotal > limit ? `+${repoTotal - limit}` : null}</div>
        </>
      ) : (
        <p className="mr-2 font-normal text-slate-400 text-sm">No repositories tagged...</p>
      )}
    </div>
  );
};

export default CardRepoList;
