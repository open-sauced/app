import { ComponentStory } from "@storybook/react";

import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

const storyConfig = {
  title: "Design System/Atoms/AvatarHoverCard"
};

export default storyConfig;

const AvatarTemplate: ComponentStory<typeof AvatarHoverCard> = (args) => (
  <div className="w-40 h-40 flex items-center justify-center">
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <AvatarHoverCard {...args} />
    </div>
  </div>
);

export const AvatarHoverCardStory = AvatarTemplate.bind({});

AvatarHoverCardStory.args = {
  contributor: "bdougie",
  repositories: []
};
