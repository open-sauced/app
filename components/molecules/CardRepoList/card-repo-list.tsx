import Icon from "components/atoms/Icon/icon";
import { StaticImageData } from "next/image";

export interface RepoList {
  repoName: string;
  repoIcon: StaticImageData | string;
}

interface CardRepoListProps {
  repoList: RepoList[];
  limit?: number;
}

const CardRepoList = ({ repoList, limit = 5 }: CardRepoListProps): JSX.Element => {
  const sanitizedRepoList = [...new Map(repoList.map((item) => [item["repoName"], item])).values()];
  return (
    <div className="flex gap-2 items-center flex-wrap text-xs text-light-slate-11">
      {
        repoList.length > 0 ?
          <>
            {
              sanitizedRepoList
                .filter((repo, arrCount) => arrCount < limit)
                .map(({repoName, repoIcon}, index) =>
                  <div key={index} title={repoName} className="flex gap-1  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12">
                    <Icon IconImage={repoIcon} className="rounded-[4px] overflow-hidden" />
                    <span className="max-w-[45px] md:max-w-[100px] truncate">{repoName}</span>
                  </div>
                )
            }
            <div>
              {repoList.length > limit ? `+${repoList.length - limit}` : null}
            </div>
          </>

          :

          <>
            No repositories currently...
          </>
      }
    </div>
  );
};

export default CardRepoList;
