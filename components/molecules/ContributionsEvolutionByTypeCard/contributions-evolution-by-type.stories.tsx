import { Meta } from "@storybook/react";
import { useState } from "react";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { subDays } from "date-fns";
import Button from "components/atoms/Button/button";
import ContributionsEvolutionByType from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";

const meta = {
  title: "Design System/Molecules/Contributions Evolution By Type Card",
  parameters: {
    layout: "fullscreen",
  },
  component: ContributionsEvolutionByType,
  decorators: [
    (Story) => (
      <div className="grid p-4 bg-slate-50 w-full h-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContributionsEvolutionByType>;

export default meta;

export const Default = () => {
  const [data, setData] = useState(generateData());

  return (
    <div>
      <Button variant="outline" onClick={() => setData(generateData())} className="mb-2">
        Random Data
      </Button>
      <ContributionsEvolutionByType data={data} isLoading={false} />
    </div>
  );
};

function generateData() {
  // Use date-fns to get an array of the last 6 weeks
  const today = new Date();
  const sixWeeksAgo = subDays(today, 7 * 6);
  const result = eachDayOfInterval({
    start: sixWeeksAgo,
    end: today,
  });

  // return result.map((date) => ({
  //   startTime: date.toString(),
  //   active: Math.floor(Math.random() * 500),
  //   new: Math.floor(Math.random() * 500),
  //   churned: Math.floor(Math.random() * 500),
  // }));

  // generate data for each day but make it so that the next value is a random value that is close to the previous value
  let previousActive = Math.floor(Math.random() * 500);
  let previousNew = Math.floor(Math.random() * 500);
  let previousChurned = Math.floor(Math.random() * 500);

  return result.map((date) => {
    const newActive = randomValueCloseToValue(previousActive);
    const newNew = randomValueCloseToValue(previousNew);
    const newChurned = randomValueCloseToValue(previousChurned);

    previousActive = newActive;
    previousNew = newNew;
    previousChurned = newChurned;

    return {
      bucket: date.toString(),
      active: newActive,
      new: newNew,
      alumni: newChurned,
      all: newActive + newNew + newChurned,
    };
  });
}

function randomValueCloseToValue(value: number) {
  return Math.max(value + Math.floor(Math.random() * 100 - 50), 0);
}

export const Loading = () => {
  return <ContributionsEvolutionByType isLoading={true} />;
};
