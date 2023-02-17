import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

import CompletedIcon from "img/icons/completed-icon.svg";
import GitHubAuthActiveIcon from "img/icons/github-auth-active-icon.svg";
import ChooseRepoIcon from "img/icons/choose-repo-icon.svg";
import ChooseRepoActiveIcon from "img/icons/choose-repo-active-icon.svg";
import PATIcon from "img/icons/pat-icon.svg";
import PATActiveIcon from "img/icons/pat-active-icon.svg";
import HighlightIcon from "img/icons/highlight-icon.svg";
import GitHubIcon from "img/icons/github-icon.svg";
import AddIcon from "img/icons/add-icon.svg";

import LoginLayout from "layouts/login";
import { WithPageLayout } from "interfaces/with-page-layout";
import { LoginRepoObjectInterface } from "interfaces/login-repo-object-interface";

import Card from "components/atoms/Card/card";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Icon from "components/atoms/Icon/icon";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";

import useLoginRepoList from "lib/hooks/useLoginRepoList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { captureAnayltics } from "lib/utils/analytics";
import { getAvatarByUsername } from "lib/utils/github";
import useStore from "lib/store";
import Avatar from "../components/atoms/Avatar/avatar";

type handleLoginStep = () => void;

interface LoginStep1Props {
  handleLoginStep: handleLoginStep;
  user: User | null;
}

