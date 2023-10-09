import React from "react";
import { isToday, isYesterday, formatDistanceToNowStrict } from "date-fns";
import ConnectionCard from "components/molecules/ConnectionCard/connection-card";
import { useUserConnections } from "lib/hooks/useUserConnections";
import DashContainer from "components/atoms/DashedContainer/DashContainer";

function formatPostDate(date: Date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
}

const ConnectionRequestsWrapper = () => {
  const { data, updateConnectionStatus, deleteConnectionRequest } = useUserConnections();
  let currentDate: string;

  const getDateGroupHeader = (date: Date, index: number) => {
    const dateString = date.toLocaleDateString();
    if (dateString !== currentDate) {
      currentDate = dateString;

      return (
        <p className={`mt-4 text-light-slate-10 md:pt-4 md:mt-8 ${index !== 0 && " border-t"}`}>
          {formatPostDate(new Date(date))}
        </p>
      );
    }
    return;
  };

  return (
    <div>
      {data && data.length > 0 ? (
        data
          .slice()
          .filter((request) => request.status === "pending")
          .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
          .map((requests, i) => {
            return (
              <div className="flex flex-col w-full " key={i}>
                <div className="w-full mt-1 text-center md:text-left">
                  {getDateGroupHeader(new Date(requests.created_at), i)}
                </div>
                <ConnectionCard
                  onDecline={deleteConnectionRequest}
                  onAccept={updateConnectionStatus}
                  requestId={requests.id}
                  className="self-end w-full mt-1 md:w-5/6 md:mt-1"
                  outreachMessage={requests.message}
                  requestor={requests.request_user}
                />
              </div>
            );
          })
      ) : (
        <DashContainer className="flex-col gap-6 md:gap-8 text-light-slate-9">
          <p>No pending requests.</p>
          <p className="text-center md:px-16">
            Sometimes you got to be a friend to make a friend. Considering inviting other developers to OpenSauced
          </p>
        </DashContainer>
      )}
    </div>
  );
};

export default ConnectionRequestsWrapper;
