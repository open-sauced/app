import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getFormattedDate } from "lib/utils/date-utils";
import { useFetchAllHighlights } from "lib/hooks/useFetchAllHighlights";
import { useFetchHighlightRepos } from "lib/hooks/useFetchHiglightRepos";
import { useFetchSingleHighlight } from "lib/hooks/useFetchSingleHighlight";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import { Dialog, DialogCloseButton, DialogContent } from "components/molecules/Dialog/dialog";
import Avatar from "components/atoms/Avatar/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import HighlightsFilterCard from "components/molecules/HighlightsFeedCard/highlights-filter-card";
import ProfileLayout from "layouts/profile";
import { WithPageLayout } from "interfaces/with-page-layout";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import useFetchAllEmojis from "lib/hooks/useFetchAllEmojis";
import clsx from "clsx";
import FollowingHighlightWrapper from "components/organisms/FollowersHighlightWrapper/following-highlight-wrapper";
import { useFetchFollowersHighlightRepos } from "lib/hooks/useFetchFollowingHighlightRepos";
import HomeHighlightsWrapper from "components/organisms/HomeHighlightsWrapper/home-highlights-wrapper";

type activeTabType = "home" | "following";
type highlightReposType = { repoName: string; repoIcon: string; full_name: string };
const Feeds: WithPageLayout = () => {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [openSingleHighlight, setOpenSingleHighlight] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [activeTab, setActiveTab] = useState<activeTabType>("home");
  const [repoList, setRepoList] = useState<highlightReposType[]>();

  const { id } = router.query;
  const highlightId = id as string;

  const { data: repos } = useFetchHighlightRepos();
  const { data: followersRepo } = useFetchFollowersHighlightRepos();

  const { data, mutate, setPage, isError, isLoading, meta } = useFetchAllHighlights(selectedRepo);
  const { data: singleHighlight } = useFetchSingleHighlight(id as unknown as number);
  const { data: emojis } = useFetchAllEmojis();

  const repoTofilterList = (repos: { full_name: string }[]): highlightReposType[] => {
    const filtersArray = repos.map(({ full_name }) => {
      const [orgName, repo] = full_name.split("/");
      return { repoName: repo, repoIcon: `https://www.github.com/${orgName}.png?size=300`, full_name };
    });

    return filtersArray;
  };

  useEffect(() => {
    setSelectedRepo("");
    if (activeTab === "home" && repos) {
      setRepoList(repoTofilterList(repos));
    } else if (activeTab === "following" && followersRepo) {
      setRepoList(repoTofilterList(followersRepo));
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedRepo) {
      router.push(`/feed?repo=${selectedRepo}`);
      setPage(1);
    }
    if (highlightId) {
      setOpenSingleHighlight(true);
      router.push(`/feed/${id}`);
    }

    if (!selectedRepo && !highlightId) {
      router.push("/feed");
      setPage(1);
    }
  }, [selectedRepo, highlightId]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <></>;

  return (
    <div className="container flex flex-col gap-12 px-2 pt-12 mx-auto md:px-16 lg:justify-end md:flex-row">
      {singleHighlight && (
        <Dialog
          open={openSingleHighlight}
          onOpenChange={(open) => {
            if (!open) {
              router.push("/feed");
            }
          }}
        >
          <DialogContent className=" sm:max-w-[80%] w-full  sm:max-h-screen ">
            <div className="flex flex-col gap-8 mx-auto mt-10">
              <div className="flex flex-col gap-6 px-3 ">
                <div className="flex items-center gap-3 ">
                  <Avatar
                    alt="user profile avatar"
                    isCircle
                    size="sm"
                    avatarURL={`https://www.github.com/${singleHighlight.login}.png?size=300`}
                  />
                  <strong>{singleHighlight.login}</strong>
                  <span className="text-xs font-normal text-light-slate-11">
                    {getFormattedDate(singleHighlight.shipped_at)}
                  </span>
                  <DialogCloseButton onClick={() => router.push("/feed")} />
                </div>

                <div className="w-full px-2 py-6 border bg-light-slate-1 md:px-6 lg:px-12 rounded-xl">
                  <ContributorHighlightCard
                    emojis={emojis}
                    title={singleHighlight.title}
                    desc={singleHighlight.highlight}
                    prLink={singleHighlight.url}
                    user={singleHighlight.login}
                    id={singleHighlight.id}
                    shipped_date={singleHighlight.shipped_at}
                    refreshCallBack={mutate}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Tabs
        onValueChange={(value) => {
          setActiveTab(value as activeTabType);
        }}
        defaultValue="home"
        className="flex-1 lg:pl-[21.875rem]"
      >
        <TabsList className={clsx("justify-start  w-full border-b", !user && "hidden")}>
          <TabsTrigger
            className="data-[state=active]:border-sauced-orange data-[state=active]:border-b-2 text-2xl"
            value="home"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:border-sauced-orange  data-[state=active]:border-b-2 text-2xl"
            value="following"
          >
            Following
          </TabsTrigger>
        </TabsList>

        {user && (
          <div className="lg:gap-x-3 px-3 pt-4 flex max-w-[48rem]">
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
            <div className="mt-10 max-w-[48rem] flex px-2 items-center justify-between">
              <div>
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
                }}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="following">
          <FollowingHighlightWrapper selectedFilter={selectedRepo} emojis={emojis} />
        </TabsContent>
      </Tabs>
      <div className="hidden mt-10 md:block">
        {repoList && repoList.length > 0 && (
          <HighlightsFilterCard selectedFilter={selectedRepo} setSelected={setSelectedRepo} repos={repoList} />
        )}
      </div>
    </div>
  );
};

Feeds.PageLayout = ProfileLayout;
export default Feeds;
