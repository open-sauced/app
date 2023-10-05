import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "components/atoms/Button/button";
import MostActiveContributorsCard from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";

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

type Story = StoryObj;

export const Default = () => {
  const [data, setData] = useState<any>(generateData());

  return (
    <div>
      <Button variant="outline" onClick={() => setData(generateData())} className="mb-2">
        Random Data
      </Button>
      <MostActiveContributorsCard data={data} />
    </div>
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
      contributions: {
        commits: Math.floor(Math.random() * 500),
        prsCreated: Math.floor(Math.random() * 500),
        prsReviewed: Math.floor(Math.random() * 500),
        issuesCreated: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 500),
      },
    };

    return {
      ...user,
      total_contributions: Object.values(user.contributions).reduce((acc, curr) => acc + curr, 0),
    };
  });
}
