import { Meta, StoryObj } from "@storybook/react";
import Button from "components/shared/Button/button";
import { Drawer } from "./Drawer";

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: "Components/Shared/Drawer",
  component: Drawer,
  args: {
    trigger: <Button variant="primary">Open</Button>,
    title: "Welcome to the drawer",
    description: "The drawer is a wonderful place to store things",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec mauris at risus volutpat consequat ut a
        neque. Quisque laoreet ut urna sed semper. Integer pharetra augue magna, quis maximus augue mollis dignissim.
        Vivamus vestibulum lectus vitae purus aliquet, eget consequat lorem posuere. Nullam quis massa a enim efficitur
        facilisis. Etiam aliquam felis eu ligula accumsan suscipit. Integer nulla ligula, gravida vel sagittis ut,
        blandit sed eros.
      </p>
    ),
  },
};

export default meta;

export const Default: Story = {};
export const NoCloseButton: Story = {
  args: {
    showCloseButton: false,
  },
};
