import { ComponentStory } from "@storybook/react";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";

const StoryConfig = {
  title: "Design System/Molecules/Pagination result"
};
export default StoryConfig;

const PaginationResultsTemplate: ComponentStory<typeof PaginationResults> = (args) => <PaginationResults {...args} />;

export const PaginationResultStory = PaginationResultsTemplate.bind({});

PaginationResultStory.args = {
  metaInfo: { page: 2, pageCount: 3, hasNextPage: true, hasPreviousPage: false, itemCount: 34, limit: 10 },
  total: 10000,
  entity: "contributors"
};
