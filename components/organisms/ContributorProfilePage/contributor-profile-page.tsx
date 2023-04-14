import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import ContributorProfileHeader from "components/molecules/ContributorProfileHeader/contributor-profile-header";
import { ContributorObject } from "../ContributorCard/contributor-card";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import color from "lib/utils/color.json";
import { useTopicContributorCommits } from "lib/hooks/useTopicContributorCommits";
import { getRelativeDays } from "lib/utils/date-utils";
import Pill from "components/atoms/Pill/pill";
import getPercent from "lib/utils/get-percent";
import ContributorProfileInfo from "components/molecules/ContributorProfileInfo/contributor-profile-info";
import ContributorProfileTab from "../ContributorProfileTab/contributor-profile-tab";
import ProfileLanguageChart from "components/molecules/ProfileLanguageChart/profile-language-chart";
import useFollowUser from "lib/hooks/useFollowUser";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const colorKeys = Object.keys(color);
interface PrObjectType {
  prName: string;
  prStatus: string;
  prIssuedTime: string;
  prMergedTime: string;
  noOfFilesChanged: number;
  noOfLinesChanged: number;
  repoName: string;
  repoOwner: string;
  prNumber: number;
}

interface ContributorProfilePageProps {
  contributor?: ContributorObject;
  topic?: string;
  repositories?: number[];
  listOfPRs?: PrObjectType[];
  githubAvatar?: string;
  githubName: string;
  langList: string[];
  repoList: RepoList[];
  recentContributionCount: number;
  user?: DbUser;
  prTotal: number;
  openPrs: number;
  prReviews: number;
  prVelocity: number;
  prMerged: number;
  loading: boolean;
  error: boolean;
}
const ContributorProfilePage = ({
  repositories,
  recentContributionCount,
  user,
  githubAvatar,
  githubName,
  langList,
  repoList,
  openPrs,
  prTotal,
  loading,
  prMerged,
  prVelocity
}: ContributorProfilePageProps) => {
  const languageList = langList?.map((language) => {
    const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.toLowerCase());

    return {
      languageName: preparedLanguageKey ? preparedLanguageKey : language,
      percentageUsed: Math.round((1 / langList.length) * 100)
    };
  });

  const { user: loggedInUser, signIn } = useSupabaseAuth();

  const { chart } = useTopicContributorCommits(githubName, "*", repositories);
  const prsMergedPercentage = getPercent(prTotal, prMerged || 0);
  const { data: Follower, isError: followError, follow, unFollow } = useFollowUser(user?.login || "");

  const {
    bio,
    location,
    interests,
    name,
    twitter_username,
    timezone,
    github_sponsors_url: githubSponsorsUrl,
    linkedin_url: linkedInUrl,
    display_local_time: displayLocalTime
  } = user || {};

  return (
    <div className="w-full ">
      {loading ? (
        <SkeletonWrapper height={200} />
      ) : (
        <ContributorProfileHeader
          handleSignIn={signIn}
          username={user?.login}
          user={loggedInUser}
          isFollowing={followError ? false : true}
          isConnected={!!user}
          githubName={githubName}
          avatarUrl={githubAvatar}
          handleFollow={follow}
          handleUnfollow={unFollow}
          isOwner={user?.login === loggedInUser?.user_metadata.user_name}
        />
      )}
      <div className="container flex flex-col justify-between w-full px-2 pt-24 mx-auto overflow-hidden md:px-16 lg:flex-row lg:gap-40">
        <div className="flex flex-col gap-4 w-80 ">
          {loading ? (
            <SkeletonWrapper height={210} radius={12} classNames="pb-16 lg:pb-0" />
          ) : (
            <>
              <ContributorProfileInfo
                interests={interests}
                // eslint-disable-next-line camelcase
                twitterUsername={twitter_username}
                bio={bio}
                githubName={githubName}
                isConnected={!!user}
                timezone={timezone}
                displayLocalTime={displayLocalTime}
                githubSponsorsUrl={githubSponsorsUrl}
                linkedInUrl={linkedInUrl}
              />

              <div>
                <p className="mb-4">Languages</p>
                <ProfileLanguageChart languageList={languageList} />
              </div>
            </>
          )}
        </div>
        <div className="flex-1 mt-10 lg:mt-0">
          {loading ? (
            <SkeletonWrapper height={500} radius={12} />
          ) : (
            <>
              {!!user ? (
                <ContributorProfileTab
                  repoList={repoList}
                  recentContributionCount={recentContributionCount}
                  prVelocity={prVelocity}
                  chart={chart}
                  openPrs={openPrs}
                  githubName={githubName}
                  prMerged={prMerged}
                  contributor={user}
                  prTotal={prTotal}
                  prsMergedPercentage={prsMergedPercentage}
                />
              ) : (
                <>
                  <div>
                    <Title className="!text-light-slate-12 !text-xl" level={4}>
                      Contribution Insights
                    </Title>
                  </div>
                  <div className="p-4 mt-4 bg-white border rounded-2xl md:p-6">
                    <div className="flex flex-col justify-between gap-2 lg:flex-row md:gap-12 lg:gap-16">
                      <div>
                        <span className="text-xs text-light-slate-11">PRs opened</span>
                        {openPrs ? (
                          <div className="flex mt-1 lg:justify-center md:pr-8">
                            <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                              {openPrs} PRs
                            </Text>
                          </div>
                        ) : (
                          <div className="flex items-end justify-center mt-1"> - </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
                        {prVelocity ? (
                          <div className="flex items-center gap-2 lg:justify-center">
                            <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                              {getRelativeDays(prVelocity)}
                            </Text>

                            <Pill color="purple" text={`${prsMergedPercentage}%`} />
                          </div>
                        ) : (
                          <div className="flex items-end justify-center mt-1"> - </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs text-light-slate-11">Contributed Repos</span>
                        {recentContributionCount ? (
                          <div className="flex mt-1 lg:justify-center">
                            <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                              {`${recentContributionCount} Repo${recentContributionCount > 1 ? "s" : ""}`}
                            </Text>
                          </div>
                        ) : (
                          <div className="flex items-end justify-center mt-1"> - </div>
                        )}
                      </div>
                    </div>
                    <div className="h-32 mt-10">
                      <CardLineChart lineChartOption={chart} className="!h-32" />
                    </div>
                    <div>
                      <CardRepoList limit={7} repoList={repoList} />
                    </div>

                    <div className="mt-6">
                      <PullRequestTable limit={15} contributor={githubName} topic={"*"} repositories={undefined} />
                    </div>
                    <div className="mt-8 text-sm text-light-slate-9">
                      <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContributorProfilePage;
