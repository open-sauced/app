import { Meta } from "@storybook/react";
import { useState } from "react";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { subDays } from "date-fns";
import Button from "components/shared/Button/button";
import ContributionsEvolutionCard from "components/molecules/ContributionsEvolution/contributions-evolution-card";

const meta = {
  title: "Design System/Molecules/Contributions Evolution Card",
  parameters: {
    layout: "fullscreen",
  },
  component: ContributionsEvolutionCard,
  decorators: [
    (Story) => (
      <div className="grid p-4 bg-slate-50 w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContributionsEvolutionCard>;

export default meta;

export const Default = () => {
  const [data, setData] = useState(generateData());

  return (
    <div>
      <Button variant="outline" onClick={() => setData(generateData())} className="mb-2">
        Random Data
      </Button>
      <ContributionsEvolutionCard data={data} />
    </div>
  );
};

function generateData() {
  // Use date-fns to get an array of the last 7 days
  const today = new Date();
  const weekAgo = subDays(today, 6);
  const result = eachDayOfInterval({
    start: weekAgo,
    end: today,
  });

  return result.map((date) => ({
    startTime: date.toString(),
    commits: Math.floor(Math.random() * 500),
    prsCreated: Math.floor(Math.random() * 500),
    prsReviewed: Math.floor(Math.random() * 500),
    issuesCreated: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 500),
  }));
}
