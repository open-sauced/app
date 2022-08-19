import React from "react";


import Dashboard from "../Dashboard/dashboard";
import Repositories from "../Repositories/repositories";



interface ToolProps {
  tool?: string;
}


const Tool: React.FC<ToolProps> = ({ tool }) => {    
  switch (tool) {
  case "Dashboard":
    return <Dashboard />;

  case "Repositories":
    return <Repositories />;

    return <>{tool ? `${tool}` : "Test"} Tool Page</>;
  }
};

export default Tool;
