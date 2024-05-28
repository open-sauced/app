import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import clsx from "clsx";

import { AiOutlineClose } from "react-icons/ai";
import TopContributorsPanel from "components/molecules/TopContributorsPanel/top-contributors-panel";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchAllHighlights } from "lib/hooks/useFetchAllHighlights";
import { useFetchHighlightRepos } from "lib/hooks/useFetchHiglightRepos";
import useFetchAllEmojis from "lib/hooks/useFetchAllEmojis";
import { useFetchFollowersHighlightRepos } from "lib/hooks/useFetchFollowingHighlightRepos";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { useFetchFeaturedHighlights } from "lib/hooks/useFetchFeaturedHighlights";
import { setQueryParams } from "lib/utils/query-params";

import { WithPageLayout } from "interfaces/with-page-layout";
import ProfileLayout from "layouts/profile";
import SEO from "layouts/SEO/SEO";

import { Dialog, DialogCloseButton, DialogContent } from "components/molecules/Dialog/dialog";
import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/shared/Button/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import HighlightsFilterCard from "components/molecules/HighlightsFeedCard/highlights-filter-card";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import FollowingHighlightWrapper from "components/organisms/FollowersHighlightWrapper/following-highlight-wrapper";
import HomeHighlightsWrapper from "components/organisms/HomeHighlightsWrapper/home-highlights-wrapper";
import NewsletterForm from "components/molecules/NewsletterForm/newsletter-form";
import UserCard, { MetaObj } from "components/atoms/UserCard/user-card";
import FeaturedHighlightsPanel from "components/molecules/FeaturedHighlightsPanel/featured-highlights-panel";
import AnnouncementCard from "components/molecules/AnnouncementCard/announcement-card";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import repoTofilterList, { HighlightReposType } from "lib/utils/repo-to-filter-list";

type ActiveTabType = "home" | "following";

interface HighlightSSRProps {
  highlight: DbHighlight | null;
  referer: string;
}

