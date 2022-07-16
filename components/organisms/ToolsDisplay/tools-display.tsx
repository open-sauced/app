import { useRouter } from "next/router";
import { Input } from "@supabase/ui";
import React from "react";
import Table from "../../misc/table-test/table";
import Table2 from "../../misc/table-test/table-2";
import Table3 from "../../misc/table-test/table-3";
import Table4 from "../../misc/table-test/table-4";
import Card from "../../atoms/Card/card";

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
              <Table />
            </Card>
          </div>
          <div className="flex w-full h-[500px] mb-10">
            <div className="flex flex-col w-[70%] mr-10">
              <Card className="w-full h-[20%] mb-10 p-5">
                <Input placeholder="Filter issues and pull requests by label"/>
              </Card>
              <div className="flex max-w-full h-[80%]">
                <Card className="w-[50%] mr-10 h-full p-5">
                  <Table2 />
                </Card>
                <Card className="w-[50%] h-full p-5">
                  <Table3 />
                </Card>
              </div>
            </div>
            <Card className="w-[30%] p-5">
              <Table4 />
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