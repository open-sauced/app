import React, { useState, useRef, useEffect } from "react";
import Icon from "components/atoms/Icon/icon";
import { Checkbox } from "@supabase/ui";
import ForkIcon from "public/icons/fork-icon.svg";
import StarIcon from "public/icons/star-icon.svg";
import Person from "public/icons/person-icon.svg";
import Icon3 from "public/icons/icon3.svg";
import ComponentHeader from "../ComponentHeader/component-header";
import { truncateString } from "../../../lib/utils/truncate-string";

type ParticipantsRow = {
  title: string;
  forks: number;
  stars: number;
  persons: number;
  unknown: number;
}

interface SelectableTableProps {
  title: string;
  tableType: "participants";
  rows: ParticipantsRow[];
}

const iconSuite = {
  participants: {
    star: StarIcon,
    fork: ForkIcon,
    person: Person,
    icon3: Icon3
  }
};

const SelectableTable: React.FC<SelectableTableProps> = ({ title, tableType, rows }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [divSize, setDivSize] = useState(0);
  
  useEffect(() => {
    if(ref.current) setDivSize(ref.current.offsetWidth);
  }, []);

  return (
    <>
      <ComponentHeader title={title} />
      <div ref={ref}>
        <table className="table-auto w-full">
          <thead className="border-b-[1px]">
            <tr>
              <th className="p-2">
                <Checkbox label=""/>
              </th>
              <th className="text-right p-2">
                <Icon IconImage={iconSuite[tableType].star} />
              </th>
              <th className="text-right p-2">
                <Icon IconImage={iconSuite[tableType].fork} />
              </th>
              <th className="text-right p-2">
                <Icon IconImage={iconSuite[tableType].person} />
              </th>
              <th className="text-right p-2">
                <Icon IconImage={iconSuite[tableType].icon3} />
              </th>
            </tr>
            <tr className="h-3"></tr>
          </thead>
          <tbody>
            <tr className="h-3"></tr>
            {rows?.map((row, index) => {
              return (
                <tr className={`hover:content-['${row.title}']`} key={index}>
                  <td className="flex flex-row text-left p-2">
                    <Checkbox label=""/> {divSize > 0 && divSize < 350 ? truncateString(row.title, 3) : row.title}
                  </td>
                  <td className="text-right p-2">
                    {row.stars}%
                  </td>
                  <td className="text-right p-2">
                    {row.forks}%
                  </td>
                  <td className="text-right p-2">
                    {row.persons}%
                  </td>
                  <td className="text-right p-2">
                    {row.unknown}%
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SelectableTable;