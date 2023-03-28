import { ComponentStory } from "@storybook/react";
import ContextThumbnail from "../../components/atoms/ContextThumbnail/context-thumbnail";
import Thumbnail from "../../img/hacktoberfest-icon.png";

const storyConfig = {
  title: "Design System/Atoms/Context Thumbnail",
  component: "ContextThumbnail"
};

export default storyConfig;

//ContextThumbnail Template
const ContextThumbnailTemplate: ComponentStory<typeof ContextThumbnail> = (args) => <ContextThumbnail {...args} />;

export const Default = ContextThumbnailTemplate.bind({});

Default.args = {
  ContextThumbnailURL: Thumbnail.src,
  alt: "Test",
  size: 96
};
