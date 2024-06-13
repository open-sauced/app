import Image from "next/image";
import { IconContext } from "react-icons";
import { VscComment } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";

import Skeleton from "react-loading-skeleton";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import Text from "components/atoms/Typography/text";

import useContributorIssueComments from "lib/hooks/api/useContributorIssueComments";

interface IssueCommentsTableProps {
  contributor: string;
  repos?: string[];
  limit?: number;
  range?: number;
}

const EmptyState = ({ range }: { range: number }) => {
  return (
    <>
      <div className="flex flex-col justify-center mt-8 pt-8">
        <div className="absolute sm:left-[20%] md:left-[52%]">
          <div>
            <Image src="/assets/images/magnifying-glass.png" alt="Magnifying Glass" width="400" height="400" />
          </div>
        </div>
        <div className="grid w-max max-w-sm mx-auto">
          <span className="text-center font-medium mb-2">No Issue Comments Found</span>
          <p className="text-sm text-slate-600 text-center">
            This contributor doesn&apos;t seem to have any Issue Comments in the past{" "}
            <span className="font-bold">{range} days</span>. Try changing the date range.
          </p>
        </div>
      </div>
    </>
  );
};

const IssueCommentsTable = ({ contributor, repos, limit, range = 30 }: IssueCommentsTableProps) => {
  const { data: issueComments, isLoading: issueCommentsLoading } = useContributorIssueComments({
    contributor,
    repos,
    limit,
    range,
  });

  return (
    <>
      {issueCommentsLoading ? (
        <Skeleton height={24} count={3} className="mt-4 mb-2" />
      ) : !issueCommentsLoading && issueComments.length === 0 ? (
        <div className="grip gap-4">
          <EmptyState range={range} />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center bg-light-slate-3 rounded-md px-2 py-1 ">
            <div className="w-full">
              <Text className=" ">Latest Issue Comments</Text>
            </div>
            <IconContext.Provider value={{ color: "gray", style: { width: 14, height: 14 } }}>
              <div className={`justify-end`}>
                <Tooltip content="Last Commit Date">
                  <FaRegCalendar />
                </Tooltip>
              </div>
            </IconContext.Provider>
          </div>
          <div className="flex flex-col gap-0.5">
            {issueComments.map((issueComment) => {
              return (
                <div className="flex gap-2 items-center px-2 py-1" key={issueComment.event_id}>
                  <div className={`flex gap-2`}>
                    <VscComment />
                    <div title={issueComment.actor_login} className="!text-light-slate-12 !truncate w-1/2">
                      <a href={`${issueComment.comment_html_url}`} target="_blank">
                        {issueComment.comment_body}
                      </a>
                    </div>
                    <div className={`text-sm text-light-slate-11`}>
                      {calcDistanceFromToday(new Date(issueComment.event_time))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default IssueCommentsTable;
