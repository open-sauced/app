import Login from "pages/start";
import LoginLayout from "layouts/login";

const storyConfig = {
  title: "Design System/Pages/Login"
};

export default storyConfig;

export const LoginPage = () =>
  <LoginLayout>
    <Login />
  </LoginLayout>;