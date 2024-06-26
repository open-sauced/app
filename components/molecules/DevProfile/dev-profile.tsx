import Link from "next/link";
import React from "react";

import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";
import { OscrRating } from "components/Contributors/OscrRating";

interface DevProfileProps {
  username: string;
  hasBorder: boolean;
  size?: "xsmall" | "small" | "medium" | "large";
  truncate?: boolean;
  oscrRating?: number;
}
const DevProfile = ({ username, hasBorder, size = "small", truncate, oscrRating }: DevProfileProps) => {
  return (
    <section className="flex items-center gap-2 text-light-slate-11">
      {/* Mobile */}
      <div className="grid gap-1 md:hidden">
        <Link href={`/u/${username}`} className="rounded-full">
          <Avatar
            className={hasBorder ? "ring-2 ring-orange-500" : ""}
            size={45}
            isCircle
            hasBorder={hasBorder}
            avatarURL={getAvatarByUsername(username)}
          />
        </Link>
        {typeof oscrRating !== "undefined" ? <OscrRating rating={oscrRating} /> : null}
      </div>
      {/* Desktop */}
      <div className="hidden md:flex justify-items-center gap-2">
        <div className="rounded-full md:flex items-center">
          <AvatarHoverCard contributor={username} repositories={[]} size={size} />
        </div>
        <div className="grid gap-1 items-center">
          <h1 className={`${truncate && "truncate"} text-light-slate-12`}>{username}</h1>
          {typeof oscrRating !== "undefined" ? <OscrRating rating={oscrRating} /> : null}
        </div>
      </div>
    </section>
  );
};

export default DevProfile;
