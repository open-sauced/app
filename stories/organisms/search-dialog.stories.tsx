import SearchDialog, { SearchDialogTrigger } from "components/organisms/SearchDialog/search-dialog";
import type { Meta, StoryFn } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Organisms/SearchDialog",
};

export default meta;

export const Default: StoryFn<typeof SearchDialog> = (args) => (
  <>
    <SearchDialog {...args} />
    <SearchDialogTrigger {...args} />
  </>
);
