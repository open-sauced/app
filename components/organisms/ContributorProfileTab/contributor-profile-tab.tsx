import Avatar from "components/atoms/Avatar/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import Text from "components/atoms/Typography/text";
import { getRelativeDays } from "lib/utils/date-utils";
import Pill from "components/atoms/Pill/pill";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";
import { getAvatarByUsername } from "lib/utils/github";
import Image, { StaticImageData } from "next/image";

interface ContributorProfileTabProps {
  user?: DbUser;
  prTotal: number;
  openPrs: number;
  prVelocity: number;
  prMerged: number;
  recentContributionCount: number;
  prsMergedPercentage: number;
  chart: Object;
  githubName: string;
  repoList: RepoList[];
}

const ContributorProfileTab = ({
  user,
  openPrs,
  prMerged,
  prTotal,
  prVelocity,
  prsMergedPercentage,
  chart,
  githubName,
  recentContributionCount,
  repoList
}: ContributorProfileTabProps): JSX.Element => {
  return (
    <Tabs defaultValue="Highlights" className="">
      <TabsList className="w-full border-b  justify-start">
        <TabsTrigger
          className="data-[state=active]:border-sauced-orange data-[state=active]:border-b-2 text-2xl"
          value="Highlights"
        >
          Highlights
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:border-sauced-orange data-[state=active]:border-b-2 text-2xl"
          value="Contributions"
        >
          Contributions
        </TabsTrigger>
      </TabsList>

      {/* Highlights Tab details */}

      <TabsContent value="Highlights">
        <div className="pl-20 gap-x-3 pt-4 flex">
          <Avatar alt="user profile avatar" size="sm" avatarURL={`https://www.github.com/${githubName}.png?size=300`} />

          <HighlightInputForm />
        </div>
      </TabsContent>

      {/* Contributions Tab Details */}

      <TabsContent value="Contributions">
        <div className="mt-4">
          <div className="bg-white mt-4 rounded-2xl border p-4 md:p-6">
            <div className=" flex flex-col lg:flex-row gap-2 md:gap-12 lg:gap-16 justify-between">
              <div>
                <span className="text-xs text-light-slate-11">PRs opened</span>
                {openPrs ? (
                  <div className="flex lg:justify-center md:pr-8 mt-1">
                    <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">{openPrs} PRs</Text>
                  </div>
                ) : (
                  <div className="flex justify-center items-end mt-1"> - </div>
                )}
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
                {prVelocity ? (
                  <div className="flex gap-2 lg:justify-center items-center">
                    <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                      {getRelativeDays(prVelocity)}
                    </Text>

                    <Pill color="purple" text={`${prsMergedPercentage}%`} />
                  </div>
                ) : (
                  <div className="flex justify-center items-end mt-1"> - </div>
                )}
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Contributed Repos</span>
                {recentContributionCount ? (
                  <div className="flex lg:justify-center mt-1">
                    <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                      {`${recentContributionCount} Repo${recentContributionCount > 1 ? "s" : ""}`}
                    </Text>
                  </div>
                ) : (
                  <div className="flex justify-center items-end mt-1"> - </div>
                )}
              </div>
            </div>
            <div className="mt-10 h-32">
              <CardLineChart lineChartOption={chart} className="!h-32" />
            </div>
            <div>
              <CardRepoList limit={7} repoList={repoList} />
            </div>

            <div className="mt-6">
              <PullRequestTable limit={15} contributor={githubName} topic={"*"} repositories={undefined} />
            </div>
            <div className="mt-8 text-light-slate-9 text-sm">
              <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ContributorProfileTab;
