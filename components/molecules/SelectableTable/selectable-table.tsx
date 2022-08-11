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
  const tableRef = useRef<HTMLDivElement>(null);
  const allCheckboxRefs = useRef<HTMLElement[]>([]);

  const addCheckboxToRef = (element: any) => {
    if(element && !allCheckboxRefs.current.includes(element)) allCheckboxRefs.current.push(element);
  };

  const changeAllCheckboxes = (event: any) => {
    const checked = event.target.checked;

    allCheckboxRefs.current.forEach(element => {
      const checkbox: HTMLInputElement | null = element.querySelector("input[type='checkbox']");
      if(checkbox) checkbox.checked = checked;
    });
  };

  const entireRowClickChangesCheckbox = (event: any) => {
    const checkbox: HTMLInputElement | null = event.target.querySelector("input[type='checkbox']");
    if(checkbox) checkbox.checked = !checkbox.checked;
  };

  const [divSize, setDivSize] = useState(0);
  
  useEffect(() => {
    if(tableRef.current) setDivSize(tableRef.current.offsetWidth);
  }, []);

  return (
    <>
      <ComponentHeader title={title} />
      <div ref={tableRef}>
        <table className="table-auto w-full">
          <thead className="border-b-[1px]">
            <tr>
              <th className="p-2">
                <Checkbox onChange={event => changeAllCheckboxes(event)} label=""/>
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
            {rows?.map(({title, stars, forks, persons, unknown}, index) => {
              return (
                <tr className={`hover:content-['${title}'] cursor-pointer`} key={index} onClick={event => entireRowClickChangesCheckbox(event)}>
                  <td className="flex flex-row text-left p-2" ref={element => addCheckboxToRef(element)}>
                    <Checkbox label="" /> {divSize > 0 && divSize < 350 ? truncateString(title, 3) : title}
                  </td>
                  <td className="text-right p-2">
                    {stars}%
                  </td>
                  <td className="text-right p-2">
                    {forks}%
                  </td>
                  <td className="text-right p-2">
                    {persons}%
                  </td>
                  <td className="text-right p-2">
                    {unknown}%
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