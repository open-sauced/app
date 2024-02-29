import { TbMessageCode } from "react-icons/tb";

import React from "react";
import { BiMessage } from "react-icons/bi";
import Avatar from "components/atoms/Avatar/avatar";
import { ConnectionRequestObject } from "../ConnectionCard/connection-card";

interface ConnectionSummaryCardProps {
  requests: ConnectionRequestObject[];
  connectionsCount?: number;
  messagesCount?: number;
}
const ConnectionSummaryCard = ({ requests, connectionsCount, messagesCount }: ConnectionSummaryCardProps) => {
  return (
    <div className="flex flex-col max-w-2xl gap-4 p-4 bg-background border rounded-2xl border-light-slate-6">
      <div className="flex items-center justify-between text-sm ">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            Connection requests:{" "}
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
          <button className="px-2 py-1 text-white rounded-lg outline-none bg-light-orange-9">Expand</button>
        </div>
      </div>
      <div>{requests[0].outreachMessage}</div>
      <div className="flex items-center gap-3 text-light-slate-10">
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

export default ConnectionSummaryCard;
