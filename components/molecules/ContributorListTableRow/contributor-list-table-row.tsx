import React, { useEffect, useState } from "react";
import DevProfile from "../DevProfile/dev-profile";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Sparkline from "components/atoms/Sparkline/sparkline";
import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";
import getPullRequestsToDays from "lib/utils/get-prs-to-days";
import { useSingleContributor } from "lib/hooks/useSingleContributor";
import { getActivity } from "../RepoRow/repo-row";
import useRepoList from "lib/hooks/useRepoList";
import { getFormattedDate } from "lib/utils/date-utils";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import Checkbox from "components/atoms/Checkbox/checkbox";
import clsx from "clsx";

interface ContributorListTableRow {
  contributor: DbRepoPR;
  topic: string;
}

function getLastContributionDate(contributions: DbRepoPR[]) {
  if (contributions.length === 0) {
    return "-";
  }
  const sortedContributions = contributions.sort((a, b) => {
    return +new Date(b.merged_at) - +new Date(a.merged_at);
  });

  return getFormattedDate(sortedContributions[0]?.merged_at);
}
const ContributorListTableRow = ({ contributor, topic }: ContributorListTableRow) => {
  const [tableOpen, setTableOpen] = useState(false);

  const { data: user } = useFetchUser(contributor.author_login);
  const { data } = useContributorPullRequests(contributor.author_login, topic, [], 30);
  const { data: contributors, isError: contributorError } = useSingleContributor(contributor.author_login);
  const repoList = useRepoList(Array.from(new Set(data.map((prData) => prData.full_name))).join(","));
  const contributorLanguageList = (contributors[0]?.langs || "").split(",");
  const days = getPullRequestsToDays(data);
  const totalPrs = data.length;
  const last30days = [
    {
      id: `last30-${contributor.repo_id}`,
      color: "hsl(63, 70%, 50%)",
      data: days,
    },
  ];
  const mergedPrs = data.filter((prData) => prData.merged);

  useEffect(() => {}, []);

  return (
    <>
      {/* Mobile version */}
      <div className="px-5 py-2 overflow-hidden odd:bg-white md:hidden even:bg-light-slate-2">
        <div className="flex items-center gap-x-3">
          <div className="w-[65%]">
            <DevProfile company={user?.company || "-"} username={contributor.author_login} />
          </div>
          <div className="w-[35%] text-normal text-light-slate-12">
            <p>
              {contributorLanguageList[0]}
              {contributorLanguageList.length > 1 ? `,+${contributorLanguageList.length - 1}` : ""}
            </p>
          </div>
          <div className="">
            <div
              onClick={() => setTableOpen(!tableOpen)}
              className="items-center justify-between w-6 h-6 p-1 border rounded-md"
            >
              {tableOpen ? <ChevronUpIcon className="" /> : <ChevronDownIcon />}
            </div>
          </div>
        </div>

        <div className={`${!tableOpen && "max-h-0"}   text-light-slate-11 text-sm transition`}>
          <div className="px-2 py-3">{last30days && <Sparkline data={last30days} width="100%" height={54} />}</div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>Act</div>
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
            <div>Last Contributed</div>
            <div className="flex gap-x-3">{<p>{getLastContributionDate(mergedPrs)}</p>}</div>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>Time Zone</div>
            <div className="flex gap-x-3">{user && user.timezone ? <p>{user.timezone}</p> : "-"}</div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}

      <div className={`${classNames.row} `}>
        {/* <Checkbox
          checked={true}
          onCheckedChange={() => console.log("yeah")}
          disabled={!user}
          title={!user ? "Connect to GitHub" : ""}
          className={`${user && "border-orange-500 hover:bg-orange-600"}`}
        /> */}

        {/* Column: Developers */}
        <div className={clsx(classNames.cols.repository, "lg:min-w-[280px] ")}>
          <DevProfile company={user?.company || "-"} username={contributor.author_login} />
        </div>

        {/* Column: Act */}
        <div className={clsx("flex-1 flex lg:max-w-[100px] w-fit  justify-center")}>{getActivity(totalPrs, false)}</div>

        {/* Column Repositories */}
        <div className={clsx("flex-1 lg:max-w-[100px] flex justify-center ")}>{repoList.length}</div>

        {/* Column: Last Contribution */}
        <div className={clsx("flex-1 lg:min-w-[130px] flex justify-center ")}>
          <div className="flex">{<p>{getLastContributionDate(mergedPrs)}</p>}</div>
        </div>

        {/* Column: Language */}
        <div className={clsx("flex-1 hidden lg:min-w-[140px]  justify-center lg:flex")}>
          {contributorLanguageList.length > 0 ? (
            <p>
              {contributorLanguageList[0]}
              {contributorLanguageList.length > 1 ? `,+${contributorLanguageList.length - 1}` : ""}
            </p>
          ) : (
            "-"
          )}
        </div>

        {/* Column: Time Zone */}
        <div className={clsx("flex-1 hidden lg:max-w-[80px] justify-center   lg:flex ")}>
          <div className="flex gap-x-3">{user && user.timezone ? <p>{user.timezone}</p> : "-"}</div>
        </div>

        {/* Column: Contributions */}
        <div className={clsx("flex-1 hidden justify-center  lg:flex lg:max-w-[120px]")}>
          <p>{mergedPrs.length}</p>
        </div>
        {/* Column Last 30 Days */}
        <div className={clsx("flex-1 lg:min-w-[150px] hidden lg:flex justify-center")}>
          {last30days ? <Sparkline data={last30days} width="100%" height={54} /> : "-"}
        </div>
      </div>
    </>
  );
};

export default ContributorListTableRow;
