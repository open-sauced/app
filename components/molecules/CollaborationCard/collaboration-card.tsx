import { User } from "@supabase/supabase-js";
import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/atoms/Button/button";
import React from "react";

interface CollaborationCardProps {
  requestor: User;
  outreachMessage: string;
}
const CollaborationCard = ({ requestor, outreachMessage }: CollaborationCardProps) => {
  return (
    <div className="bg-white flex flex-col gap-4 rounded-lg p-4 border max-w-[41.625rem]">
      <div className="flex justify-between text-sm items-center ">
        <div className="flex gap-2 text-sm items-center">
          <Avatar
            className="!rounded-none"
            size="sm"
            avatarURL="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          />

          <div>Microsoft</div>
        </div>
        <div className="flex gap-2">
          <button className="px-2">ignore</button>
          <button className="bg-light-orange-9 px-2 py-1 outline-none rounded-lg text-white">Accept</button>
        </div>
      </div>
      <div>{outreachMessage}</div>
    </div>
  );
};

export default CollaborationCard;
