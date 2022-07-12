import React from "react";
import Image from "next/image";
import notifications from "../../../public/notifications.svg";
import downArrow from "../../../public/chevron-down.svg";
import userAvatar from "../../../public/ellipse-1.png";
import Avatar from "components/atoms/Avatar/avatar";

const AuthSection: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex items-center">
        <Image alt="Notification Icon" src={notifications} />
        <div className="flex ml-3 mr-1">
          <Avatar alt="User Avatar" avatarURL={userAvatar} size={"base"} hasBorder={true} />
        </div>
        <div>
          <Image alt="Down Arrow" src={downArrow}/>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;