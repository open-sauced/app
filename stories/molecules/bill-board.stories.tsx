import { Meta, StoryFn } from "@storybook/react";
import AnnouncementCard from "components/molecules/AnnouncementCard/announcement-card";

const storyConfig = {
  title: "design System/Molecules/BillBoard",
} as Meta<typeof AnnouncementCard>;
export default storyConfig;

const BillBoardTemplate: StoryFn<typeof AnnouncementCard> = (args) => <AnnouncementCard {...args} />;

export const Default = BillBoardTemplate.bind({});

Default.args = {
  title: "Meet Astro 🚀",
  bannerSrc:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  url: "https://github.com/open-sauced/insights",
  description:
    "Astro is a website build tool for the modern web. Powerful developer experience meets lightweight output.",
};
