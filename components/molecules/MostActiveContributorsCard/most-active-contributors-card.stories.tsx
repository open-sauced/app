import { Meta } from "@storybook/react";
import { useEffect, useState } from "react";
import Button from "components/atoms/Button/button";
import MostActiveContributorsCard, {
  ContributorStat,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
import { ContributorType } from "components/Graphs/shared/contributor-type-filter";

const meta = {
  title: "Design System/Molecules/Most Active Contributors Card",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="grid p-4 bg-slate-50 w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

export const Default = () => {
  const [data, setData] = useState<any>(generateData());

  return (
    <div>
      <Button variant="outline" onClick={() => setData(generateData())} className="mb-2">
        Random Data
      </Button>
      <MostActiveContributorsCard
        data={data}
        topContributor={data[0]}
        setContributorType={(type: ContributorType) => {}}
        contributorType="all"
        isLoading={false}
        totalContributions={data.reduce((acc: number, curr: any) => acc + curr.total_contributions, 0)}
      />
    </div>
  );
};

export const Loading = () => {
  const data = generateData();

  return (
    <MostActiveContributorsCard
      data={[]}
      topContributor={data[0]}
      setContributorType={(type: ContributorType) => {}}
      contributorType="all"
      isLoading={true}
      totalContributions={data.reduce((acc: number, curr: any) => acc + curr.total_contributions, 0)}
    />
  );
};

export const LoadingToData = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialData = generateData();
  const topContributor = initialData[0];

  useEffect(() => {
    const timerId = setTimeout(() => {
      setData(initialData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MostActiveContributorsCard
      data={data}
      topContributor={topContributor}
      setContributorType={(type: ContributorType) => {}}
      contributorType="all"
      isLoading={isLoading}
      totalContributions={Math.random() * 500}
    />
  );
};

export const NoData = () => {
  return (
    <MostActiveContributorsCard
      data={[]}
      topContributor={{ total_contributions: 0 } as ContributorStat}
      setContributorType={(type: ContributorType) => {}}
      contributorType="all"
      isLoading={false}
      totalContributions={Math.random() * 500}
    />
  );
};

function generateData() {
  return [
    "CBID2",
    "OgDev-01",
    "brandonroberts",
    "deepakrudrapaul",
    "bdougie",
    "diivi",
    "babblebey",
    "BekahHW",
    "dominicduffin1",
    "adiati98",
    "Anush008",
    "a0m0rajab",
    "NsdHSO",
    "RitaDee",
    "doaortu",
    "danielglejzner",
    "jpmcb",
    "goetzrobin",
    "nickytonline",
    "hankadev",
    "k1nho",
    "KashishLakhara04",
    "fmerian",
    "davidgetahead",
    "MartiinWalsh",
    "Muyixone",
    "zillBoy",
    "Edlavio",
    "kelvinyelyen",
    "JacobMGEvans",
    "0-vortex",
    "takanome-dev",
    "kevinctofel",
    "Brian-Pob",
    "jmslynn",
    "Satyxm",
    "sudojunior",
    "ozgursar",
    "droffilc1",
    "UlisesGascon",
    "MohitBansal321",
    "shelleymcq",
    "WebDevCode",
    "bpirrocco",
    "Ntshangase",
    "mihrab34",
    "code-briomar",
    "Deadreyo",
    "MaurerKrisztian",
    "stephengade",
  ].map((login) => {
    const user = {
      login,
      commits: Math.floor(Math.random() * 500),
      prs_created: Math.floor(Math.random() * 500),
      prs_reviewed: Math.floor(Math.random() * 500),
      issues_created: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 500),
      total_contributions: Math.random() * 500,
    };

    return user;
  });
}
