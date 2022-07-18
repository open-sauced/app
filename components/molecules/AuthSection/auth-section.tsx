import React from "react";
import Image from "next/image";
import notifications from "../../../public/notifications.svg";
import downArrow from "../../../public/chevron-down.svg";
import userAvatar from "../../../public/ellipse-1.png";
import Avatar from "components/atoms/Avatar/avatar";

const AuthSection: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex items-center gap-3">
        <Image alt="Notification Icon" src={notifications} />
        <div className="flex gap-2">
          <Avatar alt="User Avatar" avatarURL={userAvatar} size={"base"} hasBorder={true} />
          <Image alt="Down Arrow" src={downArrow}/>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;