import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import React from "react";
import {classNames} from "components/organisms/RepositoriesTable/repositories-table";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import Pill from "components/atoms/Pill/pill";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import Avatar from "components/atoms/Avatar/avatar";
import Sparkline from "components/atoms/Sparkline/sparkline";

interface RepoRowProps {
  repo: RepositoriesRows;
}

const RepoRow = ({repo}:RepoRowProps): JSX.Element =>{
  const {name, handle, activity, prOverview, prVelocity, spam, contributors, last30days} = repo;

  return   ( <div className={`${classNames.row}`}>

    {/* Column: Repository Name */}
    <div className={classNames.cols.repository}>
      <TableRepositoryName avatarURL={""} name={name} handle={handle}></TableRepositoryName>

    </div>

    {/* Column: Activity */}
    <div className={classNames.cols.activity}>
      { activity &&
        <Pill text={activity} />
      }

    </div>

    {/* Column: PR Overview */}
    <div className={classNames.cols.prOverview}>
      <PullRequestOverview open={prOverview?.open} merged={prOverview?.merged} closed={prOverview?.closed} draft={prOverview?.draft} churn={prOverview?.churn} churnDirection={`${prOverview?.churnDirection}`}></PullRequestOverview>

    </div>

    {/* Column: PR Velocity */}
    <div className={`${classNames.cols.prVelocity}`}>
      <div>{prVelocity?.amount}</div>
      <Pill text={`${prVelocity?.churn}`} size="small" color="green" />
    </div>

    {/* Column: SPAM */}
    <div className={`${classNames.cols.prVelocity}`}>
      <div>{spam?.amount}</div>
      <Pill text={`${spam?.churn}`} size="small" color="green" />
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
