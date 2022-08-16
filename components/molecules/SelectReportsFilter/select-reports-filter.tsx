import { Select } from "@supabase/ui";
import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { FilterType } from "interfaces/filter-object-types";
import { useState } from "react";

interface SelectReportsFilterProps {
  filterList?: FilterType[];
  callback: (selectedValue: string) => any;
}

const SelectReportsFilter = ({ filterList, callback }: SelectReportsFilterProps): JSX.Element => {
  const {Option: SelectOption } = Select;

  const [ selectedValue, setSelectedValue ] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <Title level={4} >
        Select a Filter
      </Title>
      <Text>
        Download the filtered contributions from the last 30 days as a CSV. Selecting a filter will remove all the added repositories.
      </Text>
      <div className="flex gap-2">
        <Select onChange={event => setSelectedValue(event.target.value)} className="w-full">
          <SelectOption value="">Select a Filter</SelectOption>
          {filterList?.map(({filterName, filterValue}, index) => 
            <SelectOption key={index} value={filterValue}>{filterName}</SelectOption>
          )}
        </Select>
        <Button onClick={() => callback(selectedValue)} className="w-52">
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default SelectReportsFilter;