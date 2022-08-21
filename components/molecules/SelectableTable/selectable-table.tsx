import React, { useState, useRef, useEffect } from "react";
import Icon from "components/atoms/Icon/icon";
import Checkbox from "components/atoms/Checkbox/checkbox";
import ForkIcon from "public/icons/fork-icon.svg";
import StarIcon from "public/icons/star-icon.svg";
import Person from "public/icons/person-icon.svg";
import Icon3 from "public/icons/icon3.svg";
import ComponentHeader from "../ComponentHeader/component-header";
import { truncateString } from "../../../lib/utils/truncate-string";
import humanizeNumber from "../../../lib/utils/humanizeNumber";

interface RepoSelectableTableProps {
  title: string;
  tableType: "participants";
  rows: { title: string; stars: number; forks: number; persons: number, size: string }[];
}

const iconSuite = {
  participants: {
    star: StarIcon,
    fork: ForkIcon,
    person: Person,
    icon3: Icon3
  }
};

const RepoSelectableTable: React.FC<RepoSelectableTableProps> = ({ title, tableType, rows }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const allCheckboxRefs = useRef<HTMLElement[]>([]);

  const addCheckboxToRef = (element: any) => {
    if (element && !allCheckboxRefs.current.includes(element)) allCheckboxRefs.current.push(element);
  };

  const changeAllCheckboxes = (event: any) => {
    const checked = event.target.checked;

    allCheckboxRefs.current.forEach((element) => {
      const checkbox: HTMLInputElement | null = element.querySelector("input[type='checkbox']");
      if (checkbox) checkbox.checked = checked;
    });
  };

  const entireRowClickChangesCheckbox = (element: any) => {
    const checkbox: HTMLInputElement | null = element.querySelector("input[type='checkbox']");
    if (checkbox) checkbox.checked = !checkbox.checked;
  };

  const [divSize, setDivSize] = useState(0);

  useEffect(() => {
    if (tableRef.current) setDivSize(tableRef.current.offsetWidth);
  }, []);

  return (
    <>
      <ComponentHeader title={title} />
      <div ref={tableRef}>
        <table className="table-auto w-full">
          <thead className="border-b-[1px]">
            <tr>
              <th className="p-2">
                <Checkbox onChange={(event) => changeAllCheckboxes(event)} label="" />
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
            {rows?.map(({ name, stars, persons, size }, index) => {
              return (
                <tr
                  className={`hover:content-['${title}'] hover:bg-blue-100 cursor-pointer`}
                  key={index}
                  onClick={(event: any) => {
                    const isNotCheckbox = event.target.getAttribute("type") !== "checkbox";
                    if (isNotCheckbox) entireRowClickChangesCheckbox(allCheckboxRefs.current[index]);
                  }}
                >
                  <td className="flex flex-row text-left p-2" ref={(element) => addCheckboxToRef(element)}>
                    <Checkbox label="" /> {divSize > 0 && divSize < 350 ? truncateString(name, 3) : name}
                  </td>
                  <td className="text-right p-2">{humanizeNumber(stars)}</td>
                  <td className="text-right p-2">{humanizeNumber(12)}</td>
                  <td className="text-right p-2">{humanizeNumber(1234)}</td>
                  <td className="text-right p-2">{humanizeNumber(parseInt(size))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RepoSelectableTable;
