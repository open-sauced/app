import Link from "next/link";
import React from "react";
import { FaRegSmile, FaUserCircle } from "react-icons/fa";

interface NotificationCard {
  type: "highlight_reaction" | "follow" | "collaboration";
  message: string;
  id: string;
}

const getSourceURL = (type: string, id: string) => {
  switch (type) {
    case "highlight_reaction":
      return `/feed/${id}`;
    case "follow":
      return `/user/${id}`;
  }
};

const NotificationCard = ({ type, message, id }: NotificationCard) => {
  const Icons = {
    highlight_reaction: FaRegSmile,
    follow: FaUserCircle,
    collaboration: FaUserCircle,
  };

  const Icon = Icons[type];
  const linkURL = getSourceURL(type, id);

  return (
    <div className="flex items-center gap-3 p-2 transition cursor-pointer rounded-xl group hover:text-sauced-orange hover:bg-sauced-light">
      <Icon className="text-2xl shrink-0" />
      <p className="text-sm">
        <Link href={`${linkURL}`}> {message}</Link>
      </p>
    </div>
  );
};

export default NotificationCard;
