import React from "react";

import Dashboard from "../Dashboard/dashboard";
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

    default:
      return <> {tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
