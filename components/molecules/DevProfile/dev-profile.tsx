import Link from "next/link";
import React from "react";

import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import { truncateString } from "lib/utils/truncate-string";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

interface DevProfileProps {
  username: string;
  hasBorder: boolean;
}
const DevProfile = ({ username, hasBorder }: DevProfileProps) => {
  return (
    <Link href={`/user/${username}`} className="flex items-center gap-2 text-light-slate-11 dark:text-dark-slate-11">
      {/* Mobile */}
      <div className="rounded-full md:hidden">
        <Avatar
          className={hasBorder ? "ring-2 ring-orange-500" : ""}
          size={45}
          isCircle
          hasBorder={hasBorder}
          avatarURL={getAvatarByUsername(username)}
        />
      </div>
      {/* Desktop */}
      <div className="hidden rounded-full md:flex">
        <AvatarHoverCard contributor={username} repositories={[]} size="small" />
      </div>
      <div>
        <h1 className="text-light-slate-12">
          {username && username.length > 10 ? truncateString(username, 11) : username}
        </h1>
      </div>
    </Link>
  );
};

export default DevProfile;
