import Login from "pages/login";
import LoginLayout from "layouts/login";

const storyConfig = {
  title: "Design System/Pages/Login"
};

export default storyConfig;

export const LoginPage = () =>
  <LoginLayout>
    <Login />
  </LoginLayout>;