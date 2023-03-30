import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import AuthSection from "components/molecules/AuthSection/auth-section";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";

const TopNav: React.FC = () => {
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();

  const { data: gitHubUser } = useFetchUser(user?.user_metadata.user_name);
  const userInterest = gitHubUser?.interests.split(",")[0] || "javascript";
  const router = useRouter();

  return (
    <header className="top-nav-container flex justify-between items-center z-50 py-0.5 bg-light-slate-3 border-b">
      <div className="flex justify-between items-start sm:items-center mx-auto container px-2 md:px-16">
        <div className="flex gap-3 md:gap-8 items-center flex-wrap">
          <HeaderLogo withBg={false} textIsBlack />
          <div className="flex flex-wrap gap-3 md:gap-8 mb-3 ml-2 sm:m-0 w-full sm:w-auto">
            {!!user && onboarded ? (
              <Link className={`text-sm ${getActiveStyle(router.asPath === "/hub/insights")}`} href={"/hub/insights"}>
                Insights
              </Link>
            ) : (
              ""
            )}

            <Link
              className={`text-sm ${getActiveStyle(router.asPath === `/${userInterest}/dashboard/filter/recent`)}`}
              href={`/${userInterest}/dashboard/filter/recent`}
            >
              Explore
            </Link>

            <Link className={`text-sm ${getActiveStyle(router.asPath === "/feed")}`} href={"/feed"}>
              Highlights
            </Link>
          </div>
        </div>
        <AuthSection />
      </div>
    </header>
  );
};

function getActiveStyle(isActive: boolean) {
  return isActive ? "text-light-orange-10" : "text-light-slate-10";
}

export default TopNav;
