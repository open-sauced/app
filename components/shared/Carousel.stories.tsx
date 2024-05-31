import { Meta, StoryObj } from "@storybook/react";
import Card from "components/atoms/Card/card";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "./Carousel";

type Story = StoryObj<typeof Carousel>;

const meta: Meta<typeof Carousel> = {
  title: "Components/Shared/Carousel",
  component: Carousel,
  args: {
    className: "w-fit max-w-[32rem] my-0 mx-auto px-auto",
    children: (
      <>
        <CarouselNext />
        <CarouselPrevious />
        <CarouselContent>{items()}</CarouselContent>
      </>
    ),
  },
};

function items() {
  const SUGGESTIONS = [
    {
      title: "Get information on contributor activity",
      prompt: "What type of pull requests has @brandonroberts worked on?",
    },
    {
      title: "Identify key contributors",
      prompt: "Who are the most prevalent contributors to the TypeScript ecosystem?",
    },
    {
      title: "Find contributors based on their work",
      prompt: "Show me the lottery factor for contributors in the remix-run/react-router project?",
    },
    {
      title: "Find experts",
      prompt: "Who are the best developers that know Tailwind and are interested in Rust?",
    },
  ];

  return SUGGESTIONS.map((suggestion, i) => (
    <CarouselItem key={i} className="items-stretch">
      <button className="h-full mx-auto">
        <Card className="w-[30rem] shadow-md border-none mx-auto h-full text-start !p-6 text-slate-600">
          <h3 className="text-sm lg:text-base font-semibold">{suggestion.title}</h3>
          <p className="text-xs lg:text-sm">{suggestion.prompt}</p>
        </Card>
      </button>
    </CarouselItem>
  ));
}

export default meta;
export const Default: Story = {};
