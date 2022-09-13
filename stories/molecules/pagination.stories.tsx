import { ComponentStory } from "@storybook/react";
import Pagination from "components/molecules/Pagination/pagination";

const StoryConfig = {
  title: "Design System/Molecules/Pagination"
};

export default StoryConfig;

const PaginationTemplate: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Default = PaginationTemplate.bind({});
export const NoDivisor = PaginationTemplate.bind({});

Default.args = {
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  totalPage: 2003,
  page: 5
};
NoDivisor.args = {
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  totalPage: 2003,
  page: 5,
  divisor: false
};