const LoginStep1: React.FC<LoginStep1Props> = ({ handleLoginStep, user }) => {
  captureAnayltics("User Onboarding", "onboardingStep1", "visited");

  const router = useRouter();
  const { onboarded } = useSession();
  const { providerToken, signIn } = useSupabaseAuth();

  useEffect(() => {
    if (onboarded) {
      router.push("/hub/insights").then(() => {});
    } else if (onboarded === false && user && providerToken) {
      handleLoginStep();
    }
  }, [handleLoginStep, router, user, onboarded, providerToken]);

  const handleGitHubAuth = async () => {
    // Redirect user to GitHub to authenticate
    await signIn({ provider: "github" });
  };

  return (
    <>
      <div className=" flex flex-col lg:h-full  lg:gap-20 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="lg:hidden" IconImage={GitHubAuthActiveIcon} size={48} />
            <Title className="!text-sm !text-light-orange-9">Step One</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Authenticate with GitHub</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">
              Before we start indexing open-source projects with OpenSauced, we will need you to authenticate with your
              GitHub account:
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 shrink-0">
                <Icon IconImage={HighlightIcon} />
              </div>
              <div className="mt-0">
                <Text className="!text-base !text-light-slate-12">We will not have access to your private repos.</Text>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 shrink-0">
                <Icon IconImage={HighlightIcon} />
              </div>
              <div className="mt-0">
                <Text className="!text-base !text-light-slate-12">We will not spam you with emails.</Text>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={handleGitHubAuth} type="primary" className="w-full mt-3 md:mt-0 h-10">
            Authenticate <Icon IconImage={GitHubIcon} className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
};

interface LoginStep2Props {
  handleLoginStep: handleLoginStep;
  setRepoList: Function;
}

const LoginStep2: React.FC<LoginStep2Props> = ({ handleLoginStep, setRepoList }) => {
  const { providerToken } = useSupabaseAuth();
  const [orgName, setOrgName] = useState("");

  captureAnayltics("User Onboarding", "onboardingStep2", "visited");

  const handleSlugChange = (value: string) => {
    setOrgName(value);
  };

  const handleAddPAT = async () => {
    try {
      if (providerToken) {
        const ocktokit = new Octokit({ auth: providerToken });

        let repoList = [];
        let response: { data: { id: number; full_name: string }[] };

        if (orgName) {
          response = await ocktokit.request("GET /orgs/{org}/repos", {
            org: orgName,
            sort: "updated",
            direction: "desc",
            // eslint-disable-next-line
            per_page: 50
          });
        } else {
          response = await ocktokit.request("GET /user/repos", {
            visibility: "public",
            sort: "updated",
            direction: "desc",
            // eslint-disable-next-line
            per_page: 50
          });
        }

        repoList = response.data.map((repo) => {
          const [repoOwner, repoName] = repo.full_name.split("/");

          return {
            repoId: repo.id,
            repoName,
            repoOwner
          };
        });

        setRepoList(repoList);
      }

      // If valid, go to next step
      handleLoginStep();
    } catch (e) {
      // If invalid, display error
      console.error(e);
    }
  };

  return (
    <>
      <div className="login-step flex flex-col h-full gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="lg:hidden" IconImage={PATActiveIcon} size={48} />
            <Title className="!text-sm !text-light-orange-9">Step Two</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Provide your Organization</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">
              In order to provide fresh, and insightful data, we‘ll use your authenticated GitHub access token to fetch
              public GitHub data. Here‘s how we‘re going to use your token:
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 shrink-0">
                <Icon IconImage={HighlightIcon} />
              </div>
              <div className="mt-0">
                <Text className="!text-base !text-light-slate-12">Index insights from git data</Text>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 shrink-0">
                <Icon IconImage={HighlightIcon} />
              </div>
              <div className="mt-0">
                <Text className="!text-base !text-light-slate-12">
                  Fetch basic GitHub information from Pull Requests and Issues
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <TextInput
              placeholder="Organization Slug"
              descriptionText="Grab the slug from GitHub, eg: 'open-sauced'."
              classNames="!rounded-md !py-0.5 child:h-8 child:text-sm"
              handleChange={handleSlugChange}
            />
          </div>
          <Button onClick={handleAddPAT} type="primary" className="w-full mt-3 md:mt-0 h-10">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

interface LoginStep3Props {
  handleLoginStep: handleLoginStep;
  checkFollowed: {
    isClickedFollowed: boolean;
    setIsClickedFollowed: React.Dispatch<React.SetStateAction<boolean>>;
  };
  repoList: LoginRepoObjectInterface[];
}

const LoginStep3: React.FC<LoginStep3Props> = ({ repoList, checkFollowed }) => {
  captureAnayltics("User Onboarding", "onboardingStep3", "visited");
  const store = useStore();
  const router = useRouter();
  const { sessionToken } = useSupabaseAuth();

  const [isFollowing, setIsFollowing] = useState<boolean[]>(repoList.map(() => false));
  const following = isFollowing.filter((follow) => follow);

  const handleSkipAddRepo = async () => {
    try {
      const selectedRepos = repoList.filter((_, index) => isFollowing[index]);
      const repos = selectedRepos.map((repo) => ({ id: repo.repoId, fullName: `${repo.repoOwner}/${repo.repoName}`}));

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/onboarding`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ repos })
      });

      store.onboardUser();
    } catch (e) {
      // handle error
    }

    await router.push("/hub/insights");
  };

  const handleFollowRepo = (index: number) => {
    if (!isFollowing[index]) {
      setIsFollowing((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
      checkFollowed.setIsClickedFollowed(true);
    } else {
      setIsFollowing((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-full gap-5">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="lg:hidden" IconImage={ChooseRepoActiveIcon} size={48} />
            <Title className="!text-sm !text-light-orange-9">Step Three</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Follow some Repositories</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">
              We‘ll provide insights on the repos you choose to follow. You can follow up to 10 repos.
            </Text>
          </div>
          <div className="relative">
            <div className="absolute z-10 inset-x-0 top-[-1rem] h-[2rem] bg-white blur"></div>
            <div className="absolute z-10 inset-x-0 bottom-[-1rem] h-[2rem] bg-white blur"></div>
            <div className="max-h-72 overflow-y-auto py-4">
              {repoList.map((repo, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between w-full border-[1px] rounded-lg border-light-slate-6 p-2 mb-2 gap-2"
                  >
                    <div className="flex flex-col items-start shrink-1">
                      <div className="flex items-center gap-1">
                        <Avatar
                          isCached={true}
                          className="shrink-0 h-4 w-4 rounded overflow-hidden"
                          size={40}
                          avatarURL={getAvatarByUsername(repo.repoOwner)}
                          isCircle={false}
                        />

                        <Text className="!text-sm ">{`${repo.repoOwner}/`}</Text>
                      </div>
                      <div className="w-full">
                        <Text className="!text-base !text-light-slate-12 break-all">{`${repo.repoName}`}</Text>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button
                        disabled={following.length >= 10 && !isFollowing[index]}
                        onClick={() => handleFollowRepo(index)}
                        type={isFollowing[index] ? "outline" : "default"}
                      >
                        {isFollowing[index] ? (
                          "Following"
                        ) : (
                          <>
                            Follow <Icon IconImage={AddIcon} size={8} className="shrink-0 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div onClick={handleSkipAddRepo} className="flex justify-center gap-2">
          <Title className="!text-sm font-semibold !text-light-orange-9 cursor-pointer">
            {following.length > 0 ? "Continue" : "Skip this step"}
          </Title>
        </div>
      </div>
    </>
  );
};

const Login: WithPageLayout = () => {
  type LoginSteps = number;

  const { user } = useSupabaseAuth();
  const { repoList, setRepoList } = useLoginRepoList();

  const highlighted = "!text-light-slate-12";

  const [currentLoginStep, setCurrentLoginStep] = useState<LoginSteps>(1);
  const [isClickedFollowed, setIsClickedFollowed] = useState<boolean>(false);

  const checkFollowed = { isClickedFollowed, setIsClickedFollowed };

  const handleLoginStep = async () => {
    setCurrentLoginStep((prevStep) => prevStep + 1);
  };

  return (
    <Card className="flex flex-col lg:flex-row w-[870px] min-h-[480px] !p-0 rounded-none lg:rounded-lg !bg-inherit lg:!bg-light-slate-2 lg:shadow-login !border-0 lg:!border-[1px] lg:!border-orange-500">
      <>
        <section className="w-full max-w-50%  p-6 lg:p-9">
          <div className="flex items-center gap-2 mb-6">
            <ProgressPie
              percentage={
                currentLoginStep === 1
                  ? 0
                  : currentLoginStep === 2
                    ? 33
                    : currentLoginStep === 3 && !isClickedFollowed
                      ? 66
                      : 100
              }
            />
            <Title className="!text-2xl !tracking-tight">Let‘s get started</Title>
          </div>
          <div className="mb-8">
            <Text className="!text-sm">
              Open Sauced is a platform to provide insights on open source contributions.{" "}
            </Text>
          </div>
          <div className="hidden lg:flex gap-2 items-center mb-8">
            <Icon IconImage={currentLoginStep === 1 ? GitHubAuthActiveIcon : CompletedIcon} size={48} />
            <Text
              disabled={currentLoginStep !== 1}
              className={`!text-[16px]  ${currentLoginStep === 1 && highlighted}`}
            >
              Authenicate with GitHub
            </Text>
          </div>
          <div className="hidden lg:flex gap-2 items-center mb-8">
            <Icon
              IconImage={currentLoginStep === 2 ? PATActiveIcon : currentLoginStep < 2 ? PATIcon : CompletedIcon}
              size={48}
            />
            <Text
              disabled={currentLoginStep !== 2}
              className={`!text-[16px] !font-medium ${currentLoginStep === 2 && highlighted}`}
            >
              Provide your Organization
            </Text>
          </div>
          <div className="hidden lg:flex gap-2 items-center mb-8">
            <Icon
              IconImage={
                currentLoginStep === 3 && !isClickedFollowed
                  ? ChooseRepoActiveIcon
                  : currentLoginStep < 3
                    ? ChooseRepoIcon
                    : CompletedIcon
              }
              size={48}
            />
            <Text
              disabled={currentLoginStep !== 3}
              className={`!text-[16px]  ${currentLoginStep === 3 && highlighted}`}
            >
              Choose some repositories
            </Text>
          </div>
        </section>
        <section className="w-full lg:max-w-[50%] p-9 rounded-lg lg:rounded-r-lg bg-white">
          {currentLoginStep === 1 && <LoginStep1 handleLoginStep={handleLoginStep} user={user} />}
          {currentLoginStep === 2 && <LoginStep2 handleLoginStep={handleLoginStep} setRepoList={setRepoList} />}
          {currentLoginStep >= 3 && (
            <LoginStep3 handleLoginStep={handleLoginStep} repoList={repoList} checkFollowed={checkFollowed} />
          )}
        </section>
      </>
    </Card>
  );
};

Login.PageLayout = LoginLayout;

export default Login;
