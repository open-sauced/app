import { getAvatarByUsername } from "lib/utils/github";
import Image from "next/image";
import React from "react";

interface UserCardProps {
  username: string;
  followersCount: number;
  highlightsCount: number;
  followingCount: number;
  name: string;
}
const UserCard = ({ username, name, followersCount, followingCount, highlightsCount }: UserCardProps) => {
  const avatarUrl = getAvatarByUsername(username);

  return (
    <div className="mt-10 bg-white border w-max rounded-2xl border-zinc-200">
      <div className="flex flex-col items-center gap-6 px-6 -translate-y-12 ">
        <div className="flex flex-col items-center gap-2">
          <Image
            className="border border-white rounded-full"
            width={110}
            height={110}
            src={avatarUrl}
            alt={`${username}'s avatar image`}
          />
          <div>
            <h3 className="text-lg text-center">{name}</h3>
            <p className="text-center text-light-slate-9">{`@${username}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-lg text-center">
          <div>
            <p className="text-center text-light-slate-9">Followers</p>
            {followersCount > 0 ? followersCount : "-"}
          </div>
          <div>
            <p className="text-center text-light-slate-9">Following</p>
            {followingCount > 0 ? followingCount : "-"}
          </div>
          <div>
            <p className="text-center text-light-slate-9">Highlights</p>
            {highlightsCount > 0 ? highlightsCount : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
