import { BsFillArrowUpCircleFill } from "react-icons/bs";

import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart, {
  LanguageObject
} from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import color from "lib/utils/color.json";
import ContributorProfileHeader from "components/molecules/ContributorProfileHeader/contributor-profile-header";
import { ContributorObject } from "../ContributorCard/contributor-card";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import LatestPrTableRow from "components/molecules/LatestPrTableRow/latest-pr-table-row";
import LatestPrTableHeader from "components/molecules/LatestPrTableHeader/latest-pr-table-header";

import TestRepoAvatar from "public/icons/test-repo-avatar.svg";
import ContributorTable from "components/molecules/ContributorTable/contributor-table";
import { useTopicContributorCommits } from "lib/hooks/useTopicContributorCommits";

const colorKeys = Object.keys(color);
interface PrObjectType {
  prName: string;
  prStatus: string;
  prIssuedTime: string;
  prMergedTime: string;
  noOfFilesChanged: number;
  noOfLinesChanged: number;
}

interface ContributorProfilePageProps {
  contributor?: ContributorObject;
  topic?: string;
  repositories?: number[];
  listOfPRs: PrObjectType[];
  githubAvatar?: string;
  githubName: string;
  langList: string[];
  repoList: RepoList[];
}
const ContributorProfilePage = ({
  contributor,
  topic,
  repositories,
  listOfPRs,
  githubAvatar,
  githubName,
  langList,
  repoList
}: ContributorProfilePageProps) => {
  const languageList = langList?.map((language) => {
    const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.toLowerCase());

    return {
      languageName: preparedLanguageKey ? preparedLanguageKey : language,
      percentageUsed: Math.round((1 / langList.length) * 100)
    };
  });

  const { chart } = useTopicContributorCommits(githubName, "javascript", repositories);

  return (
    <div>
      <ContributorProfileHeader avatarUrl={githubAvatar} />
      <div className="pt-24 md:px-10 lg:px-16 flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col w-64 gap-4">
          <div className="pb-6 border-b">
            <Title className="!text-2xl !text-light-slate-12" level={3}>
              {githubName}
            </Title>
            <span className="text-light-slate-11 text-sm">@natemoo-re</span>
          </div>
          <div>
            <p className="mb-4 ">Language</p>
            <CardHorizontalBarChart languageList={languageList} />
          </div>
        </div>
        <div>
          <div>
            <Title className="!text-light-slate-12 !text-xl" level={4}>
              Contribution Insights
            </Title>
          </div>
          <div className="bg-white mt-4 rounded-2xl border p-2 md:p-6">
            <div className="flex flex-col lg:flex-row gap-2 md:gap-12 lg:gap-16 justify-between">
              <div>
                <span className="text-xs text-light-slate-11">PRs opened</span>
                <div className="flex justify-between gap-2 items-end pr-8 mt-1">
                  <Text className="!text-xl !text-black !leading-none">5 PRs</Text>
                  <p className="flex text-red-700 items-end">
                    <span className="mb-0 leading-none">16%</span>
                    <BsFillArrowUpCircleFill className="ml-1" fill="red" color="red" />
                  </p>
                </div>
              </div>
              <div>
                <span className="text-xs text-light-slate-11">PRs Reviewed</span>
                <div className="flex text-green-9 gap-2 justify-between items-end pr-8 mt-1">
                  <Text className="!text-xl !text-black !leading-none">25 PRs</Text>
                  <p className="flex text-green-700 items-end">
                    <span className="mb-0 leading-none">35</span>
                    <BsFillArrowUpCircleFill className="ml-1" fill="green" color="green" />
                  </p>
                </div>
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
                <div className="flex justify-between gap-2 items-end pr-8 mt-1">
                  <Text className="!text-lg !text-black !leading-none">2 mo</Text>
                  <p className="flex text-red-700 items-end">
                    <span className="mb-0 text-sm leading-none">10%</span>
                    <BsFillArrowUpCircleFill className="ml-1" fill="red" color="red" />
                  </p>
                </div>
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Contributed to</span>
                <div className="flex  justify-between gap-2 items-end pr-8 mt-1">
                  <Text className="!text-xl !text-black !leading-none">10 Repos</Text>
                  <p className="flex text-green-700 items-end">
                    <span className="mb-0 leading-none">5%</span>
                    <BsFillArrowUpCircleFill className="ml-1" fill="green" color="green" />
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 h-32">
              <CardLineChart lineChartOption={chart} />
            </div>
            <div>
              <CardRepoList limit={7} repoList={repoList} />
            </div>

            <div className="mt-6">
              <ContributorTable limit={15} contributor={githubName} topic={"javascript"} repositories={undefined} />
            </div>
            <div className="mt-8 text-light-slate-9 text-sm">
              <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorProfilePage;
