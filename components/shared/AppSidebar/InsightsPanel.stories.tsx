import { Meta, StoryObj } from "@storybook/react";
import { InsightsPanel } from "./InsightsPanel";

type Story = StoryObj<typeof InsightsPanel>;

const meta: Meta<typeof InsightsPanel> = {
  title: "Components/Workspaces/InsightsPanel",
  component: InsightsPanel,
  args: {
    isLoading: false,
  },
};

export default meta;

export const RepositoryInsights: Story = {
  args: {
    title: "Repository Insights",
    username: "bdougie",
    insights: new Array(5).fill("").map((_, i) => {
      return {
        id: `{i}`,
        user: {
          id: 1,
          name: "bdougie",
          user_email: "",
          login: "bdougie",
        },
        name: `Repository Insight ${i + 1}`,
        is_public: true,
        is_favorite: false,
        is_featured: false,
        short_code: `my-insight-${i}`,
        created_at: "2021-09-14T20:30:14.000Z",
        updated_at: "2021-09-14T20:30:14.000Z",
        repos: [],
        members: [],
      };
    }),
    type: "repo",
  },
};
export const ContributorInsights: Story = {
  args: {
    title: "Contributor Insights",
    username: "bdougie",
    insights: new Array(5).fill("").map((_, i) => {
      return {
        id: `{i}`,
        user: {
          id: 1,
          name: "bdougie",
          user_email: "",
          login: "bdougie",
        },
        name: `Contributor Insight ${i + 1}`,
        is_public: true,
        is_favorite: false,
        created_at: "2021-09-14T20:30:14.000Z",
        updated_at: "2021-09-14T20:30:14.000Z",
      };
    }),
    type: "list",
  },
};

export const Loading: Story = {
  args: {
    title: "Repository Insights",
    isLoading: true,
  },
};
