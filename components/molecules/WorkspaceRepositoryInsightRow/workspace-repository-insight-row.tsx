import Link from "next/link";

import { BsPencilFill } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { User } from "@supabase/supabase-js";

import clsx from "clsx";
import { getRelativeDays } from "lib/utils/date-utils";
import useRepositories from "lib/hooks/api/useRepositories";
import getRepoInsights from "lib/utils/get-repo-insights";
import Text from "components/atoms/Typography/text";
import Pill from "components/atoms/Pill/pill";
import Card from "components/atoms/Card/card";
import useWorkspaceRepositoryInsight from "lib/hooks/api/useWorkspaceRepositoryInsight";
import { useWorkspaceMembers } from "lib/hooks/api/useWorkspaceMembers";
import getPercent from "lib/utils/get-percent";

import CardRepoList from "../CardRepoList/card-repo-list";

interface WorkspaceRepositoryInsightRowProps {
  workspaceInsight: DbWorkspaceRepositoryInsight;
  user: User | null;
  isEditable?: boolean;
  workspaceId: string | null;
}

const WorkspaceRepositoryInsightRow = ({
  workspaceInsight,
  user,
  isEditable = true,
  workspaceId,
}: WorkspaceRepositoryInsightRowProps) => {
  const { data: insight } = useWorkspaceRepositoryInsight({ insightId: workspaceInsight.id, workspaceId });
  const { data: workspaceMembers } = useWorkspaceMembers({ workspaceId });
  const repoIds = insight?.repos.map((repo) => repo.repo_id);
  const { data: repoData, meta: repoMeta } = useRepositories(repoIds);
  const { open, merged, velocity, total, repoList } = getRepoInsights(repoData);
  const avgOpenPrs = repoData.length > 0 ? Math.round(open / repoData.length) : 0;

  const membership = workspaceMembers?.find((member) => member.user_id === Number(user?.id));
  const canEdit = membership && ["owner", "editor"].includes(membership.role);
  const publicLinkPrefix = `/workspaces/${workspaceId}/repository-insights`;
  const editLinkPrefix = `/workspaces/${workspaceId}/repository-insights`;

  return (
    <Card className="flex flex-col md:flex-row w-full rounded-lg px-4 lg:px-8 py-5 gap-4 lg:gap-2 bg-white items-center">
      <>
        <div className="flex w-full flex-1 flex-col gap-4 lg:gap-6">
          <div className="flex items-center lg:items-center gap-4 ">
            <div className="w-4 h-4 bg-light-orange-10 rounded-full"></div>
            <div className="text-xl text-light-slate-12 flex justify-between">
              <Link
                href={`${publicLinkPrefix}${
                  !workspaceId ? `/${user ? user?.user_metadata.user_name : "anonymous"}` : ""
                }/${insight?.id}/dashboard`}
              >
                {isEditable ? insight?.name : `Demo | ${insight?.name}`}
              </Link>
            </div>
            <div
              className={clsx(
                "rounded-2xl border px-2 text-light-slate-11",
                !isEditable ? "text-orange-700 bg-orange-50 border-orange-600" : ""
              )}
            >
              {!isEditable ? "demo" : !!insight?.is_public ? "public" : "private"}
            </div>
            {isEditable ? (
              <div className="flex-1 md:hidden">
                <span className=" bg-light-slate-1 inline-block rounded-lg p-2.5 border mr-2">
                  <Link href={`${editLinkPrefix}/${insight?.id}/edit`}>
                    <BsPencilFill
                      title="Edit Insight Page"
                      className="text-light-slate-10 text-md cursor-pointer w-4"
                    />
                  </Link>
                </span>
              </div>
            ) : null}
          </div>
          <div className="w-full truncate">
            {insight?.repos && insight?.repos.length > 0 && (
              <CardRepoList limit={3} repoList={repoList} total={repoMeta.itemCount} />
            )}
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
                <Text className="md:!text-lg lg:!text-2xl !text-black !leading-none">{`${avgOpenPrs} PR${
                  avgOpenPrs > 1 ? "s" : ""
                }`}</Text>
                <Pill color="green" text={`${getPercent(total, open)}%`} />
              </div>
            </div>

            {/* Average Pr Velocity section */}
            <div className="flex-1 gap-2 flex flex-col  min-w-[150px]">
              <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
              <div className="flex text-light-grass-10 items-center  gap-6">
                <Text className="md:!text-lg lg:!text-2xl !tracking-widest !text-black !leading-none">
                  {repoData.length > 0 ? getRelativeDays(Math.round(velocity / repoData.length)) : "-"}
                </Text>
                <Pill color="purple" text={`${getPercent(total, merged)}%`} />
              </div>
            </div>
            <div className="flex-1 hidden md:flex  justify-end">
              {canEdit || (
                <Link href={`${editLinkPrefix}/${insight?.id}/edit`}>
                  <span className=" bg-light-slate-1 inline-block rounded-lg p-2.5 border mr-2 cursor-pointer">
                    <BsPencilFill title="Edit Insight Page" className="text-light-slate-10 text-lg" />
                  </span>
                </Link>
              )}
              <Link
                href={`${publicLinkPrefix}${
                  !workspaceId ? `/${user ? user?.user_metadata.user_name : "anonymous"}` : ""
                }/${insight?.id}/dashboard`}
              >
                <span className=" bg-light-slate-1 inline-block rounded-lg p-2.5 border cursor-pointer">
                  <MdOutlineArrowForwardIos title="Go To Insight Page" className="text-light-slate-10 text-lg" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </>
    </Card>
  );
};

export default WorkspaceRepositoryInsightRow;
