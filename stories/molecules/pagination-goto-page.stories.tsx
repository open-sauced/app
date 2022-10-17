import { ComponentStory } from "@storybook/react";
import PaginationGotoPage from "components/molecules/PaginationGotoPage/pagination-goto-page";

const storyConfig = {
  title: "Design System/Molecules/PaginationGotoPage"
};
export default storyConfig;

const PaginationGotoTemplate: ComponentStory<typeof PaginationGotoPage> = (args)=> <PaginationGotoPage {...args}/>;

export const Default = PaginationGotoTemplate.bind({});

Default.args = {
  page: 23
};
