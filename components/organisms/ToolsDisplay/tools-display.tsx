import React from "react";
import Contributors from "../Contributors/contributors";
import { captureAnayltics } from "lib/utils/analytics";
import Dashboard from "../Dashboard/dashboard";
import Reports from "../Reports/reports";
import Repositories from "../Repositories/repositories";
import useSession from "lib/hooks/useSession";

interface ToolProps {
  tool?: string;
}

const Tool = ({ tool }: ToolProps): JSX.Element => {
  const { hasReports, waitlisted } = useSession();  
  captureAnayltics("Tools Display", "tools", `${tool} selected`);

  switch (tool) {
  case "Dashboard":
    return <Dashboard />;

  case "Repositories":
    return <Repositories />;

  case "Reports":
    return <Reports hasReports={hasReports} waitlisted={waitlisted}/>; 
  case "Contributors":
    return <Contributors />;
  default:
    return <> {tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
