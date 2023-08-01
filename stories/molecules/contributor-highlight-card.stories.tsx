import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Meta, StoryFn } from "@storybook/react";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";

export default {
  title: "Design System/Molecules/ContributorHighlightCard",
} as Meta<typeof ContributorHighlightCard>;

const Template: StoryFn<typeof ContributorHighlightCard> = (args) => (
  <TooltipProvider>
    <ContributorHighlightCard {...args} />
  </TooltipProvider>
);

export const Default = Template.bind({});
export const PullRequest = Template.bind({});
export const Issue = Template.bind({});
export const BlogPost = Template.bind({});

Default.args = {
  title: "Contributor Highlight",
  desc: "This is a description",
  user: "bdougie",
  prLink: "https://github.com/open-sauced/insights/pull/1",
  shipped_date: "2023-01-19 13:24:51.000000",
  emojis: [
    {
      name: "100",
      url: "https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8",
      display_order: 1,
      id: "2",
      created_at: "",
      updated_at: "",
    },
  ],
};

PullRequest.args = {
  title: "Contributor Highlight",
  desc: "This is a description",
  user: "bdougie",
  prLink: "https://github.com/open-sauced/insights/pull/1",
  shipped_date: "2023-01-19 13:24:51.000000",
  emojis: [
    {
      name: "100",
      url: "https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8",
      display_order: 3,
      id: "4",
      created_at: "",
      updated_at: "",
    },
  ],
  type: "pull_request",
};

Issue.args = {
  title: "Contributor Highlight",
  desc: "This is a description",
  user: "bdougie",
  prLink: "https://github.com/open-sauced/insights/pull/1",
  shipped_date: "2023-01-19 13:24:51.000000",
  emojis: [
    {
      name: "100",
      url: "https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8",
      display_order: 3,
      id: "4",
      created_at: "",
      updated_at: "",
    },
  ],
  type: "issue",
};

BlogPost.args = {
  title: "Contributor Highlight",
  desc: "This is a description",
  user: "bdougie",
  prLink: "https://github.com/open-sauced/insights/pull/1",
  shipped_date: "2023-01-19 13:24:51.000000",
  emojis: [
    {
      name: "100",
      url: "https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8",
      display_order: 3,
      id: "4",
      created_at: "",
      updated_at: "",
    },
  ],
  type: "blog",
};
