import React from "react";
import { Typography } from "@supabase/ui";

const Table: React.FC = () => {
    const { Title } = Typography;
    return (
        <>
            <Title level={4} className="pb-5 font-bold text-left">
                Issues Created, Issues Closed, Issues Commented
            </Title>
            <table className="table-auto w-full border border-none text-sm">
                <thead className="text=xs">
                    <tr>
                        <th className="p-2 border border-none">
                            
                        </th>
                        <th className="p-2 border border-none">
                            Created
                        </th>
                        <th className="p-2 border border-none">
                            Closed
                        </th>
                        <th className="p-2 border border-none">
                            Commented
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td className="text-left p-2 border border-none">
                            freecodecamp
                        </td>
                        <td className="p-2 border border-none">
                            +100%
                        </td>
                        <td className="p-2 border border-none">
                            +20%
                        </td>
                        <td className="p-2 border border-none">
                            +40%
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left p-2 border border-none">
                            free-programming-books
                        </td>
                        <td className="p-2 border border-none">
                            +60%
                        </td>
                        <td className="p-2 border border-none">
                            +40%
                        </td>
                        <td className="p-2 border border-none">
                            +40%
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left p-2 border border-none">
                            material-ui
                        </td>
                        <td className="p-2 border border-none">
                            +30%
                        </td>
                        <td className="p-2 border border-none">
                            -10%
                        </td>
                        <td className="p-2 border border-none">
                            +5%
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left p-2 border border-none">
                            java-design-patterns
                        </td>
                        <td className="p-2 border border-none">
                            +40%
                        </td>
                        <td className="p-2 border border-none">
                            -10%
                        </td>
                        <td className="p-2 border border-none">
                            +10%
                        </td>
                    </tr>
                    <tr className="h-[35px]">
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                    </tr>
                    <tr className="h-[35px]">
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                    </tr>
                    <tr className="h-[35px]">
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                        <td className="p-2 border border-none">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Table;