import React from "react";
import Contributors from "../Contributors/contributors";
import { capturePostHogAnayltics } from "lib/utils/analytics";
import Dashboard from "../Dashboard/dashboard";
import Reports from "../Reports/reports";
import Repositories from "../Repositories/repositories";

interface ToolProps {
  tool?: string;
}

const Tool = ({ tool }: ToolProps): JSX.Element => {
  capturePostHogAnayltics("Tools Display", "tools", `${tool} selected`);

  switch (tool) {
  case "Dashboard":
    return <Dashboard />;

  case "Repositories":
    return <Repositories />;

  case "Reports":
    return <Reports/>; 
  case "Contributors":
    return <Contributors/>;
  default:
    return <> {tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
