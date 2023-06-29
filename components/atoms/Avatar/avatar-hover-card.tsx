/* eslint-disable @next/next/no-img-element */
import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";

import Image from "next/image";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";

import { getAvatarByUsername } from "lib/utils/github";

declare interface AvatarProps {
  contributor: string;
  repositories: number[];
}

const AvatarHoverCard = ({ contributor, repositories }: AvatarProps): JSX.Element => (
  <HoverCard.Root>
    <Link href={`/user/${contributor}`} as={`/user/${contributor}`}>
      <HoverCard.Trigger asChild>
        <Image
          alt={contributor}
          className="border rounded-full"
          height={500}
          src={getAvatarByUsername(contributor, 40)}
          width={500}
        />
      </HoverCard.Trigger>
    </Link>
    <HoverCard.Portal>
      <HoverCard.Content sideOffset={5}>
        <HoverCardWrapper username={contributor} repositories={repositories} />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default AvatarHoverCard;
