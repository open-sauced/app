import { useState } from "react";
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
import TestRepoAvatar from "public/icons/test-repo-avatar.svg";
import AddIcon from "public/icons/add-icon.svg";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import { LoginRepoObjectInterface } from "interfaces/login-repo-object-interface";
import useLoginRepoList from "lib/hooks/useLoginRepoList";

type handleLoginStep = () => void;

interface LoginStep1Props {
  handleLoginStep: handleLoginStep;
}

const LoginStep1: React.FC<LoginStep1Props> = ({ handleLoginStep }) => {
  const handleGitHubAuth = () => {
    handleLoginStep();
  };

  return (
    <>
      <div className="flex flex-col h-full gap-24">
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
          <Button onClick={handleGitHubAuth} type="primary" className="w-full">Authenicate <Icon IconImage={GitHubIcon} className="ml-2"/></Button>
        </div>
      </div>
    </>
  );
};

interface LoginStep2Props {
  handleLoginStep: handleLoginStep;
}

const LoginStep2: React.FC<LoginStep2Props> = ({ handleLoginStep }) => {
  const handleAddPAT = () => {
    handleLoginStep();
  };

  return (
    <>
      <div className="flex flex-col h-full gap-5">
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
          <TextInput placeholder="Insert Your Token Here"/>
          <Button onClick={handleAddPAT} type="primary" className="w-full">Confirm Token</Button>
        </div>
      </div>
    </>
  );
};

interface LoginStep3Props {
  handleLoginStep: handleLoginStep;
  repoList: LoginRepoObjectInterface[];
}

const LoginStep3: React.FC<LoginStep3Props> = ({ repoList, handleLoginStep }) => {
  const router = useRouter();

  const handleSkipAddRepo = () => {
    handleLoginStep();
    router.push("/hacktoberfest");
  };

  return (
    <>
      <div className="flex flex-col h-full gap-5">
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
          <div className="h-[140px] overflow-y-auto">
            {
              repoList.map((repo, index) => 
                <div key={index} className="flex justify-between w-full border-[1px] rounded-lg border-light-slate-6 p-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Icon IconImage={TestRepoAvatar} size={24} />
                    <div>
                      <Text className="!text-[16px] !font-medium">{`${repo.repoOwner}/`}</Text>
                      <Text className="!text-[16px] !font-medium !text-light-slate-12">{`${repo.repoName}`}</Text>
                    </div>
                  </div>
                  <Button type="default">Follow <Icon IconImage={AddIcon} size={8} className="ml-2"/></Button>
                </div>
              )
            }
          </div>
        </div>
        <div onClick={handleSkipAddRepo} className="flex justify-center gap-2">
          <Title className="!text-sm font-semibold !text-light-orange-9">Skip this step</Title>
        </div>
      </div>
    </>
  );
};

const Login: WithPageLayout = () => {
  type LoginSteps = number;

  const repoList = useLoginRepoList();

  const highlighted = "!text-light-slate-12";

  const [ currentLoginStep, setCurrentLoginStep ] = useState<LoginSteps>(1);

  const handleLoginStep = () => {
    setCurrentLoginStep(prevStep => prevStep + 1);
  };

  return (
    <Card className="flex w-[870px] h-[436px] text-left !p-0 !bg-light-slate-2 shadow-login !border-orange-500">
      <>
        <div className="w-full h-full p-9">
          <div className="flex gap-2 mb-6">
            <ProgressPie percentage={currentLoginStep == 3 ? 100 : 66} />
            <Title className="!text-2xl">Let&apos;s get started</Title>
          </div>
          <div className="mb-8">
            <Text className="!text-sm">Open Sauced is a platform to provide insights on open source contributions. Let&apos;s start by logging in with GItHub.</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={currentLoginStep === 1 ? GitHubAuthActiveIcon : CompletedIcon} size={48} />
            <Text disabled={currentLoginStep !== 1} className={`!text-[16px] !font-medium ${currentLoginStep === 1 && highlighted}`}>Authenicate with GitHub</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={currentLoginStep === 2 ? PATActiveIcon : currentLoginStep < 2 ? PATIcon : CompletedIcon} size={48} />
            <Text disabled={currentLoginStep !== 2} className={`!text-[16px] !font-medium ${currentLoginStep === 2 && highlighted}`}>Provide a Personal Access Token</Text>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <Icon IconImage={currentLoginStep === 3 ? ChooseRepoActiveIcon : currentLoginStep < 3 ? ChooseRepoIcon : CompletedIcon} size={48} />
            <Text disabled={currentLoginStep !== 3} className={`!text-[16px] !font-medium ${currentLoginStep === 3 && highlighted}`}>Choose some repositories</Text>
          </div>
        </div>
        <div className="w-full h-full p-9 rounded-r-lg bg-white">
          {currentLoginStep === 1 && <LoginStep1 handleLoginStep={handleLoginStep}/>}
          {currentLoginStep === 2 && <LoginStep2 handleLoginStep={handleLoginStep}/>}
          {currentLoginStep >= 3 && <LoginStep3 handleLoginStep={handleLoginStep} repoList={repoList}/>}
        </div>
      </>
    </Card>
  );
};

Login.PageLayout = LoginLayout;

export default Login;