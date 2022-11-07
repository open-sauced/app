import React from "react";
import Contributors from "../Contributors/contributors";
import { captureAnayltics } from "lib/utils/analytics";
import Dashboard from "../Dashboard/dashboard";
import Reports from "../Reports/reports";
import Repositories from "../Repositories/repositories";
import useSession from "lib/hooks/useSession";

interface ToolProps {
  tool?: string;
  repoIds?: number[];
}

const Tool = ({ tool, repoIds }: ToolProps): JSX.Element => {
  const { hasReports, waitlisted } = useSession();  
  captureAnayltics("Tools Display", "tools", `${tool} selected`);

  switch (tool) {
  case "Dashboard":
    return <Dashboard repositories={repoIds} />;

  case "Repositories":
    return <Repositories repositories={repoIds} />;

  case "Reports":
    return <Reports hasReports={hasReports} waitlisted={waitlisted}/>; 
  case "Contributors":
    return <Contributors repositories={repoIds} />;
  default:
    return <> {tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
