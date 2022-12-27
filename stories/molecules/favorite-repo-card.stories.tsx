import React from "react";
import { ComponentStory } from "@storybook/react";
import FavoriteRepoCard from "components/molecules/FavoriteRepoCard/favorite-repo-card";

const storyConfig = {
  title: "Design System/Molecules/Favorite Repo Card",
  component: "FavoriteRepoCard"
};

export default storyConfig;

//TableRepositoryName Template
const FavoriteRepoCardTemplate: ComponentStory<typeof FavoriteRepoCard> = (args) => <FavoriteRepoCard {...args} />;

export const Default = FavoriteRepoCardTemplate.bind({});

Default.args = {
  name: 'jsonhero-web',
  handle: 'apihero-run',
  avatarURL: 'https://avatars.githubusercontent.com/u/7252105?v=4'
};
