import React, { useState } from "react";
import clsx from "clsx";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Sparkline from "components/atoms/Sparkline/sparkline";
import { usePullRequestsHistogram } from "lib/hooks/api/usePullRequestsHistogram";
import { getPullRequestsHistogramToDays } from "lib/utils/get-prs-to-days";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";

import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";
import useRepoList from "lib/hooks/useRepoList";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Checkbox from "components/atoms/Checkbox/checkbox";
import { getTopContributorLanguages } from "lib/utils/contributor-utils";
import { DATA_FALLBACK_VALUE } from "lib/utils/fallback-values";
import { getActivity } from "../RepoRow/repo-row";
import DevProfile from "../DevProfile/dev-profile";

interface ContributorListTableRow {
  contributor: DbPRContributor;
  topic: string;
  selected?: boolean;
  handleOnSelectContributor?: (state: boolean, contributor: DbPRContributor) => void;
  range: string;
}

function getLastContributionDate(contributions: DbRepoPREvents[]) {
  if (contributions.length === 0) {
    return "-";
  }
  const sortedContributions = contributions.sort((a, b) => {
    return +new Date(b.pr_merged_at) - +new Date(a.pr_merged_at);
  });

  return formatDistanceToNowStrict(new Date(sortedContributions[0]?.pr_merged_at), { addSuffix: true });
}

function getLastContributedRepo(pullRequests: DbRepoPREvents[]) {
  if (pullRequests.length === 0) {
    return "-";
  }
  const sortedPullRequests = pullRequests.sort((a, b) => {
    return +new Date(b.pr_updated_at) - +new Date(a.pr_updated_at);
  });

  return sortedPullRequests[0].repo_name;
}

function getLanguageAbbreviation(language: string) {
  switch (language.toLowerCase()) {
    case "javascript":
      return "JS";
    case "typescript":
      return "TS";
    case "powershell":
      return "Shell"; // Powershell is too long for our current table design
    case "batchfile":
      return "Batch"; // Batchfile is too long for our current table design
    case "vim script": // Vim script is too long for our current table design
      return "Vim";
    case "dockerfile":
      return "Docker"; // Dockerfile is too long for our current table design
    case "makefile":
      return "Make"; // Makefile is too long for our current table design
    default:
      return language;
  }
}

