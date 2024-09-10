import Image from "next/image";
import Link from "next/link";
import Card from "components/atoms/Card/card";
import { Spinner } from "components/atoms/SpinLoader/spin-loader";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import useFetchWorkspace from "lib/hooks/api/useFetchWorkspace";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { useWorkspaceMembers } from "lib/hooks/api/useWorkspaceMembers";
import { getAvatarById, getAvatarByUsername } from "lib/utils/github";

export default function WorkspaceCard({ workspaceId }: { workspaceId: string }) {
  const { data: workspace, isLoading, isError } = useFetchWorkspace({ workspaceId });
  const { data: members, isLoading: isMembersLoading, isError: isMembersError } = useWorkspaceMembers({ workspaceId });
  const workspaceOwner = members.find((member) => member.role === "owner");

  const {
    data: workspaceRepositoriesData,
    isLoading: isWorkspaceRepositoriesLoading,
    error: isWorkspaceRepositoriesError,
  } = useGetWorkspaceRepositories({ workspaceId });

  const workspaceRepositories =
    workspaceRepositoriesData?.data?.map((data) => {
      const owner = data.repo.full_name.split("/").at(0) ?? "";
      return { repoOwner: owner, repoName: data.repo.name, repoIcon: getAvatarByUsername(owner) };
    }) ?? ([] as RepoList[]);

  return (
    <Link href={`/workspaces/${workspaceId}`}>
      <Card className="flex flex-col gap-4 justify-between py-[1.25rem] w-full">
        {!(isLoading || isMembersLoading || isWorkspaceRepositoriesLoading) ? (
          <>
            <div className="self-start flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <Image
                  src={getAvatarById((workspaceOwner?.user_id ?? 0).toString())}
                  alt={`workspace_owner_${workspaceOwner?.user_id}`}
                  width={20}
                  height={20}
                  className="rounded-md"
                />
                <p className="text-slate-500 text-sm">{workspaceOwner?.member.name}</p>
              </div>

              <section className="flex flex-col gap-2">
                <h1>{workspace?.name}</h1>
                <p className="text-sm text-slate-500">
                  {(workspace?.description.length ?? 0) > 0 ? workspace?.description : "No description given."}
                </p>
              </section>
            </div>

            <CardRepoList repoList={workspaceRepositories} limit={3} />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-36">
            <Spinner />
          </div>
        )}
      </Card>
    </Link>
  );
}
