import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { captureAnalytics } from "lib/utils/analytics";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import useContributors from "lib/hooks/api/useContributors";
import ContributorsTable from "components/Tables/ContributorsTable";
import { OrderDirection } from "lib/utils/sorting";
import { setQueryParams } from "lib/utils/query-params";
import ContributorsGrid from "components/Tables/ContributorsGrid";
import LayoutToggle, { ToggleValue } from "components/atoms/LayoutToggle/layout-toggle";
import Dashboard from "../Dashboard/dashboard";
import Activity from "../Activity/activity";

interface ToolProps {
  tool?: string;
  repositories?: number[];
}

const Tool = ({ tool, repositories }: ToolProps): JSX.Element => {
  const router = useRouter();
  const { user } = useSupabaseAuth();
  const { data: userInfo, isLoading } = useFetchUser(user?.user_metadata.user_name);

  const orderDirection = router.query.orderDirection as OrderDirection;
  const setOscrSortDirection = (direction: OrderDirection) => {
    setQueryParams({ orderDirection: direction, orderBy: "oscr" });
  };

  const display = (router.query.display ?? "list") as ToggleValue;
  const {
    data: contributors,
    meta: contributorsMeta,
    isError: isContributorsError,
    isLoading: isContributorsLoading,
  } = useContributors(Number(router.query.limit ?? 10), repositories);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    captureAnalytics({ title: "Tools Display", property: "tools", value: `${tool} selected`, userInfo });
  }, [tool, userInfo, isLoading]);

  switch (tool) {
    case "Dashboard":
      return <Dashboard repositories={repositories} />;
    case "Contributors": {
      return (
        <div className="flex flex-col gap-4">
          <span className="self-end">
            <LayoutToggle
              value={display}
              onChange={() => {
                setQueryParams({ display: display === "list" ? "grid" : "list" });
              }}
            />
          </span>
          {display === "list" && (
            <ContributorsTable
              contributors={contributors}
              isLoading={isContributorsLoading}
              isError={isContributorsError}
              meta={contributorsMeta}
              oscrSorting={orderDirection}
              setOscrSorting={setOscrSortDirection}
            />
          )}
          {display === "grid" && (
            <ContributorsGrid
              contributors={contributors}
              isLoading={isContributorsLoading}
              isError={isContributorsError}
              meta={contributorsMeta}
              oscrSorting={orderDirection}
              setOscrSorting={setOscrSortDirection}
              repositoryIds={repositories ?? []}
            />
          )}
        </div>
      );
    }

    case "Activity":
      return <Activity repositories={repositories} />;
    default:
      return <> {tool ? `${tool}` : ""}</>;
  }
};

export default Tool;
