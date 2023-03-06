import { useRouter } from "next/router";

import Avatar from "components/atoms/Avatar/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import HighlightsFilterCard from "components/molecules/HighlightsFeedCard/highlights-filter-card";
import ProfileLayout from "layouts/profile";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getFormattedDate } from "lib/utils/date-utils";
import { useFetchAllHighlights } from "lib/hooks/useFetchAllHighlights";
import { useFetchHighlightRepos } from "lib/hooks/useFetchHiglightRepos";
import { useEffect, useState } from "react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Link from "next/link";

const Feeds = () => {
  const { user } = useSupabaseAuth();
  const router = useRouter();

  const { data: repos } = useFetchHighlightRepos();

  const [selectedRepo, setSelectedRepo] = useState("");

  const { data, isLoading, isError } = useFetchAllHighlights(selectedRepo);

  const repoList =
    repos && // eslint-disable-next-line camelcase
    repos.map(({ full_name }) => {
      // eslint-disable-next-line camelcase
      const [orgName, repo] = full_name.split("/");
      // eslint-disable-next-line camelcase
      return { repoName: repo, repoIcon: `https://www.github.com/${orgName}.png?size=300`, full_name };
    });

  useEffect(() => {
    if (selectedRepo) {
      router.push(`/feed?repo=${selectedRepo}`);
    } else {
      router.push("/feed");
    }
  }, [selectedRepo]);

  return (
    <div className="container  mx-auto px-2 md:px-16 gap-12 lg:justify-end pt-12 flex flex-col md:flex-row">
      <Tabs defaultValue="Highlights" className="flex-1 lg:pl-[21.875rem]">
        <TabsList className="w-full border-b hidden justify-start">
          <TabsTrigger
            className="data-[state=active]:border-sauced-orange data-[state=active]:border-b-2 text-2xl"
            value="Highlights"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:border-sauced-orange  data-[state=active]:border-b-2 text-2xl"
            value="Following"
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Highlights">
          {data && data.length > 0 && (
            <div>
              {user && (
                <div className="lg:gap-x-3 px-3 pt-4 flex max-w-[48rem]">
                  <div className="hidden lg:inline-flex ">
                    <Avatar
                      alt="user profile avatar"
                      isCircle
                      size="sm"
                      avatarURL={`https://www.github.com/${user?.user_metadata.user_name}.png?size=300`}
                    />
                  </div>

                  <HighlightInputForm />
                </div>
              )}

              {/* Highlights List section */}
              <div className="mt-10 flex gap-8 flex-col ">
                {isLoading && (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <SkeletonWrapper radius={100} width={40} height={40} />{" "}
                      <SkeletonWrapper width={200} height={40} />
                    </div>
                    <SkeletonWrapper height={300} />
                  </div>
                )}
                {data &&
                  data.length > 0 &&
                  // eslint-disable-next-line camelcase
                  data.map(({ id, url, title, created_at, highlight, name, login }) => (
                    <div key={id} className="flex flex-col gap-6 px-3 ">
                      <div className="flex gap-3 items-center  ">
                        <Avatar
                          alt="user profile avatar"
                          isCircle
                          size="sm"
                          avatarURL={`https://www.github.com/${login}.png?size=300`}
                        />
                        <strong>{name || login}</strong>
                        <span className="text-xs text-light-slate-11 font-normal">{getFormattedDate(created_at)}</span>
                      </div>
                      <Link
                        href={`feed/${id}`}
                        className=" bg-light-slate-1 border p-4 md:px-6 lg:px-12 py-6 rounded-xl"
                      >
                        <ContributorHighlightCard
                          title={title}
                          desc={highlight}
                          prLink={url}
                          user={name || login}
                          id={id}
                        />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="Following"></TabsContent>
      </Tabs>
      <div className="mt-10 hidden md:block">
        {repoList.length > 0 && <HighlightsFilterCard setSelected={setSelectedRepo} repos={repoList} />}
      </div>
    </div>
  );
};

export default Feeds;

Feeds.PageLayout = ProfileLayout;
