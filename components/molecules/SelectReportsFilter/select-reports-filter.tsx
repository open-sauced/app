import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";
import { FilterOptions } from "interfaces/filter-object-types";
import { useState } from "react";

interface SelectReportsFilterProps {
  filterList: FilterOptions[];
  callback: (selectedValue: string) => any;
}

const SelectReportsFilter = ({ filterList, callback }: SelectReportsFilterProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    if (selectedValue === "") return setError("Please select a filter.");
    if (error) setError("");
    callback(selectedValue);
  };

  return (
    <div className="flex flex-col gap-2 min-h-20">
      <Title level={4}>Select a Filter</Title>
      <Text>Download the filtered pull requests from the filtered repositories for the last 30 days as a CSV.</Text>
      <div className="flex flex-col gap-2 md:flex-row">
        <Select onValueChange={(value) => setSelectedValue(value)}>
          <SelectTrigger>
            <SelectValue className="!capitalize">
              {selectedValue
                ? filterList.find((filter) => filter.filterValue === selectedValue)?.filterName
                : "Select a Filter"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {filterList?.map(({ filterName, filterValue }, index) => (
              <SelectItem key={index} value={filterValue}>
                {filterName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="primary" onClick={handleButtonClick} className="flex justify-center w-52 h-[38px]">
          Generate CSV
        </Button>
      </div>
    </div>
  );
};

export default SelectReportsFilter;
