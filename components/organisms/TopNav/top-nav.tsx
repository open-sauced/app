import NavLinks from "components/molecules/NavLinks/nav-links";
import Link from "next/link";
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

  return (

    <header className="top-nav-container flex justify-between items-center z-50 py-0.5 bg-light-slate-3 border-b">
      <div className="flex justify-between items-center mx-auto container px-2 md:px-16">
        <div className="flex gap-3 md:gap-8 items-center flex-wrap">
          <HeaderLogo withBg={false} textIsBlack />
          <div className="flex flex-wrap gap-3 md:gap-8 mb-3 ml-2 sm:m-0 ">
            {!!user && onboarded ? (
              <>
                <Link className="text-sm text-light-slate-10" href={"/hub/insights"}>
                  Insights
                </Link>
                <Link className="text-sm text-light-slate-10" href={`/${userInterest}/dashboard/filter/recent`}>
                  Explore
                </Link>
              </>
            ) : (
              ""
            )}
            <Link className="text-sm text-light-slate-10" href={"/feed"}>
              Highlights
            </Link>
          </div>
        </div>
        <AuthSection />

      </div>
    </header>
  );
};

export default TopNav;
