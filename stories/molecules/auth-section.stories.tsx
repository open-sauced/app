import { ComponentStory, ComponentMeta } from "@storybook/react";
import AuthSection from "../../components/molecules/AuthSection/auth-section";

const storyConfig = {
  title: "Design System/Molecules/Auth Section"
};

export default storyConfig;

const testUser = {
  testAttr: false
};

const AuthSectionTemplate: ComponentStory<typeof AuthSection> = (args) => <div className="flex justify-center"><AuthSection {...args} /></div>;

export const NoAuthedUser = AuthSectionTemplate.bind({});
NoAuthedUser.args = {   };

export const AuthedUser = AuthSectionTemplate.bind({});
AuthedUser.args = { user: testUser };