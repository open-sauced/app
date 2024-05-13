import Link from "next/link";
import React from "react";

import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

interface DevProfileProps {
  username: string;
  hasBorder: boolean;
  size?: "xsmall" | "small" | "medium" | "large";
  truncate?: boolean;
}
const DevProfile = ({ username, hasBorder, size = "small", truncate }: DevProfileProps) => {
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
        <AvatarHoverCard contributor={username} repositories={[]} size={size} />
      </div>
      <div>
        <h1 className={`${truncate && "truncate"} text-light-slate-12`}>{username}</h1>
      </div>
    </section>
  );
};

export default DevProfile;
