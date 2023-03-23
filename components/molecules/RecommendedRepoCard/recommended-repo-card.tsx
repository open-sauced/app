import humanizeNumber from "lib/utils/humanizeNumber";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { getAvatarByUsername } from "lib/utils/github";
import StackedAvatar from "../StackedAvatar/stacked-avatar";

export declare interface RecommendedRepoCardProps {
  fullname: string;
  description: string;
  issues: number;
  stars: number;
  pullRequests: number;
  contributions: DbContribution[];
}

const RecommendedRepoCard = ({ fullname, description, issues, pullRequests, stars, contributions }: RecommendedRepoCardProps): JSX.Element => {

  const [owner, name] = fullname.split("/");

  return (
    <div className="p-4 border rounded-2xl bg-white w-full min-w-fit space-y-1 relative">
      <div className="flex justify-between w-full">
        <div className="flex space-x-1 items-center">
          <img
            alt="Hot Repo Icon"
            className="h-4 w-4 rounded-md overflow-hidden"
            src={getAvatarByUsername(owner)}
          />

          <span className="text-sm font-medium text-lightSlate11">
            {owner}
          </span>
        </div>
      </div>

      <div className="flex flex-col pb-10">
        <a
          className="text-xl font-semibold"
          href={`https://insights.opensauced.pizza/hot/repositories/filter/${fullname}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {name}
        </a>

        <p className="text-gray-500 font-medium text-xs w-5/6">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between flex-wrap">
        <div className="flex space-x-3 text-xs">
          <div className="flex text-sm space-x-1 justify-center items-center">
            <VscIssues
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">
              {humanizeNumber(issues, "abbreviation")}
            </span>
          </div>

          <div className="flex text-sm space-x-1 justify-center items-center">
            <AiOutlineStar
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">
              {humanizeNumber(stars, "abbreviation")}
            </span>
          </div>

          <div className="flex text-sm space-x-1 justify-center items-center">
            <BiGitPullRequest
              className="fill-lightSlate10"
              size={16}
            />

            <span className="text-lightSlate11">{humanizeNumber(pullRequests, "abbreviation")}</span>
          </div>
        </div>

        <StackedAvatar contributors={contributions} />
      </div>
    </div>
  );
};

export default RecommendedRepoCard;
