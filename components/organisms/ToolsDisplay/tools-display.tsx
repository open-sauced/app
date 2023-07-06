import React from "react";
import { captureAnayltics } from "lib/utils/analytics";
import useSession from "lib/hooks/useSession";
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
  captureAnayltics("Tools Display", "tools", `${tool} selected`);

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
    return <> {tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
