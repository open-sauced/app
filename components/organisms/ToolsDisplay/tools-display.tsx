import React from "react";
import Dashboard from "../Dashboard/dashboard";
import Reports from "../Reports/reports";

interface ToolProps {
  tool?: string;
}

const Tool: React.FC<ToolProps> = ({ tool }) => {

  switch (tool) {

  case "Dashboard":
    return <Dashboard />;

  case "Repositories":
    return <Reports />;

  default:
    return <>{tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
