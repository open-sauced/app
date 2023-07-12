import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { getAvatarByUsername } from "lib/utils/github";
import useFollowUser from "lib/hooks/useFollowUser";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import Avatar from "../Avatar/avatar";
import Button from "../Button/button";

export interface TopUserCardProps {
  login: string;
}

const TopUserCard = ({ login }: TopUserCardProps) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const { data: isFollowing, follow, unFollow } = useFollowUser(login);
  const [host, setHost] = useState("");
  const { sessionToken, signIn } = useSupabaseAuth();

  const handleFollowUser = async () => {
    try {
      if (isFollowing) {
        await unFollow();
        return;
      }
      await follow();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  return (
    <div className="flex items-center justify-between w-full gap-4 bg-light-slate-1">
      <Link href={`/user/${login}`}>
        <div className="flex items-center gap-2">
          <Avatar isCircle size={35} avatarURL={getAvatarByUsername(login)} />
          <p className="font-semibold text-light-slate-12">{login}</p>
        </div>
      </Link>
      {sessionToken && isFollowing ? (
        <Button
          onClick={() =>
            sessionToken
              ? handleFollowUser()
              : signIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
          }
          className="!px-2 !py-1"
          variant="primary"
        >
          following
        </Button>
      ) : (
        <Button
          onClick={() =>
            sessionToken
              ? handleFollowUser()
              : signIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
          }
          className="!px-2 !py-1 border-light-orange-7 text-light-orange-10"
          variant="text"
        >
          follow
        </Button>
      )}
    </div>
  );
};

export default TopUserCard;
