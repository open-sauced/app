import { WithPageLayout } from "../interfaces/with-page-layout";
import LoginLayout from "layouts/login";
import { useRouter } from "next/router";
import Card from "components/atoms/Card/card";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";

const Login: WithPageLayout = () => {
  //const router = useRouter();

  return (
    <Card className="flex w-[870px] h-[436px] !p-0 !bg-light-slate-2 shadow-login border-none">
      <>
        <div className="w-full h-full p-9">
          <div className="flex gap-2 mb-6">
            <ProgressPie percentage={66} /> <Title className="!text-2xl">Let&apos;s get started</Title>
          </div>
          <div className="text-left text-sm mb-8">
            <Text>Open Sauced is a platform to provide insights on open source contributions. Let&apos;s start by logging in with GItHub.</Text>
          </div>
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