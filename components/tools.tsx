import { Button } from "@supabase/ui";
import { useRouter } from "next/router";
import React from "react";
import Table from "./misc/table";

const Tool: React.FC = () => {
    const router = useRouter();

    const { tool } = router.query;
    
    return (
        <>
            <nav className="pb-8">
                <Button size="medium" type="outline">
                    Daily
                </Button>
                <Button size="medium" type="outline">
                    Weekly
                </Button>
                <Button size="medium" type="outline">
                    Monthly
                </Button>
                <Button size="medium" type="outline">
                    Year
                </Button>
            </nav>
            <div className="flex flex-col">
                {tool === "Dashboard" ?
                    <>
                        <div className="flex w-[80vw] h-[500px] mb-10">
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
                        <div className="flex w-[80vw] h-[500px] mb-10">
                            <div className="flex flex-col w-[60%] mr-10">
                                <div className="w-full h-[20%] mb-10 p-5 border-4">

                                </div>
                                <div className="flex w-full h-[80%]">
                                    <div className="w-[50%] mr-10 h-full p-5 border-4">
                                        <Table />
                                    </div>
                                    <div className="w-[50%] h-full p-5 border-4">
                                        <Table />
                                    </div>
                                </div>
                            </div>
                            <div className="w-[40%] p-5 border-4">
                                <Table />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {tool ? `${tool}` : "Test"} Tool Page
                    </>
                }
            </div>
        </>
    )
};

export default Tool;