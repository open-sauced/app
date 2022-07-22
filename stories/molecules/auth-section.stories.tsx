import { ComponentStory, ComponentMeta } from "@storybook/react";
import AuthSection from "../../components/molecules/AuthSection/auth-section";

const storyConfig = {
  title: "Design System/Molecules/Auth Section"
};

export default storyConfig;

const testUser = {
  isAuthed: true,
  testAttr: false
};

const AuthSectionTemplate: ComponentStory<typeof AuthSection> = (args) => <AuthSection {...args} />;

export const NoAuthedUser = AuthSectionTemplate.bind({});
NoAuthedUser.args = {   };

export const AuthedUser = AuthSectionTemplate.bind({});
AuthedUser.args = { user: testUser };