import { ComponentStory } from "@storybook/react";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";

const storyConfig = {
  title: "Design System/Atoms/ScrollArea",
  component: "ScrollArea"
};

export default storyConfig;
const ScrollTemplate: ComponentStory<typeof ScrollArea> = (args) => (
  <ScrollArea 
    className="rounded-md border p-4"
    {...args}
  >
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then, one day, the people of the kingdom discovered that the jokes left by
    Jokester were so funny that they couldn't help but laugh. And once they
    started laughing, they couldn't stop.
  </ScrollArea>
)

export const Default = ScrollTemplate.bind({});

Default.argTypes = {
  type: {
    options: ["auto", "always", "scroll", "hover"],
    control: { type: "select" },
  }
}
Default.args = {
  type: "auto",
  style: {
    height: "200px",
    width: "350px"
  }
}

const SelectOptions = Array.from({ length: 50 }).map((value, index, array) => `v1.2.0-beta.${array.length - index}`);



const ScrollInSelectTemplate: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <SelectTrigger>
      <SelectValue placeholder="Select a Version" />
    </SelectTrigger>
    <SelectContent>
      {SelectOptions.map((option, i) => (
        <SelectItem value={option} key={i}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const WithSelect = ScrollInSelectTemplate.bind({});