const ContributorListTableRow = ({
  contributor,
  topic,
  selected,
  handleOnSelectContributor,
  range,
}: ContributorListTableRow) => {
  const [tableOpen, setTableOpen] = useState(false);
  const login = contributor.author_login || contributor.username;
  const { data: user } = useFetchUser(contributor.author_login);
  const { data } = useContributorPullRequests({
    contributor: login,
    topic,
    repoIds: [],
    range,
    limit: 50,
  });
  const { data: prData } = usePullRequestsHistogram({ contributor: login, range: Number(range ?? "30"), width: 1 });

  const repoList = useRepoList(Array.from(new Set(data.map((prData) => prData.repo_name))).join(","));
  const contributorLanguageList = user ? getTopContributorLanguages(user) : [];
  const days = getPullRequestsHistogramToDays(prData, Number(range ?? 30));
  const totalPrs = days.reduce((acc, curr) => acc + curr.y, 0);
  const last30days = [
    {
      id: `last30-${login}`,
      color: "hsl(63, 70%, 50%)",
      data: days,
    },
  ];
  const mergedPrs = data.filter((prData) => prData.pr_is_merged);
  const [firstContributorLanguage, secondContributorLanguage] = contributorLanguageList;

  return (
    <>
      {/* Mobile version */}
      <div className="px-2 py-2 overflow-hidden md:px-5 odd:bg-white md:hidden even:bg-light-slate-2">
        <div className="flex items-center gap-x-3 text-light-slate-12">
          {handleOnSelectContributor && (
            <Checkbox
              checked={selected ? true : false}
              disabled={!user}
              title={!user ? "Connect to GitHub" : ""}
              onCheckedChange={(state) => handleOnSelectContributor?.(state as boolean, contributor)}
              className={`${user && "border-orange-500 hover:bg-orange-600"}`}
            />
          )}
          <div className="w-[68%]">
            <DevProfile username={login} hasBorder={!contributor.author_login} oscrRating={contributor.oscr} />
          </div>
          <div className="w-[34%] text-normal text-light-slate-11  h-full">
            <div className="flex flex-col gap-x-3">
              <p>{getLastContributionDate(mergedPrs)}</p>{" "}
              <p
                className="text-sm font-normal truncate text-light-slate-9 md:hidden lg:max-w-[8.12rem]"
                title={user?.company || getLastContributedRepo(data)}
              >
                {user?.company || getLastContributedRepo(data)}
              </p>
            </div>
          </div>
          <div>
            <div
              onClick={() => setTableOpen(!tableOpen)}
              className="items-center justify-between w-6 h-6 p-1 border rounded-md "
            >
              {tableOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </div>
        </div>

        <div className={`${!tableOpen && "max-h-0"}   text-light-slate-11 text-sm transition`}>
          <div className="px-2 py-3">{last30days && <Sparkline data={last30days} width="100%" height={54} />}</div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>Activity</div>
            {getActivity(totalPrs, false)}
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>Contributions</div>
            <div className="flex gap-x-3">
              <p>{mergedPrs.length}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>Repositories</div>
            <div className="flex gap-x-3">
              <p>{repoList.length}</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>Languages</div>
            {contributorLanguageList.length > 0 ? (
              <div>
                {firstContributorLanguage && getLanguageAbbreviation(firstContributorLanguage)}
                {secondContributorLanguage && `, ${getLanguageAbbreviation(secondContributorLanguage)}`}
              </div>
            ) : (
              <div>{DATA_FALLBACK_VALUE}</div>
            )}
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>Time Zone</div>
            <div className="flex gap-x-3">{user && user.timezone ? <p>{user.timezone}</p> : "-"}</div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}

      <div className={`${classNames.row} !gap-6 text-light-slate-11`}>
        {handleOnSelectContributor && (
          <Checkbox
            checked={selected ? true : false}
            disabled={!user}
            title={!user ? "Connect to GitHub" : ""}
            onCheckedChange={(state) => handleOnSelectContributor?.(!!state, contributor)}
            className={`${user && "border-orange-500 hover:bg-orange-600"}`}
          />
        )}

        {/* Column: Contributors */}
        <div className={clsx("flex-1 lg:min-w-[12.5rem] overflow-hidden")}>
          <DevProfile username={login} hasBorder={!contributor.author_login} oscrRating={contributor.oscr} />
        </div>

        {/* Column Repositories */}
        <div className={clsx("flex-1 lg:max-w-[6.25rem]  flex justify-center ")}>
          {contributor.author_login ? repoList.length : "-"}
        </div>

        {/* Column: Last Contribution */}
        <div className={clsx("flex-1 lg:max-w-[130px]  flex text-light-slate-11 justify-center ")}>
          <div className="flex flex-col">
            <p>{contributor.author_login ? getLastContributionDate(mergedPrs) : "-"}</p>{" "}
            <p
              className="hidden whitespace-nowrap overflow-hidden overflow-ellipsis text-sm font-normal md:inline-flex text-light-slate-9 lg:max-w-[8.12rem]"
              title={user?.company || getLastContributedRepo(data)}
            >
              {user?.company || getLastContributedRepo(data)}
            </p>
          </div>
        </div>

        {/* Column: Language */}
        <div className={clsx("flex-1 hidden lg:max-w-[7.5rem]  justify-center lg:flex")}>
          {contributorLanguageList && (
            <p>
              {firstContributorLanguage && getLanguageAbbreviation(firstContributorLanguage)}
              {secondContributorLanguage && `, ${getLanguageAbbreviation(secondContributorLanguage)}`}
            </p>
          )}
        </div>

        {/* Column: Time Zone */}
        <div className={clsx("flex-1 hidden lg:max-w-[5rem] text-light-slate-11 justify-center   lg:flex ")}>
          <div className="flex gap-x-3">
            {contributor.author_login && user && user.timezone ? <p>{user.timezone}</p> : "-"}
          </div>
        </div>

        {/* Column: Contributions */}
        <div className={clsx("flex-1 hidden justify-center  lg:flex lg:max-w-[7.5rem]")}>
          <p>{contributor.author_login ? mergedPrs.length : "-"}</p>
        </div>
        {/* Column Last 30 Days */}
        <div className={clsx("flex-1 lg:min-w-[9.37rem] hidden lg:flex justify-center")}>
          {contributor.author_login && last30days ? <Sparkline data={last30days} width="100%" height={54} /> : "-"}
        </div>
      </div>
    </>
  );
};

export default ContributorListTableRow;
