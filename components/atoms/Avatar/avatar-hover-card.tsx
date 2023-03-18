/* eslint-disable @next/next/no-img-element */
import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";

import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";

import { getAvatarByUsername } from "lib/utils/github";
import roundedImage from "lib/utils/roundedImages";

declare interface AvatarProps {
  contributor: string;
  repositories: number[];
}

const AvatarHoverCard = ({ contributor, repositories }: AvatarProps): JSX.Element => {
  const avatar = roundedImage(getAvatarByUsername(contributor), process.env.NEXT_PUBLIC_CLOUD_NAME);

  return (
    <HoverCard.Root>
      <Link href={`/user/${contributor}`} as={`/user/${contributor}`}>
        <HoverCard.Trigger asChild>
          <img
            alt={contributor}
            className="w-full h-full"
            height={500}
            src={avatar}
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
};

export default AvatarHoverCard;
