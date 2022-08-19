import Icon from "components/atoms/Icon/icon";
import { StaticImageData } from "next/image";

const REPOLISTLIMIT = 5;

interface RepoList {
  repoName: string;
  repoIcon: StaticImageData;
}

interface CardRepoListProps {
  repoList: RepoList[];
}

const CardRepoList = ({ repoList }: CardRepoListProps): JSX.Element => {
  const jsxToRender: JSX.Element[] = [];

  const renderListOfRepos = (repoList: RepoList[]) => {
    for(let i = 0; i < REPOLISTLIMIT; i++) {
      if (!repoList[i]) break;

      const jsxElement = <div className="flex gap-2 p-1 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12">
        <Icon IconImage={repoList[i].repoIcon} />
        {repoList[i].repoName}
      </div>;
      jsxToRender.push(jsxElement);
    }

    return jsxToRender;
  };

  return (
    <div className="flex gap-2 items-center font-medium text-xs text-light-slate-11">
      {
        repoList.length > 0 ?
          <>
            {renderListOfRepos(repoList)}
            <div>
              {repoList.length > REPOLISTLIMIT - 1 ? `+${repoList.length - REPOLISTLIMIT}` : null}
            </div>
          </>

          :

          <>
            No contributions currently...
          </>
      }
    </div>
  );
};

export default CardRepoList;