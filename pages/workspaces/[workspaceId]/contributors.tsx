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
    if (error.status === 404) {
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
  const range = router.query.range ? Number(router.query.range as string) : 30;
  const { data, error: hasError } = useGetWorkspaceContributors({ workspaceId: workspace.id, range });

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
          <DayRangePicker />
        </div>
      </div>
      <ClientOnly>{contributors ? <ContributorTable contributors={contributors} /> : <p>Loading...</p>}</ClientOnly>
    </WorkspaceLayout>
  );
}

// COMPOSABLES
function ContributorTable({ contributors }: { contributors: Contributor[] }) {
  // TODO: change to table? or grid cols?
  // TODO: implement table headers
  return (
    <section className="m-4 border p-4 rounded-lg">
      <ol className="grid grid-cols-1 gap-6">
        {contributors.map((contributor) => (
          <ContributorRow key={contributor.login} contributor={contributor} />
        ))}
      </ol>
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

  // TODO: determine how to render histogram data
  /*
  const days = getPullRequestsToDays(pullRequests, Number(30)); // TODO: change range with filters
  const histogramData = usePullRequestsHistogram({ contributor: contributor.login });
  console.log({ days, histogramData });
  */

  // TODO: change to <td>? align with table headers
  return (
    <li key={contributor.login} className="flex justify-between gap-8 items-center h-fit">
      {/* Avatar & Name */}
      <section className="flex gap-4">
        <DevProfile username={contributor.login} hasBorder={false} />
      </section>

      {/* Last Contributed */}
      <section>
        <p>{getLastContributionDate(mergedPrs)}</p>
      </section>

      {/* Activity */}
      <section>{getActivity(pullRequests.length)}</section>

      {/* Languages */}
      <section>
        {contributorLanguageList.length > 0 ? (
          <p className="flex gap-2">
            <span>{getLanguageAbbreviation(contributorLanguageList[0])}</span>

            {contributorLanguageList[1] && <span>{getLanguageAbbreviation(contributorLanguageList[1])}</span>}

            {contributorLanguageList.length > 2 && <span>+ {contributorLanguageList.length - 2}</span>}
          </p>
        ) : (
          <p>-</p>
        )}
      </section>

      {/* Timezone */}
      <section>
        <div className="flex gap-x-3">{user && user.timezone ? <p>{user.timezone}</p> : "-"}</div>
      </section>

      {/* Contributions */}
      <section>
        <p>{mergedPrs.length}</p>
      </section>

      {/* Last 30 Days (Histogram) */}
      <section></section>
    </li>
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
