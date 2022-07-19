import React from "react";
import Image from "next/image";
import notifications from "../../../public/notifications.svg";
import downArrow from "../../../public/chevron-down.svg";
import userAvatar from "../../../public/ellipse-1.png";
import Avatar from "components/atoms/Avatar/avatar";
import OnboardingButton from "../OnboardingButton/onboarding-button";
import { Divider } from "@supabase/ui";

const AuthSection: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex items-center xxs:gap-2 lg:gap-3">
        <OnboardingButton />
        <Divider type="vertical" className="!h-6 !bg-gray-600"></Divider>
        <Image alt="Notification Icon" src={notifications} />
        <div className="flex xxs:gap-2 lg:gap-2">
          <Avatar alt="User Avatar" avatarURL={userAvatar} size={"base"} hasBorder={true} />
          <Image alt="Down Arrow" src={downArrow}/>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;