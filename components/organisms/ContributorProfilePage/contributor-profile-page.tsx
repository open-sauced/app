import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import ContributorProfileHeader from "components/molecules/ContributorProfileHeader/contributor-profile-header";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import color from "lib/utils/color.json";
import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";
import { getRelativeDays } from "lib/utils/date-utils";
import Pill from "components/atoms/Pill/pill";
import getPercent from "lib/utils/get-percent";
import ContributorProfileInfo from "components/molecules/ContributorProfileInfo/contributor-profile-info";
import ProfileLanguageChart from "components/molecules/ProfileLanguageChart/profile-language-chart";
import useFollowUser from "lib/hooks/useFollowUser";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import ContributorProfileTab from "../ContributorProfileTab/contributor-profile-tab";
import { ContributorObject } from "../ContributorCard/contributor-card";

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
  langList: { languageName: string; percentageUsed: number }[];
  recentContributionCount: number;
  prFirstOpenedDate?: string;
  user?: DbUser;
  prTotal: number;
  openPrs: number;
  prReviews?: number;
  prVelocity?: number;
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
  openPrs,
  prTotal,
  loading,
  prMerged,
  prVelocity,
  prFirstOpenedDate,
}: ContributorProfilePageProps) => {
  const languageList = (langList || []).map((language) => {
    const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.languageName.toLowerCase());

    return {
      languageName: preparedLanguageKey ? preparedLanguageKey : language.languageName,
      percentageUsed: language.percentageUsed,
    };
  });

  const { user: loggedInUser, signIn } = useSupabaseAuth();
  const { chart, repoList } = useContributorPullRequestsChart(githubName, "*", repositories);

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
    display_local_time: displayLocalTime,
  } = user || {};

  const iscConnected = !!user?.is_open_sauced_member;

  return (
    <div className="w-full ">
      {loading ? (
        <SkeletonWrapper height={200} />
      ) : (
        <ContributorProfileHeader
          isPremium={user ? user.role >= 50 : false}
          handleSignIn={signIn}
          username={user?.login}
          isRecievingCollaborations={user?.receive_collaboration}
          user={loggedInUser}
          isFollowing={followError ? false : true}
          isConnected={iscConnected}
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
                twitterUsername={twitter_username}
                bio={bio}
                githubName={githubName}
                isConnected={iscConnected}
                timezone={timezone}
                displayLocalTime={displayLocalTime}
                githubSponsorsUrl={githubSponsorsUrl}
                linkedInUrl={linkedInUrl}
                prFirstOpenedDate={prFirstOpenedDate}
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
                        {openPrs >= 0 ? (
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
                        {recentContributionCount >= 0 ? (
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
                      <CardRepoList limit={7} repoList={repoList} total={repoList.length} />
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