const Feeds: WithPageLayout<HighlightSSRProps> = (props: HighlightSSRProps) => {
  const { user, signIn } = useSupabaseAuth();
  const { data: repos } = useFetchHighlightRepos();

  const [host, setHost] = useState("");

  const { data: featuredHighlights } = useFetchFeaturedHighlights();

  const router = useRouter();
  const [openSingleHighlight, setOpenSingleHighlight] = useState(false);
  const selectedRepo = (router.query.repo as string) || "";
  const [activeTab, setActiveTab] = useState<ActiveTabType>("home");
  const [repoList, setRepoList] = useState<HighlightReposType[]>(repoTofilterList(repos as HighlightReposType[]));
  const [hydrated, setHydrated] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const singleHighlight = props.highlight;
  const ogImage = props?.highlight
    ? `${process.env.NEXT_PUBLIC_OPENGRAPH_URL}/highlights/${props.highlight.id}`
    : undefined;

  const { data: followersRepo } = useFetchFollowersHighlightRepos();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const { data, mutate, setPage, isLoading, meta } = useFetchAllHighlights(selectedRepo);
  const { data: emojis } = useFetchAllEmojis();

  const {
    data: loggedInUser,
    isLoading: loggedInUserLoading,
    mutate: refreshLoggedInUser,
  } = useFetchUser(user?.user_metadata.user_name as string);

  const { followers_count, following_count, highlights_count } = loggedInUser || {};

  const userMetaArray = [
    { name: "Followers", count: followers_count ?? 0 },
    { name: "Following", count: following_count ?? 0 },
    { name: "Highlights", count: highlights_count ?? 0 },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newHighlight = queryParams.get("new");
    const signInRequired = queryParams.get("signIn");

    if (newHighlight && signInRequired) {
      signIn({ provider: "github", options: { redirectTo: `${window.location.origin}/feed?${queryParams}` } });
    }
    // no need to create intervals for checking the highlight creation input if there is no new highlight
    if (!newHighlight) {
      return;
    }

    let isDesktop = window.innerWidth > 768;
    const highlightSelector = `#${isDesktop ? "" : "mobile-"}highlight-create`;
    let focusOnHighlighCreationInput = setInterval(() => {
      const highlightCreationInput = document.querySelector(highlightSelector) as HTMLInputElement;
      if (newHighlight && highlightCreationInput) {
        highlightCreationInput.click();
        isDesktop && highlightCreationInput.focus();
        clearInterval(focusOnHighlighCreationInput);
      }
    }, 1000);

    return () => {
      clearInterval(focusOnHighlighCreationInput);
    };
  }, []);

  useEffect(() => {
    if (activeTab === "home") {
      setRepoList(repoTofilterList(repos));
    } else if (activeTab === "following") {
      setRepoList(repoTofilterList(followersRepo));
    }
  }, [activeTab, repos]);

  useEffect(() => {
    if (singleHighlight && !openSingleHighlight) {
      setOpenSingleHighlight(true);
    }
  }, [singleHighlight]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  function onTabChange(value: string) {
    // Resetting URL search param for repo
    setQueryParams({}, ["repo"]);

    // Changing the active tab
    setActiveTab(value as ActiveTabType);
  }

  const shouldAllowDialogCloseAction =
    props.referer === null ||
    (typeof props.referer === "string" && !props.referer.includes(host)) ||
    (typeof props.referer === "string" && props.referer === `${host}/feed`);

  if (!hydrated)
    return (
      <>
        <SEO
          title={`${props?.highlight ? "Highlight | OpenSauced" : "Highlights | OpenSauced"}`}
          description={`${props?.highlight?.highlight || "OpenSauced Highlight"}`}
          image={ogImage}
          twitterCard="summary_large_image"
        />
        <div className="hidden">
          <NewsletterForm />
        </div>
      </>
    );

  return (
    <>
      <SEO
        title={`${props?.highlight ? "Highlight | OpenSauced" : "Highlights | OpenSauced"}`}
        description={`${props?.highlight?.highlight || "OpenSauced Highlight"}`}
        image={ogImage}
        twitterCard="summary_large_image"
      />

      <div
        className="container flex flex-col justify-center w-full gap-12 px-2 pt-4 pb-14 md:items-start md:px-16 md:flex-row"
        ref={topRef}
      >
        <div className={`sticky ${user ? "top-16" : "top-8"} xl:flex hidden flex-none w-1/5`}>
          <div className="flex flex-col w-full gap-6 mt-12">
            {user && (
              <div className="w-full">
                <UserCard
                  loading={loggedInUserLoading}
                  username={loggedInUser?.login as string}
                  meta={userMetaArray as MetaObj[]}
                  name={loggedInUser?.name as string}
                />
              </div>
            )}
            {isDesktop && (
              <TopContributorsPanel
                loggedInUserLogin={loggedInUser?.login ?? ""}
                loggedInUserId={loggedInUser?.id ?? undefined}
                refreshLoggedInUser={refreshLoggedInUser}
              />
            )}
            <AnnouncementCard
              title="Introducing StarSearch!"
              description={
                "Start using StarSearch, our AI-powered feature that allows you to ask questions and get answers with in-depth insights into contributor history and activities, bringing a new depth of knowledge about open source projects."
              }
              bannerSrc={"/assets/images/anouncement-cards/star-search-announcement-card.png"}
              url={"/star-search"}
              cta={"Try It Now!"}
            />
          </div>
        </div>
        {singleHighlight && (
          <Dialog
            open={openSingleHighlight}
            onOpenChange={(open) => {
              if (openSingleHighlight && !open) {
                if (shouldAllowDialogCloseAction) {
                  setOpenSingleHighlight(false);
                  router.replace("/feed");
                } else {
                  router.back();
                }
              }
            }}
          >
            <DialogContent className="sm:max-h-screen">
              <div className="flex flex-col gap-8 mx-auto mt-10">
                <div className="flex flex-col gap-6 px-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/user/${singleHighlight.login}`} className="flex items-center gap-3">
                      <Avatar
                        alt="user profile avatar"
                        isCircle
                        size="sm"
                        avatarURL={`https://www.github.com/${singleHighlight.login}.png?size=300`}
                      />
                      <strong>{singleHighlight.login}</strong>
                    </Link>
                    <span className="text-xs font-normal text-light-slate-11">
                      {formatDistanceToNowStrict(new Date(singleHighlight.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                    {shouldAllowDialogCloseAction ? (
                      <DialogCloseButton onClick={() => router.replace("/feed")} />
                    ) : (
                      <Button
                        variant="text"
                        onClick={() => router.back()}
                        className="!p-0 !border-0 absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100"
                      >
                        <AiOutlineClose size={20} />
                        <span className="sr-only">Close</span>
                      </Button>
                    )}
                  </div>

                  <div className="w-full px-2 py-6 border bg-light-slate-1 md:px-6 lg:px-12 rounded-xl">
                    <ContributorHighlightCard
                      emojis={emojis}
                      title={singleHighlight.title}
                      desc={singleHighlight.highlight}
                      highlightLink={singleHighlight.url}
                      user={singleHighlight.login}
                      id={singleHighlight.id}
                      shipped_date={singleHighlight.shipped_at}
                      type={singleHighlight.type}
                      refreshCallBack={mutate}
                      taggedRepos={singleHighlight.tagged_repos}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Tabs onValueChange={onTabChange} defaultValue="home" className="w-full 2xl:max-w-2xl xl:max-w-lg">
          <TabsList className={clsx("justify-start  w-full border-b", !user && "hidden")}>
            <TabsTrigger
              className="data-[state=active]:border-sauced-orange data-[state=active]:border-b-2 text-lg"
              value="home"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:border-sauced-orange  data-[state=active]:border-b-2 text-lg"
              value="following"
            >
              Following
            </TabsTrigger>
          </TabsList>

          {user && (
            <div className="flex max-w-3xl px-1 pt-4 lg:gap-x-3">
              <div className="hidden lg:inline-flex pt-[0.4rem]">
                <Avatar
                  alt="user profile avatar"
                  isCircle
                  size="sm"
                  avatarURL={`https://www.github.com/${user?.user_metadata.user_name}.png?size=300`}
                />
              </div>

              <HighlightInputForm refreshCallback={mutate} />
            </div>
          )}
          <TabsContent value="home">
            <HomeHighlightsWrapper emojis={emojis} mutate={mutate} highlights={data} loading={isLoading} />
            {meta.pageCount > 1 && (
              <div className="flex items-center justify-between max-w-3xl px-2 mt-10">
                <div className="flex items-center w-max gap-x-4">
                  <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"highlights"} />
                </div>
                <Pagination
                  pages={[]}
                  totalPage={meta.pageCount}
                  page={meta.page}
                  pageSize={meta.itemCount}
                  goToPage
                  hasNextPage={meta.hasNextPage}
                  hasPreviousPage={meta.hasPreviousPage}
                  onPageChange={function (page: number): void {
                    setPage(page);
                    if (topRef.current) {
                      topRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="following">
            <FollowingHighlightWrapper selectedFilter={selectedRepo} emojis={emojis} />
          </TabsContent>
        </Tabs>
        <div className="sticky flex-col flex-none hidden w-1/3 gap-6 mt-10 xl:w-1/4 lg:flex top-20">
          {repoList && repoList.length > 0 && (
            <HighlightsFilterCard
              setSelected={(repo) => {
                if (!openSingleHighlight) {
                  if (repo) {
                    setQueryParams({ repo });
                  } else {
                    setQueryParams({}, ["repo"]);
                  }
                  setPage(1);
                }
              }}
              repos={repoList}
              selectedFilter={selectedRepo}
            />
          )}

          {featuredHighlights && featuredHighlights.length > 0 && (
            <FeaturedHighlightsPanel highlights={featuredHighlights} />
          )}
          <NewsletterForm />
        </div>
      </div>
    </>
  );
};

Feeds.PageLayout = ProfileLayout;
export default Feeds;
