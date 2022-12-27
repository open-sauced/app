/* eslint-disable @next/next/no-img-element */
import * as HoverCard from "@radix-ui/react-hover-card";
import clsx from "clsx";
import formatDistanceStrict from "date-fns/formatDistanceStrict";

import { getAvatarLink, getProfileLink } from "lib/utils/github";

export declare interface AvatarProps {
  contributor: string;
  lastPr?: string;
}

const AvatarHoverCard = ({ contributor, lastPr }: AvatarProps): JSX.Element => {
  const lastPrDate  = formatDistanceStrict(new Date(), new Date(Number(lastPr)), { addSuffix: true });

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <img
          alt={contributor}
          className="w-full h-full"
          height={500}
          src={getAvatarLink(contributor)}
          width={500}
        />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="rounded-lg p-4 max-w-md md:w-full bg-white dark:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] !opacity-100" sideOffset={5}>
          <div className="flex h-full w-full space-x-4">
            <div
              className={clsx(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900"
              )}
            >
              <a
                href={getProfileLink(contributor)}
                rel="noreferrer"
                target="_blank"
                title={contributor}
              >
                <img
                  alt={contributor}
                  className="object-cover rounded-full"
                  height={500}
                  src={getAvatarLink(contributor)}
                  width={500}
                />
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {contributor}
              </h3>

              <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
                {`First contribution was ${lastPrDate}.`}
              </p>
            </div>
          </div>

          <HoverCard.Arrow
            className="fill-current text-white dark:text-gray-800"
          />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>

  );
};

export default AvatarHoverCard;
