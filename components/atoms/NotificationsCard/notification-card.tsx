import Link from "next/link";
import React from "react";
import { FaRegSmile, FaUserCircle } from "react-icons/fa";

import { getNotificationURL } from "@lib/utils/get-notification-url";

interface NotificationCard {
  type: "highlight_reaction" | "follow" | "collaboration";
  message: string;
  id: string;
}

const NotificationCard = ({ type, message, id }: NotificationCard) => {
  const Icons = {
    highlight_reaction: FaRegSmile,
    follow: FaUserCircle,
    collaboration: FaUserCircle,
  };

  const Icon = Icons[type];
  const linkURL = getNotificationURL(type, id);

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
