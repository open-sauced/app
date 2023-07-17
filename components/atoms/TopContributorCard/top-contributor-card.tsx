import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { getAvatarByUsername } from "lib/utils/github";
import useFollowUser from "lib/hooks/useFollowUser";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import Avatar from "../Avatar/avatar";
import Button from "../Button/button";

export interface TopContributorCardProps {
  login: string;
}

const TopContributorCard = ({ login }: TopContributorCardProps) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const { isError: notFollowing, follow, unFollow } = useFollowUser(login);
  const [host, setHost] = useState("");
  const { sessionToken, signIn } = useSupabaseAuth();

  const handleFollowContributor = async () => {
    try {
      if (notFollowing) {
        await follow();
        return;
      }
      await unFollow();
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
      {sessionToken && !notFollowing ? (
        <Button
          onClick={() =>
            sessionToken
              ? handleFollowContributor()
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
              ? handleFollowContributor()
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

export default TopContributorCard;
