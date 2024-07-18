/* eslint-disable @next/next/no-img-element */
import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";

import Image from "next/image";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";

import { getAvatarByUsername } from "lib/utils/github";

declare interface AvatarProps {
  contributor: string;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large";
}

type AvatarHoverCard = AvatarProps & {
  repositories: number[];
};

export const Avatar = ({ contributor, size = "large" }: AvatarProps): JSX.Element => {
  let width = 500;
  let height = 500;

  switch (size) {
    case "xxsmall":
      width = 18;
      height = 18;
      break;
    case "xsmall":
      width = 24;
      height = 24;
      break;
    case "small":
      width = 45;
      height = 45;
      break;

    case "medium":
      width = 35;
      height = 35;
      break;
    default:
      break;
  }

  return (
    <Image
      alt={contributor}
      className="border rounded-full not-prose"
      height={width}
      src={getAvatarByUsername(contributor, 40)}
      width={height}
    />
  );
};

const AvatarHoverCard = ({ contributor, repositories, size = "large" }: AvatarHoverCard): JSX.Element => {
  return (
    <HoverCard.Root>
      <Link href={`/u/${contributor}`} as={`/u/${contributor}`}>
        <HoverCard.Trigger>
          <Avatar contributor={contributor} size={size} />
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
