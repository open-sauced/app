import { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "components/molecules/Toaster/toaster";
import { CopyContainer } from "./CopyContainer";

type Story = StoryObj<typeof CopyContainer>;

const meta: Meta<typeof CopyContainer> = {
  title: "Components/Shared/CopyContainer",
  component: CopyContainer,
  args: {
    children: <p className="p-4 rounded-md bg-black text-white">Hello world</p>,
  },
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <div className="p-8 grid gap-2">
          <p>
            Hover over the text and notice the copy button at the top right. Press it to copy the markup as an image.
          </p>
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;

export const Default: Story = {};
