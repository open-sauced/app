import Search from "components/atoms/Search/search";
import Select from "components/atoms/Select/custom-select";
import Title from "components/atoms/Typography/title";
import React from "react";
import PaginationResult from "../PaginationResults/pagination-result";

interface TableHeaderProps {
  title?: string;
  showing: { from: number; to: number; total: number; entity: string };
  
  updateLimit: Function
}
const TableHeader = ({ title, showing,updateLimit }: TableHeaderProps): JSX.Element => {

  return (
    <div className="flex justify-between items-center w-full pb-8">
      <div className="flex gap-x-4 items-end">
        <Title className="!text-2xl !font-medium" level={1}>
          {title}
        </Title>
        <PaginationResult {...showing} />
      </div>
      <div className="w-2/5  flex gap-x-5 items-center">
        <Select
          placeholder="10 per page"
          options={[
            { name: "10 per page", value: 10 },
            { name: "20 per page", value: 20 },
            { name: "30 per page", value: 30 },
            { name: "40 per page", value: 40 },
            { name: "50 per page", value: 50 }
          ]}
          label="Showing"
          onChange={function(limit: number):void{updateLimit(limit);}}
        ></Select>
        <Search placeholder={`Showing ${showing.entity}`} name={showing.entity} />
      </div>
    </div>
  );
};
export default TableHeader;
