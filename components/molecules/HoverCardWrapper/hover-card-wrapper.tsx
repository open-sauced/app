import { useRouter } from "next/router";

import { Badge } from "@supabase/ui";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";
import { getAvatarByUsername } from "lib/utils/github";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import PullRequestTable from "../PullRequestTable/pull-request-table";
import CardRepoList from "../CardRepoList/card-repo-list";
import CardProfile from "../CardProfile/card-profile";

interface HoverCardWrapperProps {
  username: string;
  repositories?: number[];
}
const HoverCardWrapper = ({ username, repositories }: HoverCardWrapperProps) => {
  const { userId } = useSupabaseAuth();
  const loggedIn = Boolean(userId);
  const router = useRouter();
  const topic = router.query.pageId as string;
  const { data: contributor } = useFetchUser(loggedIn ? username : null);
  const { repoList } = useContributorPullRequestsChart(username, "*", repositories, "30");

  const { is_maintainer, first_opened_pr_at, oscr } = contributor ?? {};

  return (
    <div className="w-[364px] bg-white gap-4 p-3 rounded-lg shadow-superlative flex flex-col">
      <div className="flex items-center justify-between">
        <CardProfile
          dateOfFirstPR={
            first_opened_pr_at ? calcDistanceFromToday(new Date(parseInt(first_opened_pr_at).toString())) : "-"
          }
          githubAvatar={getAvatarByUsername(username, 40)}
          githubName={username}
          totalPRs={repoList.length}
          isRoundedAvatar={true}
          oscr={oscr}
          loggedIn={loggedIn}
        />
        {is_maintainer && <Badge>maintainer</Badge>}
      </div>
      <div>
        <PullRequestTable isHoverCard repositories={repositories} limit={5} contributor={username} topic={topic} />
      </div>

      <div>
        <CardRepoList repoList={repoList} limit={3} />
      </div>
    </div>
  );
};

export default HoverCardWrapper;
