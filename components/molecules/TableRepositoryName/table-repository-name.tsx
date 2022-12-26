import Avatar from "components/atoms/Avatar/avatar";
import { truncateString } from "lib/utils/truncate-string";
import { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface TableRepositoryNameProps {
  avatarURL?: string | StaticImageData;
  name?: string;
  handle?: string;
  isLoading?: boolean;
  topic?: string;
  user: string | string[] | undefined;
}

const TableRepositoryName = ({ avatarURL, name, handle, topic, user }: TableRepositoryNameProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2.5">
      {/* Avatar */}
      <a href={`https://www.github.com/${handle}/${name}`} target="_blank" rel="noreferrer">
        <Avatar className="shrink-0 min-w-10 min-h-10" size={40} avatarURL={avatarURL} isCircle={false} />
      </a>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <div title={name} className="  text-base text-light-slate-12 tracking-tight">
          <Link href={`/${user ? `pages/${user}/` : ""}${topic}/repositories/filter/${handle}/${name}`}>
            <a>{name && name.length > 10 ? truncateString(name, 12) : name}</a>
          </Link>
        </div>
        <div className="  text-sm text-light-slate-11 truncate max-w-[85px] md:max-w-[110px]">
          <Link href={`/${user ? `pages/${user}/` : ""}${topic}/repositories/filter/${handle}/${name}`}>
            <a>{handle ? `@${handle}` : "handle1234"}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TableRepositoryName;
