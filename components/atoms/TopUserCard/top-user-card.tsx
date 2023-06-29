import React from "react";
import { getAvatarByUsername } from "lib/utils/github";
import Avatar from "../Avatar/avatar";
import Button from "../Button/button";

export interface TopUserCardProps {
  clasName?: string;
  following: boolean;
  username: string;
}
/**
 *
 * additional props to handle follow button click will be added in future versions
 */

const TopUserCard = ({ username, following }: TopUserCardProps) => {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex items-center gap-2">
        <Avatar isCircle size={35} avatarURL={getAvatarByUsername(username)} />
        <p className="font-semibold text-light-slate-12">{username}</p>
      </div>
      {following ? (
        <Button className="!px-2 !py-1" variant="primary">
          following
        </Button>
      ) : (
        <Button className="!px-2 !py-1 border-light-orange-7 text-light-orange-10" variant="text">
          follow
        </Button>
      )}
    </div>
  );
};

export default TopUserCard;
