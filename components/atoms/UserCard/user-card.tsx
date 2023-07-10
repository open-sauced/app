import Image from "next/image";
import React from "react";
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
    <div className="pb-6 bg-white border w-max rounded-2xl border-zinc-200">
      {loading ? (
        <div className="flex items-center justify-center h-32 w-72">
          <Spinner className="mt-6 " />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 px-6 ">
          <div className="flex flex-col items-center gap-2 -mt-10">
            <Image
              className="border border-white rounded-full "
              width={100}
              height={100}
              src={avatarUrl}
              alt={`${username}'s avatar image`}
            />
            <div>
              <h3 className="text-base text-center">{name}</h3>
              <p className="text-center text-light-slate-9">{`@${username}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-base text-center ">
            {meta.map(({ name, count }, i) => (
              <div key={i.toLocaleString()}>
                <p className="text-center text-light-slate-9">{name}</p>
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
