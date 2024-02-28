import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import Tooltip from "components/atoms/Tooltip/tooltip";
import AuthSection from "components/molecules/AuthSection/auth-section";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import OnboardingButton from "components/molecules/OnboardingButton/onboarding-button";
import ThemeToggle from "components/molecules/ThemeToggle/theme-toggle";

import { useFetchUser } from "lib/hooks/useFetchUser";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const TopNav = () => {
  const { theme } = useTheme();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();

  return (
    <header className="top-nav-container w-full fixed top-0 left-0 z-50 py-0.5 bg-background !text-foreground border-b px-2">
      <div className="flex items-center justify-between gap-2 px-2 mx-auto">
        <div className="flex items-center gap-3 md:gap-8">
          <HeaderLogo responsive={true} withBg={false} textIsBlack={theme === "light"} />
          <Nav className="flex flex-1" />
          {user && onboarded === false && (
            <div className="relative lg:hidden">
              <Tooltip content="Complete the onboarding" defaultOpen={!isLargeScreen}>
                <OnboardingButton ariaLabel="Complete the onboarding" />
              </Tooltip>
            </div>
          )}
        </div>
        <div className="flex items-center ml-auto">
          <ThemeToggle />
          <AuthSection />
        </div>
      </div>
    </header>
  );
};

const Nav = ({ className }: { className?: string }) => {
  const { user } = useSupabaseAuth();

  const { data: gitHubUser } = useFetchUser(user?.user_metadata.user_name);
  const userInterest = gitHubUser?.interests.split(",")[0] || "javascript";
  const router = useRouter();

  const explorePageUrlPattern = /^\/(?!pages|lists\/.*\/activity).*\/(dashboard|reports|contributors|activity).*/g;

  return (
    <nav className={className} aria-label="top navigation">
      <ul className="flex w-full gap-3 mb-1 ml-2 md:gap-8 sm:m-0 sm:w-auto">
        {user ? (
          <li>
            <Link
              className={`font-medium text-sm hover:text-orange-500 transition-all ${getActiveStyle(
                router.asPath.startsWith("/workspaces/") || router.asPath.includes("/pages")
              )}`}
              href={"/"}
            >
              Workspace
            </Link>
          </li>
        ) : null}
        <li className="hidden lg:inline">
          <Link
            className={`tracking-tight font-medium text-sm hover:text-orange-500 transition-all ${getActiveStyle(
              explorePageUrlPattern.test(router.asPath)
            )}`}
            href={`/${userInterest}/dashboard/filter/recent`}
          >
            Explore
          </Link>
        </li>
        <li className="hidden lg:inline">
          <Link
            className={`tracking-tight font-medium text-sm hover:text-orange-500 transition-all ${getActiveStyle(
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
