import React from "react";

import Button from "components/atoms/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/atoms/Dropdown/dropdown";
import InsightsPageListItem from "components/atoms/InsightsPageListItem/insights-page-list-item";
import { BsPlusCircleFill } from "react-icons/bs";

const InsightsPageListDropdown = () => {
  return (
    // Added this div just to demonstrate dropdown alignment to the end... Will be removed in actual implementation
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="!py-1 px-2 text-sm" variant="primary">
            Add a list
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <DropdownMenuItem className="rounded-md">
            <InsightsPageListItem className="h-5 " pageName="Insights teams" pageId="neojpmodwe" />
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-md">
            <InsightsPageListItem className="h-5 " pageName="Internal Open Source Projects" pageId="neojpmodwe" />
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-md">
            <InsightsPageListItem className="h-5 " pageName="Internal Open Source Projects" pageId="neojpmodwe" />
          </DropdownMenuItem>
          <button className="flex items-center bg-orange-100 p-1.5 hover:bg-orange-200 transition-all rounded-md justify-center gap-2 text-sauced-orange">
            <BsPlusCircleFill /> Create List
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default InsightsPageListDropdown;
