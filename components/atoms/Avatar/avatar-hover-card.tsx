/* eslint-disable @next/next/no-img-element */
import * as HoverCard from "@radix-ui/react-hover-card";

import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";

import { getAvatarLink } from "lib/utils/github";
import Link from "next/link";

export declare interface AvatarProps {
  contributor: string;
  repositories: number[];
}

const AvatarHoverCard = ({ contributor, repositories }: AvatarProps): JSX.Element => {

  return (
    <HoverCard.Root>
      <Link href={`/user/${contributor}`}>
        <a>
          <HoverCard.Trigger asChild>
            <img
              alt={contributor}
              className="w-full h-full"
              height={500}
              src={getAvatarLink(contributor)}
              width={500}
            />
          </HoverCard.Trigger>
        </a>
      </Link>
      <HoverCard.Portal>
        <HoverCard.Content sideOffset={5}>
          <HoverCardWrapper username={contributor} repositories={repositories} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>

  );
};

export default AvatarHoverCard;
