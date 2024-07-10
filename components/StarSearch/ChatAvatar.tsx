import Image from "next/image";
import { getAvatarById } from "lib/utils/github";

type Author = "You" | "StarSearch" | "Guest";

interface ChatAvatarProps {
  author: Author;
  userId?: number;
}

export function ChatAvatar({ author, userId }: ChatAvatarProps) {
  switch (author) {
    case "You":
      return (
        <Image
          src={getAvatarById(`${userId}`)}
          alt="Your profile picture"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full lg:w-10 lg:h-10"
        />
      );
    case "Guest":
    case "StarSearch":
      return (
        <div className="bg-gradient-to-br from-sauced-orange to-amber-400 px-1.5 py-1 lg:p-2 rounded-full w-max">
          <Image
            src="/assets/star-search-logo-white.svg"
            alt="StarSearch logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
      );

    default:
      throw new Error(`Invalid author: ${author} type provided`);
  }
}
