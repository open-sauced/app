import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import clsx from "clsx";
import Link from "next/link";
import { getAvatarByUsername } from "lib/utils/github";
import humanizeNumber from "lib/utils/humanizeNumber";
import useFetchRecommendedRepoByRepoName from "lib/hooks/fetchRecommendationByRepo";
import { truncateString } from "lib/utils/truncate-string";
import useRepositoryPullRequests from "lib/hooks/api/useRepositoryPullRequests";
import getPullRequestsContributors from "lib/utils/get-pr-contributors";
import { Spinner } from "components/atoms/SpinLoader/spin-loader";
import StackedAvatar from "../StackedAvatar/stacked-avatar";

export declare interface RecommendedRepoCardProps extends React.ComponentProps<"div"> {
  fullName: string;
}

const RecommendedRepoCard = ({ fullName, className }: RecommendedRepoCardProps): JSX.Element => {
  const [owner, name] = fullName.split("/");
  const { data, isLoading, isError } = useFetchRecommendedRepoByRepoName(owner, name);
  const { data: repositoryPullRequests, isError: pullError, meta } = useRepositoryPullRequests({ fullName });
  const contributorData = getPullRequestsContributors(repositoryPullRequests);

  return (
    <div className={clsx("relative w-full flex flex-col gap-2 p-4  bg-white border rounded-2xl ", className)}>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-36">
          <Spinner />
        </div>
      )}
      {isError && <>An error occured loading ...</>}
      {data && (
        <>
          <div className="flex justify-between w-full">
            <a target="_blank" href={`/s/${fullName}`} className="flex items-center gap-1.5">
              <picture>
                <img
                  alt="Hot Repo Icon"
                  className="w-4 h-4 overflow-hidden rounded-md"
                  src={getAvatarByUsername(owner)}
                />
              </picture>
              <span className="text-sm text-light-slate-11">{owner}</span>
            </a>
          </div>

          <div className="flex flex-col gap-2 pb-3">
            <Link className="text-xl font-semibold" href={`/s/${fullName}`} rel="noopener noreferrer">
              {name}
            </Link>

            <p title={data.description} className="w-5/6 text-sm text-gray-500">
              {truncateString(data.description, 100)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-auto text-light-slate-10">
            <div className="flex space-x-3 text-xs">
              <div className="flex items-center justify-center space-x-1 text-sm">
                <VscIssues className="fill-light-slate-10" size={16} />

                <span className="text-lightSlate11">{humanizeNumber(Number(data.issues), "abbreviation")}</span>
              </div>

              <div className="flex items-center justify-center space-x-1 text-sm">
                <AiOutlineStar className="fill-lightSlate10" size={16} />

                <span className="text-lightSlate11">{humanizeNumber(Number(data.stars), "abbreviation")}</span>
              </div>

              <div className="flex items-center justify-center space-x-1 text-sm">
                <BiGitPullRequest className="fill-lightSlate10" size={16} />

                <span className="text-lightSlate11">{humanizeNumber(meta.itemCount, "abbreviation")}</span>
              </div>
            </div>

            <StackedAvatar contributors={contributorData} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedRepoCard;
