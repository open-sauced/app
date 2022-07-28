import { WithPageLayout } from "../interfaces/with-page-layout";
import LoginLayout from "layouts/login";
import { useRouter } from "next/router";
import Card from "components/atoms/Card/card";

const Login: WithPageLayout = () => {
  //const router = useRouter();

  return (
    <Card className="flex w-[870px] h-[436px] !p-0 !bg-light-slate-2 shadow-login border-none">
      <>
        <div className="w-full h-full p-9">
          Test
        </div>
        <div className="w-full h-full p-9 rounded-r-lg bg-white">
          Test
        </div>
      </>
    </Card>
  );
};

Login.PageLayout = LoginLayout;

export default Login;