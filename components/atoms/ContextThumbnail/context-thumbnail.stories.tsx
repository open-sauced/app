import { ComponentStory } from "@storybook/react";
import Thumbnail from "../../../img/topic-thumbnails/javascript.svg";
import ContextThumbnail from "./context-thumbnail";

const storyConfig = {
  title: "Design System/Atoms/Context Thumbnail",
  component: "ContextThumbnail",
};

export default storyConfig;

//ContextThumbnail Template
const ContextThumbnailTemplate: ComponentStory<typeof ContextThumbnail> = (args) => <ContextThumbnail {...args} />;

export const Default = ContextThumbnailTemplate.bind({});

Default.args = {
  ContextThumbnailURL: Thumbnail.src,
  alt: "Test",
  size: 96,
};
