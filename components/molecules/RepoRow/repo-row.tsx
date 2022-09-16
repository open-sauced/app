import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import React from "react";
import {classNames} from "components/organisms/RepositoriesTable/repositories-table";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import Pill from "components/atoms/Pill/pill";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import Avatar from "components/atoms/Avatar/avatar";
import Sparkline from "components/atoms/Sparkline/sparkline";
import { truncateString } from "lib/utils/truncate-string";

interface RepoRowProps {
  repo: RepositoriesRows;
}

const RepoRow = ({repo}:RepoRowProps): JSX.Element =>{
  const {name, handle, owner_avatar: ownerAvatar, activity = "high", openPrsCount, closedPrsCount, draftPrsCount,mergedPrsCount, spamPrsCount,churn,churnTotalCount, churnDirection} = repo;

  const contributors =  [
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
  ];
  const last30days = [
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
  ];
  return   ( <div className={`${classNames.row}`}>

    {/* Column: Repository Name */}
    <div className={classNames.cols.repository}>
      <TableRepositoryName avatarURL={ownerAvatar} name={name} handle={handle}></TableRepositoryName>

    </div>

    {/* Column: Activity */}
    <div className={classNames.cols.activity}>
      { activity &&
        <Pill text={activity} />
      }

    </div>

    {/* Column: PR Overview */}
    <div className={classNames.cols.prOverview}>
      <PullRequestOverview open={openPrsCount} merged={mergedPrsCount} closed={closedPrsCount} draft={draftPrsCount} churn={churnTotalCount} churnDirection={`${churnDirection}`}></PullRequestOverview>

    </div>

    {/* Column: PR Velocity */}
    <div className={`${classNames.cols.prVelocity}`}>
      <div>3 PRs</div>
      <Pill text="10%" size="small" color="green" />
    </div>

    {/* Column: SPAM */}
    <div className={`${classNames.cols.prVelocity}`}>
      <div>{spamPrsCount + " PRs"}</div>
      <Pill text={`${churn}`} size="small" color="green" />
    </div>

    {/* Column: Contributors */}
    <div className={`flex ${classNames.cols.contributors}`}>

      {contributors?.map(({ avatarURL, initials, alt}) =>
        <Avatar key={`${initials}-${alt}`} avatarURL={avatarURL} initials={initials} size={32} hasBorder isCircle />
      )}
    </div>

    {/* Column: Last 30 Days */}
    <div className={classNames.cols.last30days}>
      { last30days &&
        <Sparkline data={last30days} />
      }
    </div>
  </div>)
  ;
};
export default RepoRow;
