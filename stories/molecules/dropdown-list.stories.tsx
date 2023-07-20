import Text from "components/atoms/Typography/text";
import DropdownList from "../../components/molecules/DropdownList/dropdown-list";

const storyConfig = {
  title: "Design System/Molecules/Dropdown List",
};

export default storyConfig;

const testElement = [
  <span key={1} className="block px-4 py-2 rounded-md cursor-pointer">
    <Text>Test</Text>
  </span>,
];

export const DropdownListMolecule = () => (
  <div className="flex justify-center">
    <DropdownList menuContent={testElement}>Hello</DropdownList>
  </div>
);
