import React, { useEffect } from "react";
import { captureAnalytics } from "lib/utils/analytics";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Contributors from "../Contributors/contributors";
import Dashboard from "../Dashboard/dashboard";
import Activity from "../Activity/activity";

interface ToolProps {
  tool?: string;
  repositories?: string[];
  repoIds?: number[];
}

const Tool = ({ tool, repositories, repoIds }: ToolProps): JSX.Element => {
  const { user } = useSupabaseAuth();
  const { data: userInfo, isLoading } = useFetchUser(user?.user_metadata.user_name);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    captureAnalytics({ title: "Tools Display", property: "tools", value: `${tool} selected`, userInfo });
  }, [tool, userInfo, isLoading]);

  switch (tool) {
    case "Dashboard":
      return <Dashboard repoIds={repoIds} repositories={repositories} />;
    case "Contributors":
      return <Contributors />;

    case "Activity":
      return <Activity repositories={repoIds} />;
    default:
      return <> {tool ? `${tool}` : ""}</>;
  }
};

export default Tool;
