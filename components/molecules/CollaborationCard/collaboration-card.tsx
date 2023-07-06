import React from "react";
import clsx from "clsx";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import Button from "components/atoms/Button/button";

export interface CollaborationRequestObject extends React.ComponentProps<"div"> {
  requestor: DbUser | undefined;
  outreachMessage: string;
  requestId: string;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const CollaborationCard = ({
  requestor,
  outreachMessage,
  className,
  requestId,
  onAccept,
  onDecline,
}: CollaborationRequestObject) => {
  return (
    <div className={clsx("flex flex-col w-full gap-4 p-4 bg-white border rounded-2xl border-light-slate-6", className)}>
      <div className="flex items-center justify-between text-sm ">
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="!rounded-none" size="sm" avatarURL={getAvatarByUsername(requestor?.login || "")} />

          <div>{requestor?.name}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onDecline(requestId)} className="px-2">
            Ignore
          </button>
          <Button
            onClick={() => onAccept(requestId)}
            variant="primary"
            className="!px-2 !py-1 !text-xs md:text-sm text-white rounded-lg outline-none bg-light-orange-9"
          >
            Accept
          </Button>
        </div>
      </div>
      <div>{outreachMessage}</div>
    </div>
  );
};

export default CollaborationCard;
