import { WithPageLayout } from "../interfaces/with-page-layout";
import LoginLayout from "layouts/login";
import { useRouter } from "next/router";
import Card from "components/atoms/Card/card";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Icon from "components/atoms/Icon/icon";
import Completed from "public/icons/completed-icon.svg";
import GitHubAuthActive from "public/icons/github-auth-active-icon.svg";
import ChooseRepo from "public/icons/choose-repo-icon.svg";
import ChooseRepoActive from "public/icons/choose-repo-active-icon.svg";
import PAT from "public/icons/pat-icon.svg";
import PATActive from "public/icons/pat-active-icon.svg";

const LoginStep1: React.FC = () => {
  return (
    <>
    </>
  );
};

const LoginStep2: React.FC = () => {
  return (
    <>
    </>
  );
};

const LoginStep3: React.FC = () => {
  return (
    <>
    </>
  );
};

const Login: WithPageLayout = () => {
  //const router = useRouter();

  return (
    <Card className="flex w-[870px] h-[436px] !p-0 !bg-light-slate-2 shadow-login border-none">
      <>
        <div className="w-full h-full p-9">
          <div className="flex gap-2 mb-6">
            <ProgressPie percentage={66} /> <Title className="!text-2xl">Let&apos;s get started</Title>
          </div>
          <div className="mb-8 text-left ">
            <Text className="!text-sm">Open Sauced is a platform to provide insights on open source contributions. Let&apos;s start by logging in with GItHub.</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={GitHubAuthActive /* Completed */} size={48} /> <Text className="!text-[16px]">Authenicate with GitHub</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={PAT /* Completed */} size={48} /> <Text className="!text-[16px]">Provide a Personal Access Token</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={ChooseRepo /* Completed */} size={48} /> <Text className="!text-[16px]">Choose some repositories</Text>
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