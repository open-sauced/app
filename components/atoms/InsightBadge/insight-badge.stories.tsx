import { ComponentStory } from "@storybook/react";
import InsightsBadge from "components/atoms/InsightBadge/insight-badge";

const storyConfig = {
  title: "Design System/Atoms/InsightsBadge",
};

export default storyConfig;

const BadgeTemplate: ComponentStory<typeof InsightsBadge> = (args) => <InsightsBadge {...args} />;

export const IsPublic = BadgeTemplate.bind({});
IsPublic.args = { isPublic: true };
export const IsPrivate = BadgeTemplate.bind({});
IsPrivate.args = { isPublic: false };
