import { WithPageLayout } from "../interfaces/with-page-layout";
import LoginLayout from "layouts/login";
import { useRouter } from "next/router";
import Card from "components/atoms/Card/card";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Icon from "components/atoms/Icon/icon";
import CompletedIcon from "public/icons/completed-icon.svg";
import GitHubAuthActiveIcon from "public/icons/github-auth-active-icon.svg";
import ChooseRepoIcon from "public/icons/choose-repo-icon.svg";
import ChooseRepoActiveIcon from "public/icons/choose-repo-active-icon.svg";
import PATIcon from "public/icons/pat-icon.svg";
import PATActiveIcon from "public/icons/pat-active-icon.svg";
import HighlightIcon from "public/icons/highlight-icon.svg";
import GitHubIcon from "public/icons/github-icon.svg";
import Button from "components/atoms/Button/button";

const LoginStep1: React.FC = () => {
  return (
    <>
      <div className="flex flex-col h-full gap-16">
        <div>
          <div className="gap-2 mb-4">
            <Title className="!text-sm !text-light-orange-9">Step One</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Authenticate with GitHub</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">Before we start indexing open-source projects with OpenSauced, we will need you to authenticate with your GitHub account:</Text>
          </div>
          <div className="flex gap-2 items-start mb-4">
            <Icon IconImage={HighlightIcon} />
            <Text className="!text-[16px] !font-medium !text-light-slate-12">We will not have access to your private repos.</Text>
          </div>
          <div className="flex gap-2 items-start mb-4">
            <Icon IconImage={HighlightIcon} />
            <Text className="!text-[16px] !font-medium !text-light-slate-12">We will not spam you with emails.</Text>
          </div>
        </div>
        <div>
          <Button type="primary">Authenicate <Icon IconImage={GitHubIcon} className="ml-2"/></Button>
        </div>
      </div>
    </>
  );
};

const LoginStep2: React.FC = () => {
  return (
    <>
      <div className="flex flex-col h-full gap-6">
        <div>
          <div className="gap-2 mb-4">
            <Title className="!text-sm !text-light-orange-9">Step Two</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Provide your token</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">In order to provide fresh, and insightful data, we’ll need a favor: a GitHub personal access token to fetch public GitHub data. Here’s how we’re going to use your token:</Text>
          </div>
          <div className="flex gap-2 items-start mb-4">
            <Icon IconImage={HighlightIcon} />
            <Text className="!text-[16px] !font-medium !text-light-slate-12">Index insights from git data</Text>
          </div>
          <div className="flex gap-2 items-start mb-4">
            <Icon IconImage={HighlightIcon} />
            <div className="w-[calc(362px-24px)]">
              <Text className="!text-[16px] !font-medium !text-light-slate-12">Fetch basic GitHub information from Pull Requests and Issues</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="primary">Confirm Token</Button>
          <Button type="primary">Confirm Token</Button>
        </div>
      </div>
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

  const highlighted = "!text-light-slate-12";

  return (
    <Card className="flex w-[870px] h-[436px] text-left !p-0 !bg-light-slate-2 shadow-login border-orange-500">
      <>
        <div className="w-full h-full p-9">
          <div className="flex gap-2 mb-6">
            <ProgressPie percentage={66} />
            <Title className="!text-2xl">Let&apos;s get started</Title>
          </div>
          <div className="mb-8">
            <Text className="!text-sm">Open Sauced is a platform to provide insights on open source contributions. Let&apos;s start by logging in with GItHub.</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={GitHubAuthActiveIcon /* Completed */} size={48} />
            <Text className={`!text-[16px] !font-medium ${highlighted} !text-light-slate-12`}>Authenicate with GitHub</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={PATIcon /* Completed */} size={48} />
            <Text disabled className="!text-[16px] !font-medium">Provide a Personal Access Token</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={ChooseRepoIcon /* Completed */} size={48} />
            <Text disabled className="!text-[16px] !font-medium">Choose some repositories</Text>
          </div>
        </div>
        <div className="w-full h-full p-9 rounded-r-lg bg-white">
          <LoginStep2 />
        </div>
      </>
    </Card>
  );
};

Login.PageLayout = LoginLayout;

export default Login;