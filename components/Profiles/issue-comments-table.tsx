import { IconContext } from "react-icons";
import { VscComment } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";

import Tooltip from "components/atoms/Tooltip/tooltip";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import Text from "components/atoms/Typography/text";

import useContributorIssueComments from "lib/hooks/api/useContributorIssueComments";

interface IssueCommentsTableProps {
  contributor: string;
  repos?: string[];
  limit?: number;
  isHoverCard?: boolean;
  range?: number;
}

const IssueCommentsTable = ({ contributor, repos, limit, isHoverCard, range }: IssueCommentsTableProps) => {
  const { data: issueComments, isLoading: issueCommentsLoading } = useContributorIssueComments({
    contributor,
    repos,
    limit,
    range,
  });

  return (
    <>
      <div className="flex gap-2 space-between bg-light-slate-3 rounded-md px-2 py-2">
        <div className="w-full">
          <Text className=" ">Latest Issue Comments</Text>
        </div>
        <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
          <div className={`${isHoverCard && "ml-auto"} justify-end`}>
            <Tooltip content="Last Commit Date">
              <FaRegCalendar />
            </Tooltip>
          </div>
        </IconContext.Provider>
      </div>
      <div className="flex flex-col gap-0.5">
        {issueCommentsLoading ? (
          <>Loading ...</>
        ) : (
          issueComments.map((issueComment) => {
            return (
              <div className="flex gap-2 space-between px-2 py-1" key={issueComment.event_id}>
                <div className={`flex item-center gap-2 w-full ${isHoverCard && "w-5/6"}`}>
                  <VscComment />
                  <Text title="updated date">{calcDistanceFromToday(new Date(issueComment.event_time))}</Text>
                  <Text title={issueComment.actor_login} className="!text-light-slate-12 !w-32 md:!w-full !truncate">
                    <a href={`${issueComment.comment_html_url}`} target="_blank">
                      {issueComment.comment_body}
                    </a>
                  </Text>
                </div>
                <div className={`${isHoverCard && "ml-auto"} justify-end text-sm text-light-slate-11`}>
                  {calcDistanceFromToday(new Date(issueComment.event_time))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default IssueCommentsTable;
