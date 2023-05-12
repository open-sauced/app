import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

import CompletedIcon from "img/icons/completed-icon.svg";
import GitHubAuthActiveIcon from "img/icons/github-auth-active-icon.svg";
import ChooseTimezoneIcon from "img/icons/choose-timezone.svg";
import ChooseTimezoneActiveIcon from "img/icons/choose-timezone-active.svg";
import ChooseInterestsIcon from "img/icons/choose-interests.svg";
import ChooseInterestsActiveIcon from "img/icons/choose-interests-active.svg";
import HighlightIcon from "img/icons/highlight-icon.svg";
import GitHubIcon from "img/icons/github-icon.svg";

import LoginLayout from "layouts/login";
import { WithPageLayout } from "interfaces/with-page-layout";

import Card from "components/atoms/Card/card";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Icon from "components/atoms/Icon/icon";
import Button from "components/atoms/Button/button";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { captureAnayltics } from "lib/utils/analytics";

import useStore from "lib/store";
import { getInterestOptions } from "lib/utils/getInterestOptions";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";
import { timezones } from "lib/utils/timezones";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

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
      router.push(`/user/${user?.user_metadata.user_name}`);
    } else if (onboarded === false && user && providerToken) {
      handleLoginStep();
    }
  }, [handleLoginStep, router, user, onboarded]);

  const handleGitHubAuth = async () => {
    // Redirect user to GitHub to authenticate
    await signIn({ provider: "github" });
  };

  return (
    <>
      <div className="flex flex-col justify-between lg:h-full lg:gap-20">
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
            <div className="flex items-start gap-2">
              <div className="mt-0.5 shrink-0">
                <Icon IconImage={HighlightIcon} />
              </div>
              <div className="mt-0">
                <Text className="!text-base !text-light-slate-12">We will not have access to your private repos.</Text>
              </div>
            </div>
            <div className="flex items-start gap-2">
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
          <Button onClick={handleGitHubAuth} variant="primary" className="justify-center w-full h-10 mt-3">
            Authenticate <Icon IconImage={GitHubIcon} className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
};

interface LoginStep2Props {
  handleLoginStep: handleLoginStep;
  handleUpdateInterests: (interests: string[]) => void;
}

