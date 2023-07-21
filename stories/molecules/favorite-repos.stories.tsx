import { ComponentStory } from "@storybook/react";
import FavoriteRepos from "components/molecules/FavoriteRepos/favorite-repos";

const storyConfig = {
  title: "Design System/Molecules/Favorite Repos",
  component: "FavoriteRepos",
};

export default storyConfig;

//TableRepositoryName Template
const FavoriteReposTemplate: ComponentStory<typeof FavoriteRepos> = (args) => <FavoriteRepos {...args} />;

export const Default = FavoriteReposTemplate.bind({});

Default.args = {
  repos: [
    {
      name: "jsonhero-web",
      owner: "apihero-run",
      avatarURL: "https://avatars.githubusercontent.com/u/7252105?v=4",
      topic: "javascript",
    },
    {
      name: "insights",
      owner: "opensauced",
      avatarURL: "https://avatars.githubusercontent.com/u/52013393?s=64&v=4",
      topic: "javascript",
    },
    {
      name: "xstate",
      owner: "stately",
      avatarURL: "https://avatars.githubusercontent.com/u/69631?v=4",
      topic: "javascript",
    },
  ],
};
