import { useRouter } from "next/router";
import React from "react";

const Tool: React.FC = () => {
    const router = useRouter();

    const { tool } = router.query;
    
    return (
        <div>
            {tool ? `${tool}` : "Test"} Tool Page
        </div>
    )
};

export default Tool;