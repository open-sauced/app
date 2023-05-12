import { ComponentStory } from "@storybook/react";
import ContributorFilterDropdown from "components/molecules/ContributorFilterDropdown/contributor-filter-dropdown";

const storyConfig = {
  title: "Design System/Molecules/ContributorFilterDropdown"
};

export default storyConfig;

const ContributorFilterDropdownTemplate: ComponentStory<typeof ContributorFilterDropdown> = (args) => (
  <ContributorFilterDropdown />
);

export const DefaultStory = ContributorFilterDropdownTemplate.bind({});
