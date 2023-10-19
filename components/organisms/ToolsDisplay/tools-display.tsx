import React, { useEffect } from "react";
import { captureAnalytics } from "lib/utils/analytics";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Contributors from "../Contributors/contributors";
import Dashboard from "../Dashboard/dashboard";
import Reports from "../Reports/reports";
import Repositories from "../Repositories/repositories";

interface ToolProps {
  tool?: string;
  repositories?: number[];
}

const Tool = ({ tool, repositories }: ToolProps): JSX.Element => {
  const { hasReports, waitlisted } = useSession();
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
      return <Dashboard repositories={repositories} />;

    case "Repositories":
      return <Repositories repositories={repositories} />;

    case "Reports":
      return <Reports hasReports={hasReports} waitlisted={waitlisted} repositories={repositories} />;
    case "Contributors":
      return <Contributors repositories={repositories} />;
    default:
      return <> {tool ? `${tool}` : ""}</>;
  }
};

export default Tool;
