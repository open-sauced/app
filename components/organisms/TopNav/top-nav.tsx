import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AuthSection from "components/molecules/AuthSection/auth-section";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import OnboardingButton from "components/molecules/OnboardingButton/onboarding-button";
import Text from "components/atoms/Typography/text";

const TopNav: React.FC = () => {
  const { user } = useSupabaseAuth();
  const { onboarded, session } = useSession();
  return (
    <header className="top-nav-container w-full fixed top-0 left-0 z-50 py-0.5 bg-light-slate-2 border-b">
      <div className="flex justify-between items-center mx-auto container px-2 md:px-16">
        <div className="flex gap-3 md:gap-8 items-center">
          <HeaderLogo withBg={false} textIsBlack />
          <Nav className="hidden lg:flex" />
        </div>
        <AuthSection />
      </div>
      <div className="lg:hidden container mx-auto px-2 md:px-16 flex justify-between items-center">
        <Nav name="Mobile" className="" />
        {user
          ? session &&
            !onboarded && (
              <div className="relative">
                <OnboardingButton aria="onboarding" className="!flex !pr-1 mb-1 mr-2">
                  <Text className="text-sm !text-light-slate-12 hidden sm:block py-1 px-2">
                    Complete the onboarding
                  </Text>
                </OnboardingButton>
                <div id="onboarding" className="flex flex-col absolute right-0 sm:hidden">
                  <span className="border-x-transparent border-x-[7px] border-b-[7px] border-b-orange-500 h-0 w-0 self-end mr-[1.1rem]" />
                  <Text className="text-sm py-1 px-2 w-max rounded shadow-lg bg-light-slate-2 !text-light-orange-9 outline-[1px] outline outline-orange-500">
                    Complete the onboarding
                  </Text>
                </div>
              </div>
            )
          : null}
      </div>
    </header>
  );
};

const Nav = ({ className, name = "Main" }: { className?: string; name?: string }) => {
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();

  const { data: gitHubUser } = useFetchUser(user?.user_metadata.user_name);
  const userInterest = gitHubUser?.interests.split(",")[0] || "hacktoberfest";
  const router = useRouter();

  return (
    <nav className={className} aria-label={name}>
      <ul className="flex gap-3 md:gap-8 mb-1 ml-2 sm:m-0 w-full sm:w-auto">
        {!!user && onboarded && (
          <li>
            <Link className={`text-sm ${getActiveStyle(router.asPath === "/hub/insights")}`} href={"/hub/insights"}>
              Insights
            </Link>
          </li>
        )}
        <li>
          <Link
            className={`text-sm ${getActiveStyle(router.asPath === `/${userInterest}/dashboard/filter/recent`)}`}
            href={`/${userInterest}/dashboard/filter/recent`}
          >
            Explore
          </Link>
        </li>
        <li>
          <Link className={`text-sm ${getActiveStyle(router.pathname === "/feed")}`} href={"/feed"}>
            Highlights
          </Link>
        </li>
      </ul>
    </nav>
  );
};

function getActiveStyle(isActive: boolean) {
  return isActive ? "text-light-orange-10" : "text-light-slate-10";
}

export default TopNav;
