import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { supabase } from "lib/utils/supabase";

import Title from "components/atoms/Typography/title";
import Search from "components/atoms/Search/search";
import Button from "components/atoms/Button/button";
import Footer from "../components/organisms/Footer/footer";
import TopNav from "../components/organisms/TopNav/top-nav";

const HubLayout = ({ children }: { children: React.ReactNode }) => {
  const { onboarded } = useSession();
  const { user } = useSupabaseAuth();
  const navLinks = [
    { name: "Insights", href: "/hub/insights" },
    { name: "Lists", href: "/hub/lists" },
  ];
  const router = useRouter();

  const validatePath = (path: string) => {
    const PATHREGEX = /^\/hub\/(insights|lists)(\/(new|[\d]+\/edit))?$/;

    return PATHREGEX.test(path);
  };

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await supabase.auth.getSession();

        if (!currentUser?.data?.session) {
          await router.push("/feed");
        }
      } catch (e: unknown) {
        router.push("/feed");
      }
    }

    getUser()
      .catch(console.error)
      .then(() => {});
  }, [router, onboarded]);

  const getActiveLinkClassNames = (href: string) => {
    return router.pathname === href ? "text-light-slate-11" : "text-slate-300";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-col items-center pt-20 page-container grow md:pt-14">
        <main className="flex flex-col items-center flex-1 w-full px-3 py-8 md:px-2 bg-light-slate-2">
          {user ? (
            <>
              <div className="container px-2 mx-auto md:px-16">
                {validatePath(router.pathname) ? (
                  <div className="container flex flex-col w-full gap-4 py-2">
                    <Title className="-mb-6 text-base text-sauced-orange">Your pages</Title>

                    <nav className="items-center justify-between block py-2 sm:flex ">
                      <ul className="flex items-center gap-3">
                        {navLinks.map((link, index) => (
                          <li key={`hub-nav-${index}-${link.name}`}>
                            <Link
                              className={clsx(
                                "text-3xl leading-none font-medium mx-0",
                                getActiveLinkClassNames(link.href)
                              )}
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
                        {router.pathname.split("/")[2] === "insights" ? (
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
            <></>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HubLayout;
