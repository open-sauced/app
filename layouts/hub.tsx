import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

import Text from "components/atoms/Typography/text";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import GitHubIcon from "img/icons/github-icon.svg";

import Title from "components/atoms/Typography/title";
import Search from "components/atoms/Search/search";
import Button from "components/shared/Button/button";
import Icon from "components/atoms/Icon/icon";
import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const HubLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signIn } = useSupabaseAuth();
  const navLinks = [
    { name: "Insights", href: "/hub/insights" },
    { name: "Lists", href: "/hub/lists" },
  ];
  const router = useRouter();
  const { pathname } = router;

  const validatePath = (path: string) => {
    const PATHREGEX = /^\/hub\/(insights|lists)?$/;

    return PATHREGEX.test(path);
  };

  const getActiveLinkClassNames = (href: string) => {
    return pathname === href ? "text-light-slate-12" : "text-slate-300";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-col items-center pt-20 page-container grow md:pt-14">
        <main className="flex flex-col items-center flex-1 w-full px-3 py-8 md:px-2 bg-light-slate-2">
          {user ? (
            <>
              <div className="container px-2 mx-auto md:px-16">
                {validatePath(pathname) ? (
                  <div className="container flex flex-col w-full gap-4 py-2">
                    <Title className="-mb-6 text-base text-sauced-orange">Your pages</Title>

                    <nav className="items-center justify-between block py-2 sm:flex ">
                      <ul className="flex items-center gap-3">
                        {navLinks.map((link, index) => (
                          <li key={`hub-nav-${index}-${link.name}`}>
                            <Link
                              className={clsx("text-3xl leading-none mx-0", getActiveLinkClassNames(link.href))}
                              href={link.href}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-3 mt-4">
                        {/* Search box temporarily hidden */}
                        <div className="hidden w-58">
                          <Search placeholder="Search repositories" className="max-w-full" name={"query"} />
                        </div>
                        {pathname.split("/")[2] === "insights" ? (
                          <Button href="/hub/insights/new" variant="primary">
                            New Insight
                          </Button>
                        ) : (
                          <Button href="/hub/lists/new" variant="primary">
                            New List
                          </Button>
                        )}
                      </div>
                    </nav>
                  </div>
                ) : null}

                {children}
              </div>
            </>
          ) : (
            <>
              {validatePath(pathname) ? (
                <nav className="flex items-center w-full container px-2 mx-auto md:px-16  gap-4">
                  <ul className="flex items-center gap-3">
                    {navLinks.map((link, index) => (
                      <li key={`hub-nav-${index}-${link.name}`}>
                        <Link
                          className={clsx("text-3xl leading-none mx-0", getActiveLinkClassNames(link.href))}
                          href={link.href}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
              <div className="container px-2 mx-auto md:px-16">{children}</div>
              <div className="flex flex-col items-center justify-center w-full mt-10 gap-4">
                <Text className="text-2xl font-semibold text-center">
                  Sign in to create your own {pathname.split("/")[2] === "insights" ? "Insight" : "List"} Pages
                </Text>
                <Button
                  onClick={() => {
                    signIn({
                      provider: "github",
                      options: {
                        redirectTo: pathname === "/hub/insights" ? "/hub/insights/new" : "/hub/lists/new",
                      },
                    });
                  }}
                  variant="primary"
                  className="px-8"
                >
                  Connect <span className="hidden sm:inline-block ml-1">with GitHub</span>
                  <Icon IconImage={GitHubIcon} className="ml-2" />
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HubLayout;
