import Link from "next/link";
import React from "react";

import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import { truncateString } from "lib/utils/truncate-string";

interface DevProfileProps {
  username: string;
  company: string;
}
const DevProfile = ({ username, company }: DevProfileProps) => {
  return (
    <Link href={`/user/${username}`} className="flex items-center gap-2 text-light-slate-11">
      {/* Mobile */}
      <div className="rounded-full md:hidden">
        <Avatar className="" size={45} isCircle avatarURL={getAvatarByUsername(username)} />
      </div>
      {/* Desktop */}
      <div className="hidden rounded-full md:flex">
        <Avatar className="" size={60} isCircle avatarURL={getAvatarByUsername(username)} />
      </div>
      <div>
        <h1 className="text-light-slate-12">
          {username && username.length > 10 ? truncateString(username, 11) : username}
        </h1>
        {/* Mobile */}
        <p className="text-sm font-normal truncate text-light-slate-9 md:hidden">{truncateString(company, 15)}</p>
        {/* Desktop */}
        <p className="hidden text-sm font-normal md:inline-flex text-light-slate-9">{truncateString(company, 20)}</p>
      </div>
    </Link>
  );
};

export default DevProfile;
