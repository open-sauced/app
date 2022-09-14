import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Sparkline from "../../components/atoms/Sparkline/sparkline";

const storyConfig = {
  Sparkline: "Design System/Atoms/Sparkline",
  component: "Sparkline"
};

export default storyConfig;

//Sparkline Template
const SparklineTemplate: ComponentStory<typeof Sparkline> = (args) => (
  <div style={{width: 120, height: 40}}>
    <Sparkline {...args} />
  </div>
);

export const Default = SparklineTemplate.bind({});

Default.args = {
  data: [
    {
      "id": "japan",
      "color": "hsl(63, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 287
        },
        {
          "x": "helicopter",
          "y": 183
        },
        {
          "x": "boat",
          "y": 112
        },
        {
          "x": "train",
          "y": 78
        },
        {
          "x": "subway",
          "y": 47
        },
        {
          "x": "bus",
          "y": 218
        },
        {
          "x": "car",
          "y": 106
        },
        {
          "x": "moto",
          "y": 190
        },
        {
          "x": "bicycle",
          "y": 88
        },
        {
          "x": "horse",
          "y": 8
        },
        {
          "x": "skateboard",
          "y": 248
        },
        {
          "x": "others",
          "y": 76
        },
        {
          "x": "adwawd",
          "y": 76
        },
        {
          "x": "awdawdd",
          "y": 38
        },
        {
          "x": "awd",
          "y": 42
        },
        {
          "x": "adwadadw",
          "y": 26
        },
        {
          "x": "dadawda",
          "y": 76
        }
      ]
    }
  ]
};