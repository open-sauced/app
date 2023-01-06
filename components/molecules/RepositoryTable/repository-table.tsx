import React, { useState, useRef, useEffect } from "react";
import Icon from "components/atoms/Icon/icon";
import Checkbox from "components/atoms/Checkbox/checkbox";
import ForkIcon from "img/icons/fork-icon.svg";
import StarIcon from "img/icons/star-icon.svg";
import Person from "img/icons/person-icon.svg";
import Icon3 from "img/icons/icon3.svg";
import ComponentHeader from "../ComponentHeader/component-header";
import humanizeNumber from "../../../lib/utils/humanizeNumber";
import RepositoryRow from "components/molecules/RepositoryRow/repository-row";

interface RepoSelectableTableProps {
  title: string;
  tableType: "participants";
  rows: DbRepo[];
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

  const tableRowClassesBG =  `hover:content-['${title}'] flex align-middle rounded justify-between border-dark-blue-10 bg-blue-100 cursor-pointer`;
  const tableRowClassesNoBG =  `hover:content-['${title}'] flex align-middle rounded justify-between hover:border-dark-blue-10 hover:bg-blue-100 cursor-pointer`;

  const addCheckboxToRef = (element: any) => {
    if (element && !allCheckboxRefs.current.includes(element)) allCheckboxRefs.current.push(element);
  };

  const changeAllCheckboxes = (event: any) => {
    const checked = event.target.checked;

    allCheckboxRefs.current.forEach((element) => {
      const checkbox: HTMLInputElement | null = element.querySelector("input[type='checkbox']");
      if (checkbox) checkbox.checked = checked;

      if(checked) {
        element.setAttribute("class", tableRowClassesBG);
      } else {
        element.setAttribute("class", tableRowClassesNoBG);
      }
    });
  };

  const entireRowClickChangesCheckbox = (element: any) => {
    const checkbox: HTMLInputElement | null = element.querySelector("input[type='checkbox']");
    if (checkbox) checkbox.checked = !checkbox.checked;
    if(checkbox?.checked) element.setAttribute("class", tableRowClassesBG);
    if(checkbox?.checked === false) element.setAttribute("class", tableRowClassesNoBG);
  };

  const [divSize, setDivSize] = useState(0);

  useEffect(() => {
    if (tableRef.current) setDivSize(tableRef.current.offsetWidth);
  }, []);

  return (
    <>
      <ComponentHeader title={title} />
      <div ref={tableRef}>
        <div className="w-full">
          <div className="border-b-[1px]">
            <div className="flex justify-between">
              <span className="p-2 inline-block">
                <Checkbox onChange={(event) => changeAllCheckboxes(event)} label="" title="" />
              </span>
              <div className="flex gap-x-2.5">
                <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">
                  <Icon IconImage={iconSuite[tableType].star} />
                </span>
                <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">
                  <Icon IconImage={iconSuite[tableType].fork} />
                </span>
                <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">
                  <Icon IconImage={iconSuite[tableType].person} />
                </span>
                <span className="text-right overflow-hidden whitespace-nowrap text-ellipsis py-2 w-10 md:w-20">
                  <Icon IconImage={iconSuite[tableType].icon3} />
                </span>
              </div>
            </div>
            <div className="h-3"></div>
          </div>
          <div>
            <div className="h-3"></div>
            {rows?.map(({ name, stars, size, id }, index) => {
              return (
                <RepositoryRow
                  key={index}
                  id={id}
                  stars={stars}
                  size={size}
                  name={name}
                  allCheckboxRefs={allCheckboxRefs}
                  tableRowClassesNoBG={tableRowClassesNoBG}
                  addCheckboxToRef={addCheckboxToRef}
                  entireRowClickChangesCheckbox={entireRowClickChangesCheckbox}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoSelectableTable;