const LoginStep2: React.FC<LoginStep2Props> = ({
  handleLoginStep,
  handleUpdateInterests: handleUpdateInterestsParent,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const interestArray = getInterestOptions();

  captureAnayltics("User Onboarding", "onboardingStep2", "visited");

  const handleSelectInterest = (interest: string) => {
    if (selectedInterests.length > 0 && selectedInterests.includes(interest)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  const handleUpdateInterest = async () => {
    handleUpdateInterestsParent(selectedInterests);
    handleLoginStep();
  };

  return (
    <>
      <div className="flex flex-col h-full login-step lg:gap-28">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="lg:hidden" IconImage={ChooseInterestsActiveIcon} size={48} />
            <Title className="!text-sm !text-light-orange-9">Step Two</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Choose your interests</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">
              Take a moment to select your interests to help us provide personalized project recommendations. By doing
              so, you&apos;ll find projects that match your skills and aspirations.
            </Text>
          </div>
          <div className="flex flex-wrap gap-3">
            {interestArray.map((topic, index) => (
              <LanguagePill
                onClick={() => handleSelectInterest(topic)}
                classNames={`${(selectedInterests || []).includes(topic) && "!bg-light-orange-10 !text-white"}`}
                topic={topic}
                key={index}
              />
            ))}
          </div>
        </div>
        <Button onClick={handleUpdateInterest} variant="primary" className="justify-center w-full h-10 mt-3">
          Confirm Selections
        </Button>
      </div>
    </>
  );
};

interface LoginStep3Props {
  handleLoginStep: handleLoginStep;
  interests: string[];
  user: User | null;
}

const LoginStep3: React.FC<LoginStep3Props> = ({ interests, user }) => {
  captureAnayltics("User Onboarding", "onboardingStep3", "visited");
  const store = useStore();
  const router = useRouter();
  const { sessionToken } = useSupabaseAuth();
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateTimezone = async () => {
    setLoading(true);
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ interests, timezone }),
      });

      if (data.ok) {
        store.onboardUser();
        router.push(`/user/${user?.user_metadata.user_name}`);
      } else {
        setLoading(false);
        console.error("Error onboarding user");
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full lg:gap-36">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="lg:hidden" IconImage={ChooseTimezoneActiveIcon} size={48} />
            <Title className="!text-sm !text-light-orange-9">Step Three</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">What time is it?</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">
              Provide your timezone to help companies discover you and collaborate on open source projects.
            </Text>
          </div>

          <div className="flex flex-col gap-2">
            <label>Time zone*</label>
            <Select onValueChange={(value) => setTimezone(value)} value={timezone} required>
              <SelectTrigger
                selectIcon={
                  <div className="relative pr-4">
                    <RiArrowUpSLine size={16} className="absolute -top-3" />
                    <RiArrowDownSLine size={16} className="absolute -bottom-3" />
                  </div>
                }
              >
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>

              <SelectContent position="item-aligned" className="bg-white">
                {timezones.map((timezone, index) => (
                  <SelectItem key={index} value={timezone.value}>
                    {timezone.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={handleUpdateTimezone}
          className="justify-center w-full h-10 mt-3 md:mt-0"
          disabled={loading || !timezone}
          loading={loading}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

const Login: WithPageLayout = () => {
  type LoginSteps = number;

  const { user } = useSupabaseAuth();

  const highlighted = "!text-light-slate-12";

  const [currentLoginStep, setCurrentLoginStep] = useState<LoginSteps>(1);
  const [interests, setInterests] = useState<string[]>([]);

  const handleLoginStep = async () => {
    setCurrentLoginStep((prevStep) => prevStep + 1);
  };

  return (
    <Card className="flex flex-col lg:flex-row w-[870px] min-h-[480px] !p-0 rounded-none lg:rounded-lg !bg-inherit lg:!bg-light-slate-2 lg:shadow-login !border-0 lg:!border-[1px] lg:!border-orange-500">
      <>
        <section className="w-full max-w-50%  p-6 lg:p-9">
          <div className="flex items-center gap-2 mb-6">
            <ProgressPie
              percentage={currentLoginStep === 1 ? 0 : currentLoginStep === 2 ? 33 : currentLoginStep === 3 ? 66 : 100}
            />
            <Title className="!text-2xl !tracking-tight">Let‘s get started</Title>
          </div>
          <div className="mb-8">
            <Text className="!text-sm">
              Open Sauced is a platform to provide insights on open source contributions.{" "}
            </Text>
          </div>
          <div className="items-center hidden gap-2 mb-8 lg:flex">
            <Icon IconImage={currentLoginStep === 1 ? GitHubAuthActiveIcon : CompletedIcon} size={48} />
            <Text
              disabled={currentLoginStep !== 1}
              className={`!text-[16px]  ${currentLoginStep === 1 && highlighted}`}
            >
              Authenticate with GitHub
            </Text>
          </div>
          <div className="items-center hidden gap-2 mb-8 lg:flex">
            <Icon
              IconImage={
                currentLoginStep === 2
                  ? ChooseInterestsActiveIcon
                  : currentLoginStep < 2
                  ? ChooseInterestsIcon
                  : CompletedIcon
              }
              size={48}
            />
            <Text
              disabled={currentLoginStep !== 2}
              className={`!text-[16px] !font-medium ${currentLoginStep === 2 && highlighted}`}
            >
              Choose your interests
            </Text>
          </div>
          <div className="items-center hidden gap-2 mb-8 lg:flex">
            <Icon
              IconImage={
                currentLoginStep === 3
                  ? ChooseTimezoneActiveIcon
                  : currentLoginStep < 3
                  ? ChooseTimezoneIcon
                  : CompletedIcon
              }
              size={48}
            />
            <Text
              disabled={currentLoginStep !== 3}
              className={`!text-[16px]  ${currentLoginStep === 3 && highlighted}`}
            >
              What time is it?
            </Text>
          </div>
        </section>
        <section className="w-full lg:max-w-[50%] p-9 rounded-lg lg:rounded-r-lg bg-white">
          {currentLoginStep === 1 && <LoginStep1 handleLoginStep={handleLoginStep} user={user} />}
          {currentLoginStep === 2 && (
            <LoginStep2
              handleLoginStep={handleLoginStep}
              handleUpdateInterests={(interests) => setInterests(interests)}
            />
          )}
          {currentLoginStep >= 3 && <LoginStep3 handleLoginStep={handleLoginStep} interests={interests} user={user} />}
        </section>
      </>
    </Card>
  );
};

Login.PageLayout = LoginLayout;

export default Login;
