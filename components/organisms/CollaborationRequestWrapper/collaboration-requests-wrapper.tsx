import React, { useState } from "react";
import { format, isToday, isYesterday, formatDistanceToNowStrict } from "date-fns";
import CollaborationCard from "components/molecules/CollaborationCard/collaboration-card";
import { useUserCollaborations } from "lib/hooks/useUserCollaborations";

function formatPostDate(date: Date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
}
const CollaborationRequestsWrapper = () => {
  const { data, updateCollaborationStatus, deleteCollaborationRequest } = useUserCollaborations();
  let currentDate: string;

  const getDateGroupHeader = (date: Date) => {
    const dateString = date.toLocaleDateString();
    if (dateString !== currentDate) {
      currentDate = dateString;

      return <p className="mt-4 border-t text-light-slate-10 md:pt-4 md:mt-8">{formatPostDate(new Date(date))}</p>;
    }
    return;
  };

  return (
    <div>
      {data && data.length > 0 ? (
        data
          .filter((request) => request.status === "pending")
          .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
          .map((requests, i) => {
            return (
              <div className="flex flex-col w-full " key={i}>
                <div className="w-full mt-1 text-center md:text-left">
                  {getDateGroupHeader(new Date(requests.created_at))}
                </div>
                <CollaborationCard
                  onDecline={deleteCollaborationRequest}
                  onAccept={updateCollaborationStatus}
                  requestId={requests.id}
                  className="self-end w-full mt-1 md:w-4/5 md:mt-1"
                  outreachMessage={requests.message}
                  requestor={requests.request_user}
                />
              </div>
            );
          })
      ) : (
        <></>
      )}
    </div>
  );
};

export default CollaborationRequestsWrapper;
