import { ComponentStory } from "@storybook/react";
import Badge from "components/atoms/InsightBadge/insight-badge";


const storyConfig = {
  title: "Design System/Atoms/Badge"
};

export default storyConfig;

const BadgeTemplate:ComponentStory<typeof Badge>  = (args) => <Badge {...args}/>;

export const isPublic =  BadgeTemplate.bind({});
isPublic.args = {isPublic:true};
export const isPrivate = BadgeTemplate.bind({});
isPublic.args = {isPublic:false};

