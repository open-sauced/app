import { TbMessageCode } from "react-icons/tb";

import React from "react";
import { BiMessage } from "react-icons/bi";
import Avatar from "components/atoms/Avatar/avatar";
import { CollaborationRequestObject } from "../CollaborationCard/collaboration-card";

interface CollaborationSummaryCardProps {
  requests: CollaborationRequestObject[];
  connectionsCount?: number;
  messagesCount?: number;
}
const CollaborationSummaryCard = ({ requests, connectionsCount, messagesCount }: CollaborationSummaryCardProps) => {
  return (
    <div className="bg-white flex flex-col gap-4 rounded-2xl border-light-slate-6  p-4 border max-w-2xl">
      <div className="flex justify-between text-sm items-center ">
        <div className="flex gap-2 text-sm items-center">
          <div className="flex items-center">
            Collaboration requests:{" "}
            <span className="flex items-center gap-3 ml-3">
              {requests.map((i, index) => (
                <Avatar
                  key={index}
                  className="!rounded-none"
                  size="sm"
                  avatarURL="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                />
              ))}
            </span>{" "}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-2">Archive</button>
          <button className="bg-light-orange-9 px-2 py-1 outline-none rounded-lg text-white">Expand</button>
        </div>
      </div>
      <div>{requests[0].outreachMessage}</div>
      <div className="text-light-slate-10 gap-3 items-center flex">
        <div className="flex items-center gap-2">
          <TbMessageCode /> <span className="text-sm">{connectionsCount} connections</span>
        </div>
        <div className="flex items-center gap-2">
          <BiMessage /> <span className="text-sm">{messagesCount} messages</span>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSummaryCard;
