import React from "react";
import Image from "next/image";
import notifications from "../../../public/notifications.svg";
import downArrow from "../../../public/chevron-down.svg";
import userAvatar from "../../../public/ellipse-1.png";
import Avatar from "components/atoms/Avatar/avatar";
import OnboardingButton from "../OnboardingButton/onboarding-button";
import DropdownList from "../DropdownList/dropdown-list";
import Text from "components/atoms/Typography/text";
import { Divider } from "@supabase/ui";

const AuthSection: React.FC = () => {

  const authMenu = 
    <span className="block px-4 py-2 rounded-md cursor-pointer">
      <Text>Logout</Text>
    </span>;

  return (
    <div className="flex">
      <div className="flex items-center gap-2 lg:gap-3">
        <OnboardingButton />
        <Divider type="vertical" className="!h-6 !bg-gray-600"></Divider>
        <Image alt="Notification Icon" src={notifications} />
        <div className="flex justify-end min-w-[60px] gap-2 lg:gap-2">
          <DropdownList className="mt-3" menuContent={authMenu}>
            <Avatar alt="User Avatar" avatarURL={userAvatar} size={"base"} hasBorder={true} />
          </DropdownList>
          <Image alt="Down Arrow" src={downArrow}/>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;