import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";

export default function StackedOwners({ owners }: { owners: string[] }) {
  return (
    <div className="flex -space-x-3 transition-all duration-300 hover:-space-x-1">
      {owners.slice(0, owners.length > 4 ? 4 : owners.length).map((username) => (
        <div
          key={`owner-picture-${username}`}
          className="w-8 h-8 overflow-hidden transition-all duration-300 border-2 border-white border-solid rounded-full"
        >
          <HoverCard.Root>
            <Link href={`/u/${username}`} as={`/u/${username}`}>
              <HoverCard.Trigger>
                <Avatar contributor={username} />
              </HoverCard.Trigger>
            </Link>

            <HoverCard.Portal>
              <HoverCard.Content sideOffset={5}>
                <HoverCardWrapper username={username} />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </div>
      ))}

      {owners.length > 4 && (
        <div className="text-xs flex items-center bg-slate-100 text-center px-1 w-8 h-8 overflow-hidden transition-all duration-300 border-2 border-white border-solid rounded-full">
          <p>+{owners.length - 4}</p>
        </div>
      )}
    </div>
  );
}
