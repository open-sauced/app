import Avatar from "components/atoms/Avatar/avatar";
import { truncateString } from "lib/utils/truncate-string";
import { StaticImageData } from "next/legacy/image";
import Link from "next/link";
import React from "react";

export interface FavoriteRepoCardProps {
  avatarURL: string | StaticImageData;
  name: string;
  owner: string;
  topic: string;
  userPage?: string;
}

const FavoriteRepoCard = ({ avatarURL, name, owner, topic, userPage }: FavoriteRepoCardProps): JSX.Element => {
  return (
    <div className="p-3 bg-white border-2 rounded-xl">
      <div className="flex items-center gap-2.5 h-10">
        {/* Avatar */}
        <a href={`https://www.github.com/${owner}/${name}`} target="_blank" rel="noreferrer" className="h-10">
          <Avatar className="shrink-0 min-w-10 min-h-10" size={40} avatarURL={avatarURL} isCircle={false} />
        </a>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <div className="  text-sm text-light-slate-11 truncate max-w-[85px] md:max-w-[110px]">
            <Link href={`/${userPage ? `pages/${userPage}/` : ""}${topic}/repositories/filter/${owner}/${name}`}>
              {owner}
            </Link>
          </div>
          <div title={name} className="text-lg text-light-slate-12 tracking-tight -mt-0.5">
            <Link href={`/${userPage ? `pages/${userPage}/` : ""}${topic}/repositories/filter/${owner}/${name}`}>
              {name.length > 10 ? truncateString(name, 12) : name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteRepoCard;
