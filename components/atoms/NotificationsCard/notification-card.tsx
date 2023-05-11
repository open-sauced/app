import React from "react";
import { FaRegSmile, FaUserCircle } from "react-icons/fa";

interface NotificationCard {
  type: "highlight_reaction" | "follow" | "collaboration";
  message: string;
}
const NotificationCard = ({ type, message }: NotificationCard) => {
  const Icons = {
    highlight_reaction: FaRegSmile,
    follow: FaUserCircle,
    collaboration: FaUserCircle
  };

  const Icon = Icons[type];

  return (
    <div className="flex items-center gap-3 p-2 transition cursor-pointer rounded-xl group hover:text-sauced-orange hover:bg-sauced-light">
      <Icon className="text-2xl shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default NotificationCard;
