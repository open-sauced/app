import { useRouter } from "next/router";
import React from "react";
import Card from "../../atoms/Card/card";
import SelectableTable from "components/molecules/SelectableTable/selectable-table";
import { testRows } from "./fake-data";

const Tool: React.FC = () => {
  const router = useRouter();

  const { tool } = router.query;
    
  return (
    <div className="flex flex-col w-full">
      {tool === "Dashboard" ?
        <>
          <div className="flex max-w-full h-[500px] mb-10">
            <div className="flex flex-col w-[60%] mr-10">
              <Card className="w-full h-[50%] mb-10 p-5">
                <></>
              </Card>
              <Card className="w-full h-[50%] p-5">
                <></>
              </Card>
            </div>
            <Card className="w-[40%] p-5">
              <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
            </Card>
          </div>
          <div className="flex w-full h-[500px] mb-10">
            <div className="flex flex-col w-[70%] mr-10">
              <div className="flex max-w-full h-[80%]">
                <Card className="w-[50%] mr-10 h-full p-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
                <Card className="w-[50%] h-full p-5">
                  <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
                </Card>
              </div>
            </div>
            <Card className="w-[30%] p-5">
              <SelectableTable rows={testRows} title="Test Title" tableType="participants" />
            </Card>
          </div>
        </>
        :
        <>
          {tool ? `${tool}` : "Test"} Tool Page
        </>
      }
    </div>
  );
};

export default Tool;