import Link from "next/link";
import React from "react";

import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import { truncateString } from "lib/utils/truncate-string";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

interface DevProfileProps {
  username: string;
  hasBorder: boolean;
  truncate?: boolean;
}
const DevProfile = ({ username, hasBorder, truncate }: DevProfileProps) => {
  return (
    <section className="flex items-center gap-2 text-light-slate-11">
      {/* Mobile */}
      <Link href={`/user/${username}`} className="rounded-full md:hidden">
        <Avatar
          className={hasBorder ? "ring-2 ring-orange-500" : ""}
          size={45}
          isCircle
          hasBorder={hasBorder}
          avatarURL={getAvatarByUsername(username)}
        />
      </Link>
      {/* Desktop */}
      <div className="hidden rounded-full md:flex">
        <AvatarHoverCard contributor={username} repositories={[]} size="small" />
      </div>
      <div>
        <h1 className="text-light-slate-12">{username && truncate ? truncateString(username, 11) : username}</h1>
      </div>
    </section>
  );
};

export default DevProfile;
