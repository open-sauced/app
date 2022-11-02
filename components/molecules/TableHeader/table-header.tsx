import Search from "components/atoms/Search/search";
import Select from "components/atoms/Select/custom-select";
import Title from "components/atoms/Typography/title";
import React from "react";
import PaginationResult from "../PaginationResults/pagination-result";

interface TableHeaderProps {
  title?: string;
  showing: { from: number; to: number; total: number; entity: string };

  updateLimit: Function;
}
const TableHeader = ({ title, showing, updateLimit }: TableHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-y-2 flex-col md:flex-row md:justify-between md:items-end w-full md:pb-4">
      <div className="flex gap-x-4 items-end">
        <Title className="!text-2xl !leading-none ! " level={1}>
          {title}
        </Title>
        <PaginationResult className="hidden !translate-y-[2px]  md:inline-flex" {...showing} />
      </div>
      <div className="w-full  md:w-2/5 flex gap-x-5 items-center">
        <Select
          placeholder="10 per page"
          options={[
            { name: "10 per page", value: 10 },
            { name: "20 per page", value: 20 },
            { name: "30 per page", value: 30 },
            { name: "40 per page", value: 40 },
            { name: "50 per page", value: 50 }
          ]}
          className="hidden   ml-auto md:inline-block md:!max-w-[220px]"
          label="Showing"
          onChange={function (limit: number): void {
            updateLimit(limit);
          }}
        ></Select>
      </div>
    </div>
  );
};
export default TableHeader;
