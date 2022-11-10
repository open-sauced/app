import Link from "next/link";

import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { User } from "@supabase/supabase-js";

import { getRelativeDays } from "lib/utils/date-utils";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import getRepoInsights from "lib/utils/get-repo-insights";

import CardRepoList from "../CardRepoList/card-repo-list";
import Text from "components/atoms/Typography/text";

interface InsightRowProps {
  user: User | null;
  insight: DbUserInsight;
}
const InsightRow = ({ user, insight }: InsightRowProps) => {
  const repoIds = insight.repos.map((repo) => repo.repo_id);
  const { data: repoData, isError, isLoading } = useRepositoriesList(false, repoIds);
  const { open, merged, velocity, total, repoList } = getRepoInsights(repoData);
  return (
    <Link
      key={`insights_${insight.id}`}
      href={`/pages/${user?.user_metadata.user_name}/${insight.id}/dashboard`}
      passHref
    >
      <a className="flex flex-col md:flex-row w-full rounded-lg px-4 lg:px-8 py-5 gap-4 lg:gap-2 bg-white items-center">
        <div className="flex w-full flex-1 flex-col gap-4 lg:gap-6">
          <div className="flex items-center lg:items-center gap-4 ">
            <div className="w-4 h-4 bg-light-orange-10 rounded-full"></div>
            <div className="text-xl text-light-slate-12">{insight.name}</div>
            <div className="rounded-2xl border px-2 text-light-slate-11">
              {!!insight.is_public ? "public" : "private"}
            </div>
          </div>
          <div className="w-full truncate">
            {insight.repos && insight.repos.length > 0 && <CardRepoList limit={3} repoList={repoList} />}
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center gap-8 w-full">
            {/* Average Prs opened section */}
            <div className="flex flex-col gap-2 min-w-[120px] flex-1">
              <span className="text-xs text-light-slate-11">Avg PRs opened</span>
              <div
                className="flex text-light-grass-10 items-center  gap-6
            "
              >
                <Text className="md:!text-lg lg:!text-2xl !text-black !leading-none">{`${open} PR${
                  open > 1 ? "s" : ""
                }`}</Text>
                <p className="flex items-end">
                  <span className="leading-none">
                    {repoData.length > 0 ? getRelativeDays(Math.round(velocity / repoData.length)) : "-"}
                  </span>{" "}
                  <BsFillArrowUpCircleFill className="ml-1" />
                </p>
              </div>
            </div>

            {/* Average Pr Velocity section */}
            <div className="flex-1 gap-2 flex flex-col  min-w-[150px]">
              <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
              <div className="flex text-light-grass-10 items-center  gap-6">
                <Text className="md:!text-lg lg:!text-2xl !tracking-widest !text-black !leading-none">
                  {repoData.length > 0 ? getRelativeDays(Math.round(velocity / repoData.length)) : "-"}
                </Text>
                <p className="flex text-sm items-end">
                  <span className="leading-none">{total > 0 ? `${Math.round((merged / total) * 100)}%` : "-"}</span>{" "}
                  <BsFillArrowUpCircleFill className="ml-1" fill="green" color="green" />
                </p>
              </div>
            </div>
            <div className="flex-1 hidden md:flex  justify-end">
              <span className=" bg-light-slate-1 inline-block rounded-lg p-2.5 border">
                <MdOutlineArrowForwardIos className="text-light-slate-10 text-lg" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default InsightRow;
