import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../Avatar/avatar-hover-card";
import Search from "./search";

type Story = StoryObj<typeof Search>;

const meta: Meta<typeof Search> = {
  title: "Components/Shared/Search",
  component: Search,
  args: {
    placeholder: "Search repositories",
    name: "Search",
  },
};

export default meta;

export const Default: Story = {};

export const Focused: Story = {
  args: {
    autoFocus: true,
  },
};

export const WithSuggestions = {
  args: {
    suggestions: ["openarch/north", "opencv/opencv", "openmusic5/featurecity"],
  },
};

export const WithRichSuggestions = {
  args: {
    suggestions: new Array(5).fill("").map((_, i) => {
      const owner = "open-sauced";
      const fullRepoName = `${owner}/awesome-pizza-project-${i}`;

      return {
        key: fullRepoName,
        node: (
          <div key={fullRepoName} className="flex items-center gap-2">
            <Avatar contributor={owner} size="xsmall" />
            <span>{fullRepoName}</span>
          </div>
        ),
      };
    }),
  },
};

export const WithSuggestionsLabel = {
  args: {
    suggestionsLabel: "Suggested repositories",
    suggestions: new Array(5).fill("").map((_, i) => {
      const owner = "open-sauced";
      const fullRepoName = `${owner}/awesome-pizza-project-${i}`;

      return {
        key: fullRepoName,
        node: (
          <div key={fullRepoName} className="flex items-center gap-2">
            <Avatar contributor={owner} size="xsmall" />
            <span>{fullRepoName}</span>
          </div>
        ),
      };
    }),
  },
};
