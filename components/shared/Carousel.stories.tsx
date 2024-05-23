import { Meta, StoryObj } from "@storybook/react";
import Card from "components/atoms/Card/card";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "./Carousel";

type Story = StoryObj<typeof Carousel>;

const meta: Meta<typeof Carousel> = {
  title: "Components/Shared/Carousel",
  component: Carousel,
  args: {
    className: "w-fit mx-auto",
    children: (
      <>
        <CarouselNext />,
        <CarouselPrevious />,
        <CarouselContent>
          <CarouselItem key="1">
            <Card className="mx-auto w-fit">One</Card>
          </CarouselItem>
          <CarouselItem key="2">
            <Card className="mx-auto w-fit">Two</Card>
          </CarouselItem>
          <CarouselItem key="3">
            <Card className="mx-auto w-fit">Three</Card>
          </CarouselItem>
        </CarouselContent>
      </>
    ),
  },
};

export default meta;
export const Default: Story = {};
