import { Typography } from "@supabase/ui";
import React from "react";

const Table: React.FC = () => {
    const { Title } = Typography;
    return (
        <>
            <Title level={4} className="pb-5 text-left">
                <span className="font-bold text-xl">D</span>ays Active, <span className="font-bold text-xl">F</span>iles, <span className="font-bold text-xl">C</span>hurn, <span className="font-bold text-xl">A</span>ll Contributors
            </Title>
            <table className="table-auto w-full border border-none text-sm">
                <thead className ='text-xs'>
                    <tr>
                        <th className="p-2 border border-none">
                            
                        </th>
                        <th className="p-2 border border-none">
                            D
                        </th>
                        <th className="p-2 border border-none">
                            F
                        </th>
                        <th className="p-2 border border-none">
                            C
                        </th>
                        <th className="p-2 border border-none">
                            A
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
                        <td className="p-2 border border-none">
                            +5%
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
                        <td className="p-2 border border-none">
                            +20%
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
                        <td className="p-2 border border-none">
                            -10%
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
                        <td className="p-2 border border-none">
                            -15%
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
                        <td className="p-2 border border-none">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Table;