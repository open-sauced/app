import { useRouter } from "next/router";
import { Input } from "@supabase/ui";
import React from "react";
import Table from "./misc/table-test/table";
import Table2 from "./misc/table-test/table-2";
import Table3 from "./misc/table-test/table-3";
import Table4 from "./misc/table-test/table-4";

const Tool: React.FC = () => {
    const router = useRouter();

    const { tool } = router.query;
    
    return (
        <div className="flex flex-col w-full">
            {tool === "Dashboard" ?
                <>
                    <div className="flex max-w-full h-[500px] mb-4">
                        <div className="flex flex-col w-[60%] mr-4">
                            <div className="w-full h-[50%] mb-4 p-3 border border-1 rounded-lg">

                            </div>
                            <div className="w-full h-[50%] p-3 border border-1 rounded-lg">

                            </div>
                        </div>
                        <div className="w-[40%] p-3 border border-1 rounded-lg">
                            <Table />
                        </div>
                    </div>
                    <div className="flex w-full h-[500px] mb-4">
                        <div className="flex flex-col w-[70%] mr-4">
                            <div className="flex max-w-full h-[80%]">
                                <div className="w-[50%] mr-4 h-full p-3 border border-1 rounded-lg">
                                    <Table2 />
                                </div>
                                <div className="w-[50%] h-full p-3 border border-1 rounded-lg">
                                    <Table3 />
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] p-3 border border-1 rounded-lg">
                            <Table4 />
                        </div>
                    </div>
                </>
                :
                <>
                    {tool ? `${tool}` : "Test"} Tool Page
                </>
            }
        </div>
    )
};

export default Tool;