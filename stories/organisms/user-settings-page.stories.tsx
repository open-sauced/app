import { ComponentStory } from "@storybook/react";
import UserSettingsPage from "components/organisms/UserSettingsPage/user-settings-page";

const StoryConfig = {
  title: "Design System/Organisms/UserSettingsPage"
};
export default StoryConfig;

const UserSettingsPageTemplate: ComponentStory<typeof UserSettingsPage> = () => <UserSettingsPage user={null} />;

export const Default = UserSettingsPageTemplate.bind({});
