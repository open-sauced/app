import { Button } from "@supabase/ui";
import { useRouter } from "next/router";
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
                    <div className="flex max-w-full h-[500px] mb-10">
                        <div className="flex flex-col w-[60%] mr-10">
                            <div className="w-full h-[50%] mb-10 p-5 border-4">

                            </div>
                            <div className="w-full h-[50%] p-5 border-4">

                            </div>
                        </div>
                        <div className="w-[40%] p-5 border-4">
                            <Table />
                        </div>
                    </div>
                    <div className="flex w-full h-[500px] mb-10">
                        <div className="flex flex-col w-[70%] mr-10">
                            <div className="w-full h-[20%] mb-10 p-5 border-4">

                            </div>
                            <div className="flex max-w-full h-[80%]">
                                <div className="w-[50%] mr-10 h-full p-5 border-4">
                                    <Table2 />
                                </div>
                                <div className="w-[50%] h-full p-5 border-4">
                                    <Table3 />
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] p-5 border-4">
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