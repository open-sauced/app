import React from "react";
import { FaRegSmile, FaUserCircle } from "react-icons/fa";

interface NotificationCard {
  type: "reaction" | "follow" | "collaboration";
  message: string;
}
const NotificationCard = ({ type, message }: NotificationCard) => {
  const iconMap = {
    reaction: <FaRegSmile className="text-3xl shrink-0 whitespace-nowrap" />,
    follow: <FaRegSmile className="text-3xl shrink-0 whitespace-nowrap" />,
    collaboration: <FaUserCircle className="text-3xl shrink-0" />
  };

  return (
    <div className="flex items-center gap-3 p-2 transition cursor-pointer rounded-xl group hover:text-sauced-orange hover:bg-sauced-light">
      {iconMap[type]}
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default NotificationCard;
