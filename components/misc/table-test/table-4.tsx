import { Typography } from "@supabase/ui";
import React from "react";

const Table: React.FC = () => {
  const { Title } = Typography;
  return (
    <>
      <Title level={4} className="pb-5 text-right">
        <span className="font-bold text-xl">D</span>ays Active, <span className="font-bold text-xl">F</span>iles, <span className="font-bold text-xl">C</span>hurn, <span className="font-bold text-xl">A</span>ll Contributors
      </Title>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="p-2 border">
                            
            </th>
            <th className="p-2 border">
                            D
            </th>
            <th className="p-2 border">
                            F
            </th>
            <th className="p-2 border">
                            C
            </th>
            <th className="p-2 border">
                            A
            </th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td className="text-left p-2 border">
                            freecodecamp
            </td>
            <td className="p-2 border">
                            +100%
            </td>
            <td className="p-2 border">
                            +20%
            </td>
            <td className="p-2 border">
                            +40%
            </td>
            <td className="p-2 border">
                            +5%
            </td>
          </tr>
          <tr>
            <td className="text-left p-2 border">
                            free-programming-books
            </td>
            <td className="p-2 border">
                            +60%
            </td>
            <td className="p-2 border">
                            +40%
            </td>
            <td className="p-2 border">
                            +40%
            </td>
            <td className="p-2 border">
                            +20%
            </td>
          </tr>
          <tr>
            <td className="text-left p-2 border">
                            material-ui
            </td>
            <td className="p-2 border">
                            +30%
            </td>
            <td className="p-2 border">
                            -10%
            </td>
            <td className="p-2 border">
                            +5%
            </td>
            <td className="p-2 border">
                            -10%
            </td>
          </tr>
          <tr>
            <td className="text-left p-2 border">
                            java-design-patterns
            </td>
            <td className="p-2 border">
                            +40%
            </td>
            <td className="p-2 border">
                            -10%
            </td>
            <td className="p-2 border">
                            +10%
            </td>
            <td className="p-2 border">
                            -15%
            </td>
          </tr>
          <tr className="h-[35px]">
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
          </tr>
          <tr className="h-[35px]">
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
          </tr>
          <tr className="h-[35px]">
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
            <td className="p-2 border">
                            
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;