import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RepositoriesTable from "../../components/organisms/RepositoriesTable/repositories-table";

const storyConfig = {
  title: "Design System/Molecules/Repositories Table",
  component: "RepositoriesTable"
};

export default storyConfig;

// SelectableTable Template
const RepositoriesTableTemplate: ComponentStory<typeof RepositoriesTable> = (args) => <RepositoriesTable {...args} />;

// SelectableTable Default
export const Default = RepositoriesTableTemplate.bind({});

const previewMeta = {
  hasNextPage: true,
  hasPreviousPage: false,
  page: 3,
  pageCount: 9000,
  limit: 15,
  itemCount: 2300022
};
const previewRepositories = [
  {
    id: "1",
    name: "Insights",
    handle: "opensauced",
    activity: "High",
    prOverview: {
      open: 10,
      merged: 2,
      closed: 3,
      draft: 8,
      churn: 40,
      churnDirection: "up"
    },
    prVelocity: {
      amount: "2 mo",
      churn: "30%",
      churnDirection: "up"
    },
    spam: {
      amount: "3 PRs",
      churn: "10%",
      churnDirection: "up"
    },
    contributors: [
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      },
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      },
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      }
    ],
    last30days: [
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
  },
  {
    id: "2",
    name: "cli",
    handle: "npm",
    activity: "High",
    prOverview: {
      open: 2,
      merged: 0,
      closed: 0,
      draft: 1,
      churn: 100,
      churnDirection: "down"
    },
    prVelocity: {
      amount: "2 mo",
      churn: "30%",
      churnDirection: "up"
    },
    spam: {
      amount: "3 PRs",
      churn: "10%",
      churnDirection: "up"
    },
    contributors: [
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      },
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      },
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      }
    ],
    last30days: [
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
  },
  {
    id: "3",
    name: "flowy",
    handle: "alyssaxuu",
    activity: "High",
    prOverview: {
      open: 80,
      merged: 15,
      closed: 4,
      draft: 0,
      churn: 20,
      churnDirection: "up"
    },
    prVelocity: {
      amount: "2 mo",
      churn: "30%",
      churnDirection: "up"
    },
    spam: {
      amount: "3 PRs",
      churn: "10%",
      churnDirection: "up"
    },
    contributors: [
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      },
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      },
      {
        avatarURL: "",
        initials: "ES",
        alt: "E"
      }
    ],
    last30days: [
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
  }
];

Default.args = {
  listOfRepositories: previewRepositories,
  meta: previewMeta
};
