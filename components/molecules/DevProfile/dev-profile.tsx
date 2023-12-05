import Link from "next/link";
import React from "react";

import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

interface DevProfileProps {
  username: string;
  hasBorder: boolean;
}
const DevProfile = ({ username, hasBorder }: DevProfileProps) => {
  return (
    <Link href={`/user/${username}`} className="flex items-center gap-2 text-light-slate-11 font-medium text-base">
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
      <div className="hidden rounded-full md:flex shrink-0">
        <AvatarHoverCard contributor={username} repositories={[]} size="small" />
      </div>
      <p className="text-light-slate-12 text-ellipsis whitespace-nowrap grow-0 overflow-hidden" title={username}>
        {username}
      </p>
    </Link>
  );
};

export default DevProfile;
