import { ComponentStory } from "@storybook/react";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";

const StoryConfig = {
  title: "Design System/Molecules/Pagination result"
};
export default StoryConfig;

const PaginationResultsTemplate: ComponentStory<typeof PaginationResults> = (args) => (
  <PaginationResults {...args} />
);

export const PaginationResultStory = PaginationResultsTemplate.bind({});

PaginationResultStory.args={
  from: 1,
  to: 10,
  total: 10000,
  entity: "contributors"
};
