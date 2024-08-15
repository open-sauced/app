import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
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
import Button from "components/shared/Button/button";
import DevCard from "components/molecules/DevCard/dev-card";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { setQueryParams } from "lib/utils/query-params";
import useSession from "lib/hooks/useSession";
import { captureAnalytics } from "lib/utils/analytics";

import useStore from "lib/store";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";
import { timezones } from "lib/utils/timezones";
import { useFetchUser } from "lib/hooks/useFetchUser";

type StepKeys = "1" | "2" | "3";

interface QueryParams {
  step: StepKeys;
}
interface LoginStep1Props {
  user: User | null;
}

const LoginStep1: React.FC<LoginStep1Props> = ({ user }) => {
  const { data: userInfo, isLoading } = useFetchUser(user?.user_metadata.user_name);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    captureAnalytics({
      title: "User Onboarding",
      property: "onboardingStep1",
      value: "visited",
      userInfo,
    });
  }, [userInfo, isLoading]);

  const router = useRouter();
  const { onboarded } = useSession();
  const { providerToken, signIn } = useSupabaseAuth();

  useEffect(() => {
    if (onboarded) {
      // router.push("/workspaces");
    } else if (onboarded === false && user && providerToken) {
      setQueryParams({ step: "2" } satisfies QueryParams);
    }
  }, [user, onboarded, providerToken, router]);

  const handleGitHubAuth = async () => {
    // Redirect user to GitHub to authenticate
    await signIn({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/start?step=2` },
    });
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
  user: User | null;
}

const LoginStep2: React.FC<LoginStep2Props> = ({ user }) => {
  const { data: userInfo, isLoading } = useFetchUser(user?.user_metadata.user_name);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    captureAnalytics({
      title: "User Onboarding",
      property: "onboardingStep2",
      value: "visited",
      userInfo,
    });
  }, [userInfo, isLoading]);

  const store = useStore();
  const { sessionToken } = useSupabaseAuth();
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezone = timezones.find((timezone) => timezone.utc.includes(userTimezone));
    if (timezone) {
      setTimezone(timezone.value);
    }
  }, []);

  const handleUpdateTimezone = async () => {
    setLoading(true);
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ interests: [], timezone }),
      });

      if (data.ok) {
        store.onboardUser();
        setQueryParams({ step: "3" } satisfies QueryParams);
      } else {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error onboarding user");
      }
    } catch (e) {
      setLoading(false);
      // eslint-disable-next-line no-console
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
              Provide your timezone to help companies discover you and connect on open source projects.
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

interface LoginStep3Props {
  user: User | null;
}

const LoginStep3: React.FC<LoginStep3Props> = ({ user }) => {
  type UserDevStats = DbUser & DbListContributorStat;
  const username: string = user?.user_metadata.user_name;
  const router = useRouter();
  const [userDevStats, setUserDevStats] = useState<UserDevStats | undefined>(undefined);

  async function fetchUserData(username: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/devstats`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return (await response.json()) as UserDevStats;
    }

    return undefined;
  }

  useEffect(() => {
    fetchUserData(username).then((devstats) => {
      setUserDevStats(devstats);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-full lg:gap-36">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="lg:hidden" IconImage={ChooseInterestsActiveIcon} size={48} />
            <Title className="!text-sm !text-light-orange-9">Congrats!</Title>
          </div>
          <div className="gap-2 mb-4">
            <Title className="!text-2xl">Share Your DevCard!</Title>
          </div>
          <div className="mb-4 text-left ">
            <Text className="!text-sm">
              Congratulations on your new account. Share your creator card to let other people know you&apos;re here.
            </Text>
          </div>
          <div className="flex justify-center mb-4 md:mb-0">
            {userDevStats && <DevCard key="card" isInteractive={false} user={userDevStats} isFlipped={false} />}
          </div>

          <Button
            variant="primary"
            onClick={() => router.push(`/u/${username}/card`)}
            className="justify-center w-full mt-4"
          >
            Go to Your DevCard
          </Button>

          <Button
            variant="primary"
            onClick={() => router.push(`/u/${username}`)}
            className="justify-center w-full mt-4"
          >
            Go to Your Profile
          </Button>
        </div>
      </div>
    </>
  );
};

const Login: WithPageLayout = () => {
  type LoginSteps = number;

  const { user } = useSupabaseAuth();
  const router = useRouter();
  const {
    query: { step },
  } = router;

  const highlighted = "!text-light-slate-12";

  const [currentLoginStep, setCurrentLoginStep] = useState<LoginSteps>(Number(step) || 1);

  useEffect(() => {
    if (step) {
      setCurrentLoginStep(Number(step));
    }
  }, [step]);

  return (
    <Card className="flex flex-col lg:flex-row w-[870px] min-h-[480px] !p-0 rounded-none lg:rounded-lg !bg-inherit lg:!bg-light-slate-2 lg:shadow-login !border-0 lg:!border-[1px] lg:!border-orange-500">
      <>
        <section className="w-full max-w-50%  p-6 lg:p-9">
          <div className="flex items-center gap-2 mb-6">
            <ProgressPie
              percentage={currentLoginStep === 1 ? 0 : currentLoginStep === 2 ? 33 : currentLoginStep === 3 ? 66 : 100}
            />
            <Title className="!text-2xl">Let&apos;s get started</Title>
          </div>
          <div className="mb-8">
            <Text className="!text-sm">
              OpenSauced is a platform to provide insights on open source contributions.{" "}
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
                  ? ChooseTimezoneActiveIcon
                  : currentLoginStep < 2
                  ? ChooseTimezoneIcon
                  : CompletedIcon
              }
              size={48}
            />
            <Text
              disabled={currentLoginStep !== 2}
              className={`!text-[16px]  ${currentLoginStep === 2 && highlighted}`}
            >
              What time is it?
            </Text>
          </div>
          <div className="items-center hidden gap-2 mb-8 lg:flex">
            <Icon
              IconImage={
                currentLoginStep === 3
                  ? ChooseInterestsActiveIcon
                  : currentLoginStep < 3
                  ? ChooseInterestsIcon
                  : CompletedIcon
              }
              size={48}
            />
            <Text
              disabled={currentLoginStep !== 3}
              className={`!text-[16px]  ${currentLoginStep === 3 && highlighted}`}
            >
              Share Your DevCard!
            </Text>
          </div>
        </section>
        <section className="w-full lg:max-w-[50%] p-9 rounded-lg lg:rounded-r-lg bg-white">
          {currentLoginStep === 1 && <LoginStep1 user={user} />}
          {currentLoginStep === 2 && <LoginStep2 user={user} />}
          {currentLoginStep >= 3 && <LoginStep3 user={user} />}
        </section>
      </>
    </Card>
  );
};

Login.PageLayout = LoginLayout;

export default Login;
