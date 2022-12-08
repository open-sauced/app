import { BsFillArrowUpCircleFill } from "react-icons/bs";

import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart, {
  LanguageObject
} from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import ContributorProfileHeader from "components/molecules/ContributorProfileHeader/contributor-profile-header";
import { ContributorObject } from "../ContributorCard/contributor-card";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import LatestPrTableRow from "components/molecules/LatestPrTableRow/latest-pr-table-row";
import LatestPrTableHeader from "components/molecules/LatestPrTableHeader/latest-pr-table-header";

import TestRepoAvatar from "public/icons/test-repo-avatar.svg";

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
}
const ContributorProfilePage = ({ contributor, topic, repositories, listOfPRs }: ContributorProfilePageProps) => {
  const languageList: LanguageObject[] = [
    { languageName: "html", percentageUsed: 40 },
    { languageName: "php", percentageUsed: 30 },
    { languageName: "javascript", percentageUsed: 10 },
    { languageName: "python", percentageUsed: 10 },
    { languageName: "css", percentageUsed: 10 }
  ];
  const chart = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: true,
      data: ["Jan 1, 2022", "Jan 15, 2022", "Feb 1, 2022"]
    },
    yAxis: {
      type: "value",
      splitNumber: 1,
      axisLabel: false,
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    grid: {
      height: 100,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#ff9800"
        },
        areaStyle: {
          color: "#FFB74D",
          opacity: 0.6
        }
      }
    ]
  };

  const repoList = [
    {
      repoName: "Nextjs",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "opensauced/hot",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "React/react-native",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test4",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test5",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test6",
      repoIcon: TestRepoAvatar
    }
  ];

  return (
    <div>
      <ContributorProfileHeader avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" />
      <div className="pt-24 px-3 md:px-10 lg:px-16 flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col w-64 gap-4">
          <div className="pb-6 border-b">
            <Title className="!text-2xl !text-light-slate-12" level={3}>
              Nate Moore{" "}
            </Title>
            <span className="text-light-slate-11 text-sm">@natemoo-re</span>
          </div>
          <div>
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

            <LatestPrTableHeader />
            <div>
              {listOfPRs.map((prs, index) => (
                <LatestPrTableRow key={`${(prs.noOfFilesChanged * index) / 55}`} {...prs} />
              ))}
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
