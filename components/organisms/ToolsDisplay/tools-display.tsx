import React, { useEffect } from "react";
import { captureAnalytics } from "lib/utils/analytics";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Contributors from "../Contributors/contributors";
import Activity from "../Activity/activity";
import Repositories from "../Repositories/repositories";

interface ToolProps {
  tool?: string;
  repositories?: number[];
}

const Tool = ({ tool, repositories }: ToolProps): JSX.Element => {
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
      return <Repositories repositories={repositories} personalWorkspaceId={userInfo?.personal_workspace_id} />;
    case "Contributors":
      return <Contributors repositories={repositories} personalWorkspaceId={userInfo?.personal_workspace_id} />;

    case "Activity":
      return <Activity repositories={repositories} />;
    default:
      return <> {tool ? `${tool}` : ""}</>;
  }
};

export default Tool;
