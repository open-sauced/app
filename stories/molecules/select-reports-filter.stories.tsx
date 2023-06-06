import { FilterOptions } from "interfaces/filter-object-types";
import SelectReportsFilter from "../../components/molecules/SelectReportsFilter/select-reports-filter";

const storyConfig = {
  title: "Design System/Molecules/Select Reports Filter",
};

export default storyConfig;

const testFilterOptions: FilterOptions[] = [
  {
    filterName: "test",
    filterValue: "test",
  },
  {
    filterName: "test2",
    filterValue: "test2",
  },
];

export const PopulatedSelectReportsFilterMolecule = () => (
  <SelectReportsFilter filterList={testFilterOptions} callback={() => null} />
);
