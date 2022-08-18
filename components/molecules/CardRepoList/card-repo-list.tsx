import { render } from "@headlessui/react/dist/utils/render";
import Icon from "components/atoms/Icon/icon";

const REPOLISTLIMIT = 5;

interface CardRepoListProps {
  repoList: object[];
}

const CardRepoList = ({ repoList }: CardRepoListProps): JSX.Element => {
  const jsxToRender: JSX.Element[] = [];

  const renderFiveRepos = (repoList: object[]) => {
    for(let i = 0; i < REPOLISTLIMIT; i++) {
      if (!repoList[i]) break;

      const jsxElement = <div className="flex gap-2">
        <Icon IconImage={repoList[i].repoIcon} />
        {repoList[i].repoName}
      </div>;
      jsxToRender.push(jsxElement);
    }

    return jsxToRender;
  };

  return (
    <div className="flex gap-2">
      {renderFiveRepos(repoList)}
      <div>
        {repoList.length > REPOLISTLIMIT - 1 ? `+${repoList.length - REPOLISTLIMIT}` : null}
      </div>
    </div>
  );
};

export default CardRepoList;