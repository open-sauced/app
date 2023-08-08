import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getAvatarByUsername } from "lib/utils/github";
import { Spinner } from "../SpinLoader/spin-loader";

export type MetaObj = {
  name: "Followers" | "Following" | "Highlights";
  count: number;
};
interface UserCardProps {
  username: string;
  meta: MetaObj[];
  name: string;
  loading?: boolean;
}
const UserCard = ({ username, name, meta, loading }: UserCardProps) => {
  const avatarUrl = getAvatarByUsername(username);

  return (
    <div className="pb-6 border bg-light-slate-1 w-max rounded-xl border-zinc-200">
      {loading ? (
        <div className="flex items-center justify-center h-32 w-72">
          <Spinner className="mt-6 " />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 px-9">
          <div className="flex flex-col items-center gap-2 -mt-10">
            <Image
              className="border border-white rounded-full "
              width={100}
              height={100}
              src={avatarUrl}
              alt={`${username}'s avatar image`}
            />
            <div className="text-center">
              <h3 className="text-lg ">{name}</h3>
              <Link className="text-lg text-slate-700" href={`/user/${username}`}>{`@${username}`}</Link>
            </div>
          </div>
          <div className="flex items-center gap-5 text-base text-center ">
            {meta.map(({ name, count }, i) => (
              <div key={i.toLocaleString()}>
                <p className="text-xs text-center text-light-slate-9">{name}</p>
                {count > 0 ? count : "-"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
