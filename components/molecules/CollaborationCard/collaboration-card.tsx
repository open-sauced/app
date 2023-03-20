import React from "react";
import Avatar from "components/atoms/Avatar/avatar";

export type CollaborationRequestObject = {
  requestor: DbUser | undefined;
  outreachMessage: string;
};
interface CollaborationCardProps extends CollaborationRequestObject {}
const CollaborationCard = ({ requestor, outreachMessage }: CollaborationCardProps) => {
  return (
    <div className="bg-white flex flex-col gap-4 rounded-2xl p-4 border border-light-slate-6 max-w-2xl">
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
          <button className="px-2">Ignore</button>
          <button className="bg-light-orange-9 px-2 py-1 outline-none rounded-lg text-white">Accept</button>
        </div>
      </div>
      <div>{outreachMessage}</div>
    </div>
  );
};

export default CollaborationCard;
