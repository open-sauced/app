import { Typography } from "@supabase/ui";
import React from "react";

const Table: React.FC = () => {
    const { Title } = Typography;
    return (
        <>
            <Title level={4} className="!leading-none text-left">
                <span className="text-sm font-semibold leading-none">Stars, Forks, Watchers and New Contributors</span>
            </Title>
            <table className="table-auto w-full border border-none mt-4 text-sm">
                <thead className="text-xs">
                    <tr>
                        <th className="px-2 border border-none">
                            
                        </th>
                        <th className="px-2 border border-none">
                            Stars
                        </th>
                        <th className="px-2 border border-none">
                            Forks
                        </th>
                        <th className="px-2 border border-none">
                            Watchers
                        </th>
                        <th className="px-2 border border-none">
                            New Contributors
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">freeCodeCamp /</span> freeCodeCamp
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
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">EbookFoundation /</span> free-programming-books
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
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">ohmyzsh /</span> ohmyzsh
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
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">TheAlgorithms /</span> Python
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
                    <tr>
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">axios /</span> axios
                        </td>
                        <td className="p-2 border border-none">
                            +24.2%
                        </td>
                        <td className="p-2 border border-none">
                            -64%
                        </td>
                        <td className="p-2 border border-none">
                            +32%
                        </td>
                        <td className="p-2 border border-none">
                            +57%
                        </td>
                    </tr>
                    <tr>
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">avelino /</span> awesome-go
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
                    <tr>
                        <td className="text-left p-2 border border-none font-medium  text-gray-800">
                            <span className="repository-org text-xs font-semibold text-gray-500">mui /</span> material-ui
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