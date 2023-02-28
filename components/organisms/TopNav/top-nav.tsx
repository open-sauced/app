import NavLinks from "components/molecules/NavLinks/nav-links";
import Link from "next/link";
import React from "react";

import AuthSection from "components/molecules/AuthSection/auth-section";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const TopNav: React.FC = () => {
  const { user } = useSupabaseAuth();
  const { onboarded } = useSession();

  return (
    <header className="top-nav-container flex justify-between items-center z-50 py-0.5 bg-light-slate-3 border-b">
      <div className="flex justify-between items-center mx-auto container px-2 md:px-16">
        <div className="flex gap-8 items-center ">
          <HeaderLogo withBg={false} textIsBlack />
          {!!user && onboarded ? (
            <>
              <Link className="text-sm text-light-slate-10" href={"/hub/insights"}>
                Insights Hub
              </Link>
              <Link className="text-sm text-light-slate-10" href={"/javascript/dashboard/filter/recent"}>
                Explore
              </Link>
              <Link className="text-sm text-light-slate-10" href={"/feeds"}>
                Highlights
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <AuthSection />
      </div>
    </header>
  );
};

export default TopNav;
