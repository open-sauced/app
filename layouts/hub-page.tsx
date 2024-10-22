import React from "react";
import { useRouter } from "next/router";

import Header from "components/organisms/Header/header";
import Nav from "components/organisms/ToolList/nav";
import InsightHeader from "components/molecules/InsightHeader/insight-header";

import useNav from "lib/hooks/useNav";
import useInsight from "lib/hooks/useInsight";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { useWorkspaceMembers } from "lib/hooks/api/useWorkspaceMembers";

const HubPageLayout = ({
  page = "dashboard",
  owners,
  children,
}: {
  page?: string;
  owners?: string[];
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { userId } = useSupabaseAuth();
  const { pageId, insightId } = router.query;
  const workspaceId = router.query.workspaceId as string;
  const id = (pageId || insightId) as string;
  const { data: insight, isLoading, isError } = useInsight(id);
  const { data: workspaceMembers } = useWorkspaceMembers({ workspaceId });
  const repositories = insight?.repos.map((repo) => repo.repo_id);

  const { toolList, selectedTool = page, selectedFilter, userOrg } = useNav(repositories);

  const membership = workspaceMembers?.find((member) => member.user_id === Number(userId));
  const canEdit = membership && ["owner", "editor"].includes(membership.role);

  return (
    <>
      <div>
        <Header classNames="px-0 md:px-0 pt-0">
          <ClientOnly>
            {isLoading ? (
              <div className="flex justify-between w-full h-46">
                <div className="flex items-center gap-3">
                  <SkeletonWrapper radius={10} width={140} height={140} />
                  <div className="flex flex-col gap-3">
                    <SkeletonWrapper width={110} height={25} />
                    <SkeletonWrapper width={200} height={25} />
                    <SkeletonWrapper classNames="mt-3" width={150} height={30} />
                  </div>
                </div>
                <div>
                  <SkeletonWrapper classNames="mt-6" width={150} height={40} />
                </div>
              </div>
            ) : null}
          </ClientOnly>

          {isError ? <div>Error occurred</div> : null}

          {insight && (
            <ClientOnly>
              <InsightHeader
                insight={insight}
                repositories={repositories}
                insightId={id}
                canEdit={canEdit}
                workspaceId={workspaceId}
                owners={owners}
              />
            </ClientOnly>
          )}
        </Header>

        <Nav
          toolList={toolList}
          selectedTool={selectedTool && selectedTool.toString()}
          filterName={pageId}
          selectedFilter={selectedFilter}
          username={userOrg}
          workspaceId={workspaceId}
        />
      </div>

      <div className="flex flex-col items-center flex-1 w-full py-8  bg-light-slate-2">
        <div className="container px-2 mx-auto md:px-16">{children}</div>
      </div>
    </>
  );
};

export default HubPageLayout;
