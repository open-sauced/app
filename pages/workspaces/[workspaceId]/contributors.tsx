import { useState } from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { SquareFillIcon } from "@primer/octicons-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { useGetWorkspaceContributors } from "lib/hooks/api/useGetWorkspaceContributors";
import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";
import { useFetchUser } from "lib/hooks/useFetchUser";
import DevProfile from "components/molecules/DevProfile/dev-profile";
import { getTopContributorLanguages } from "lib/utils/contributor-utils";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { getPullRequestsToDays } from "lib/utils/get-prs-to-days";
import Sparkline from "components/atoms/Sparkline/sparkline";
import { deleteCookie } from "lib/utils/server/cookies";
import { EmptyState } from "components/Workspaces/TrackedContributorsTable";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/workspace-utils";

type Contributor = {
  id: number;
  login: string;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    bearerToken,
    pathValidator: () => true,
  });

  if (error) {
    deleteCookie(context.res, WORKSPACE_ID_COOKIE_NAME);

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  return { props: { workspace: data } };
};

interface WorkspaceContributorsPageProps {
  workspace: Workspace;
}

export default function WorkspaceContributorsPage({ workspace }: WorkspaceContributorsPageProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [range, setRange] = useState<number>(router.query.range ? Number(router.query.range as string) : 30);

  const { data, error: hasError } = useGetWorkspaceContributors({ workspaceId: workspace.id, range });
  const contributors = data?.data
    ? Array.from(data?.data, (info) => {
        return { id: info.id, login: info.contributor.login };
      })
    : [];

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <div className="flex justify-between items-center">
        <WorkspacesTabList workspaceId={workspace.id} selectedTab={"contributors"} />
        <div>
          <DayRangePicker onDayRangeChanged={(value) => setPage(Number(value))} />
        </div>
      </div>
      <main className="p-4">
        <ClientOnly>
          {contributors ? (
            <ContributorTable contributors={contributors} range={range} />
          ) : (
            <EmptyState
              onAddContributors={() => router.push(`/workspaces/${workspace.id}/settings#load-contributors-wizard`)}
            />
          )}
        </ClientOnly>
      </main>
    </WorkspaceLayout>
  );
}

// COMPOSABLES
function ContributorTable({ contributors, range }: { contributors: Contributor[]; range: number }) {
  return (
    <section className="w-full text-sm table table-fixed border-2 border-separate rounded-lg overflow-hidden">
      <thead className="table-header-group">
        <tr className="table-row text-slate-500">
          <th className="table-cell bg-slate-100 pl-8 py-4 text-start font-normal">Name</th>
          <th className="table-cell bg-slate-100 py-4 text-start font-normal">Last Contribution</th>
          <th className="table-cell bg-slate-100 py-4 text-start font-normal">Activity</th>
          <th className="table-cell bg-slate-100 py-4 text-start font-normal">Languages</th>
          <th className="table-cell bg-slate-100 py-4 text-start font-normal">Timezone</th>
          <th className="table-cell bg-slate-100 pr-8 py-4 text-start font-normal">Contributions</th>
          <th className="table-cell bg-slate-100 pr-8 py-4 text-start font-normal">Last {range} Days</th>
        </tr>
      </thead>

      <tbody className="table-row-group">
        {contributors.map((contributor) => (
          <ContributorRow key={contributor.login} contributor={contributor} />
        ))}
      </tbody>
    </section>
  );
}

function ContributorRow({ contributor }: { contributor: Contributor }) {
  const { data: user } = useFetchUser(contributor.login);
  const { data: pullRequests } = useContributorPullRequests({
    contributor: contributor.login,
    topic: "*",
    repoIds: [],
    range: "30", // TODO: change range with filters
    mostRecent: true,
  });

  const mergedPrs = pullRequests.filter((pr) => pr.pr_is_merged);
  const contributorLanguageList = user ? getTopContributorLanguages(user) : [];

  const days = getPullRequestsToDays(pullRequests, Number(30)); // TODO: change range with filters
  const last30days = [
    {
      id: `last30-${contributor.login}`,
      color: "hsl(19, 100%, 50%)",
      data: days,
    },
  ];

  return (
    <tr key={contributor.login} className="table-row items-start">
      {/* Avatar & Name */}
      <td className="table-cell pl-8 py-2">
        <DevProfile username={contributor.login} hasBorder={false} />
      </td>

      {/* Last Contributed */}
      <td className="table-cell py-2">
        <p>{getLastContributionDate(mergedPrs)}</p>
      </td>

      {/* Activity */}
      <td className="table-cell py-2">{getActivity(pullRequests.length)}</td>

      {/* Languages */}
      <td className="table-cell py-2">
        {contributorLanguageList.length > 0 ? (
          <p className="flex gap-2">
            <span>{getLanguageAbbreviation(contributorLanguageList[0])}</span>

            {contributorLanguageList[1] && <span>{getLanguageAbbreviation(contributorLanguageList[1])}</span>}

            {contributorLanguageList.length > 2 && <span>+ {contributorLanguageList.length - 2}</span>}
          </p>
        ) : (
          <p>-</p>
        )}
      </td>

      {/* Timezone */}
      <td className="table-cell py-2">
        <div className="flex gap-x-3">{user && user.timezone ? <p>{user.timezone}</p> : "-"}</div>
      </td>

      {/* Contributions */}
      <td className="table-cell py-2">
        <p>{mergedPrs.length}</p>
      </td>

      {/* Last 30 Days (Histogram) */}
      <td className="table-cell pr-8 py-2">
        {last30days ? <Sparkline data={last30days} width="100%" height={52} /> : "-"}
      </td>
    </tr>
  );
}

// UTILS
function getLastContributionDate(contributions: DbRepoPREvents[]) {
  if (contributions.length === 0) {
    return "-";
  }
  const sortedContributions = contributions.sort((a, b) => {
    return +new Date(b.pr_merged_at) - +new Date(a.pr_merged_at);
  });

  return formatDistanceToNowStrict(new Date(sortedContributions[0]?.pr_merged_at), { addSuffix: true });
}

function getActivity(total: number) {
  // TODO: implement design, figure out "Active"
  if (total > 80) {
    return <p>High</p>;
  } else if (total >= 5 && total <= 80) {
    return <p>Medium</p>;
  } else {
    return <p>Low</p>;
  }
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
