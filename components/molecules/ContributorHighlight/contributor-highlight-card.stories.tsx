import { Meta, StoryObj } from "@storybook/react";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";

export default {
  title: "Design System/Molecules/ContributorHighlightCard",
  component: ContributorHighlightCard,
} satisfies Meta<typeof ContributorHighlightCard>;

type Story = StoryObj<typeof ContributorHighlightCard>;

export const Default: Story = {
  args: {
    title: "Contributor Highlight",
    desc: "This is a description",
    user: "bdougie",
    highlightLink: "https://github.com/open-sauced/insights/pull/1",
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
  },
};

export const PullRequest: Story = {
  args: {
    title: "Contributor Highlight",
    desc: "This is a description",
    user: "bdougie",
    highlightLink: "https://github.com/open-sauced/insights/pull/1",
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
  },
};

export const Issue: Story = {
  args: {
    title: "Contributor Highlight",
    desc: "This is a description",
    user: "bdougie",
    highlightLink: "https://github.com/open-sauced/insights/pull/1",
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
  },
};

export const BlogPost: Story = {
  args: {
    title: "Contributor Highlight",
    desc: "This is a description",
    user: "bdougie",
    highlightLink: "https://github.com/open-sauced/insights/pull/1",
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
    type: "blog_post",
  },
};
