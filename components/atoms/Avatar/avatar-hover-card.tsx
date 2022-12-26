import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import clsx from "clsx";
import differenceInDays from "date-fns/differenceInDays";

import { getAvatarLink, getProfileLink } from "lib/utils/github";

export declare interface AvatarProps {
  contributor: string;
  lastPr?: string;
}

const AvatarHoverCard = ({ contributor, lastPr }: AvatarProps): JSX.Element => {
  console.log({ contributor, lastPr });
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Image
          alt={contributor}
          className="w-full h-full"
          height={500}
          src={getAvatarLink(contributor)}
          width={500}
        />
      </HoverCard.Trigger>
      <HoverCard.Content
        align="center"
        sideOffset={4}
        className={clsx(
          "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
          "max-w-md rounded-lg p-4 md:w-full",
          "bg-white dark:bg-gray-800",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          "items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] !opacity-100"
        )}
      >
        <HoverCard.Arrow
          className="fill-current text-white dark:text-gray-800"
          offset={12}
        />

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
              <Image
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
              {`Last contribution was ${differenceInDays(new Date(), new Date(Number(lastPr)))}.`}
            </p>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default AvatarHoverCard;


// import * as HoverCard from "@radix-ui/react-hover-card";

// const AvatarHoverCard = () => (
//   <HoverCard.Root>
//     <HoverCard.Trigger />
//     <HoverCard.Portal>
//       <HoverCard.Content>
//         <HoverCard.Arrow />
//       </HoverCard.Content>
//     </HoverCard.Portal>
//   </HoverCard.Root>
// );

// export default AvatarHoverCard;
