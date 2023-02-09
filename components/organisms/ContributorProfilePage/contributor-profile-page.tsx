import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
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
  error,
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

  const { chart } = useTopicContributorCommits(githubName, "*", repositories);
  const prsMergedPercentage = getPercent(prTotal, prMerged || 0);
  const isLoaded = !loading && !error;

  // eslint-disable-next-line camelcase
  const {
    bio,
    location,
    interests,
    name,
    // eslint-disable-next-line camelcase
    twitter_username,
    timezone,
    display_local_time: displayLocalTime
  } = user || {};

  return (
    <div className=" w-full">
      {loading ? (
        <SkeletonWrapper height={200} />
      ) : (
        <ContributorProfileHeader isConnected={!!user} githubName={githubName} avatarUrl={githubAvatar} />
      )}
      <div className="pt-24 px-4 md:px-10 lg:px-16 flex flex-col lg:flex-row lg:gap-40 w-full overflow-hidden justify-between">
        <div className="flex flex-col w-80 gap-4 ">
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
              />

              <div>
                <p className="mb-4">Languages</p>
                <CardHorizontalBarChart withDescription={true} languageList={languageList} />
              </div>
            </>
          )}
        </div>
        <div className="flex-1">
          {loading ? (
            <SkeletonWrapper height={500} radius={12} />
          ) : (
            <>
              <ContributorProfileTab
                repoList={repoList}
                recentContributionCount={recentContributionCount}
                prVelocity={prVelocity}
                chart={chart}
                openPrs={openPrs}
                githubName={githubName}
                prMerged={prMerged}
                user={user}
                prTotal={prTotal}
                prsMergedPercentage={prsMergedPercentage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContributorProfilePage;
