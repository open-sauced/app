import Text from "components/atoms/Typography/text";
import DropdownList from "../../components/molecules/DropdownList/dropdown-list";

const storyConfig = {
  title: "Design System/Molecules/Dropdown List"
};

export default storyConfig;

export const AuthSectionMolecule = () => <DropdownList componentAsDropdown={<Text>Text</Text>}>Hello</DropdownList>;