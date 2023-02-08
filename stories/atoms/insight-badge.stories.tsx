import { ComponentStory } from "@storybook/react";
import InsightsBadge from "components/atoms/InsightBadge/insight-badge";

const storyConfig = {
  title: "Design System/Atoms/InsightsBadge"
};

export default storyConfig;

const BadgeTemplate: ComponentStory<typeof InsightsBadge> = (args) => <InsightsBadge {...args} />;

export const isPublic = BadgeTemplate.bind({});
isPublic.args = { isPublic: true };
export const isPrivate = BadgeTemplate.bind({});
isPrivate.args = { isPublic: false };
