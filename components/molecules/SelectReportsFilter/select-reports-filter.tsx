import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import Select from "components/atoms/Select/select";
import SelectOption from "components/atoms/Select/select-option";
import { FilterOptions } from "interfaces/filter-object-types";
import { useState } from "react";

interface SelectReportsFilterProps {
  filterList?: FilterOptions[];
  callback: (selectedValue: string) => any;
}

const SelectReportsFilter = ({ filterList, callback }: SelectReportsFilterProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    if(selectedValue === "") return setError("Please select a filter.");
    if(error) setError("");
    callback(selectedValue);
  };

  return (
    <div className="flex flex-col gap-2 min-h-20">
      <Title level={4}>Select a Filter</Title>
      <Text>
        Download the filtered contributions from the last 30 days as a CSV. Selecting a filter will remove all the added
        repositories.
      </Text>
      <div className="flex flex-col md:flex-row gap-2">
        <Select error={error} onChange={(event) => setSelectedValue(event.target.value)} className="w-full">
          <SelectOption value="">Select a Filter</SelectOption>
          {filterList?.map(({ filterName, filterValue }, index) => (
            <SelectOption key={index} value={filterValue}>
              {filterName}
            </SelectOption>
          ))}
        </Select>
        <Button type="primary" onClick={handleButtonClick} className="w-52 h-[38px]">
          Generate CSV
        </Button>
      </div>
    </div>
  );
};

export default SelectReportsFilter;
