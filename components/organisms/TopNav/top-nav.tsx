import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import AuthSection from "components/molecules/AuthSection/auth-section";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import OnboardingButton from "components/molecules/OnboardingButton/onboarding-button";
import Text from "components/atoms/Typography/text";

interface TopNavProps {
  hideInsights?: boolean;
  showSidebarButton?: boolean;
  showingSidebar?: boolean;
  sidebarToggle?: (showing: boolean) => void;
}

// TODO: hideInsights is temporary until we've moved everything to the workspace
// view with the new sidebar
const TopNav = ({
  hideInsights = false,
  showingSidebar = false,
  showSidebarButton = false,
  sidebarToggle,
}: TopNavProps) => {
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();
  return (
    <header className="top-nav-container w-full fixed top-0 left-0 z-50 py-0.5 bg-light-slate-2 border-b px-2">
      <div className="flex justify-between items-center mx-auto px-2">
        <div className="flex gap-3 md:gap-8 items-center">
          {showSidebarButton &&
            (showingSidebar ? (
              <button
                onClick={() => sidebarToggle && sidebarToggle(false)}
                className="w-fit hover:bg-slate-100 text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-2"
              >
                <TbLayoutSidebarLeftCollapseFilled className="w-5 h-5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={() => sidebarToggle && sidebarToggle(true)}
                className="w-fit hover:bg-slate-100 text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-2"
              >
                <TbLayoutSidebarLeftExpandFilled className="w-5 h-5 text-slate-400" />
              </button>
            ))}
          <HeaderLogo responsive={true} withBg={false} textIsBlack />
          <Nav className="hidden lg:flex" hideInsights={hideInsights} />
        </div>
        <AuthSection />
      </div>
      <div className="lg:hidden container mx-auto px-2 md:px-16 flex justify-between items-center">
        <Nav name="Mobile" hideInsights={hideInsights} />
        {user
          ? !onboarded && (
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

const Nav = ({
  className,
  name = "Main",
  hideInsights,
}: {
  className?: string;
  name?: string;
  hideInsights?: boolean;
}) => {
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();

  const { data: gitHubUser } = useFetchUser(user?.user_metadata.user_name);
  const userInterest = gitHubUser?.interests.split(",")[0] || "javascript";
  const router = useRouter();

  const explorePageUrlPattern = /^\/(?!pages|lists\/.*\/activity).*\/(dashboard|reports|contributors|activity).*/g;

  return (
    <nav className={className} aria-label={name}>
      <ul className="flex gap-3 md:gap-8 mb-1 ml-2 sm:m-0 w-full sm:w-auto">
        {hideInsights ? null : (
          <li>
            <Link
              className={`font-medium text-sm text-slate-700 hover:text-orange-500 transition-all ${getActiveStyle(
                router.asPath === "/hub/insights" || router.asPath.includes("/pages")
              )}`}
              href={"/hub/insights"}
            >
              Insights
            </Link>
          </li>
        )}
        <li>
          <Link
            className={`tracking-tight font-medium text-slate-700 text-sm hover:text-orange-500 transition-all ${getActiveStyle(
              explorePageUrlPattern.test(router.asPath)
            )}`}
            href={`/${userInterest}/dashboard/filter/recent`}
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            className={`tracking-tight font-medium text-sm text-slate-700 hover:text-orange-500 transition-all ${getActiveStyle(
              router.pathname === "/feed"
            )}`}
            href={"/feed"}
          >
            Highlights
          </Link>
        </li>
      </ul>
    </nav>
  );
};

function getActiveStyle(isActive: boolean) {
  return isActive ? "!text-orange-600" : "";
}

export default TopNav;
