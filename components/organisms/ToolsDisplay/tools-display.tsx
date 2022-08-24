import React from "react";

import Dashboard from "../Dashboard/dashboard";
import Reports from "../Reports/reports";
import Repositories from "../Repositories/repositories";

interface ToolProps {
  tool?: string;
}

const Tool = ({ tool }: ToolProps): JSX.Element => {
  switch (tool) {
  case "Dashboard":
    return <Dashboard />;

  case "Repositories":
    return <Repositories />;

  case "Reports":
    return <Reports/>;
  default:
    return <> {tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
