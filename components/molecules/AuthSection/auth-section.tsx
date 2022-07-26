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
// import useSupabaseAuth from "../../../lib/hooks/useSupabaseAuth";

interface AuthSectionProps {
  user?: object;
}

const AuthSection: React.FC<AuthSectionProps> = ({ user }) => {
  //TODO: For Chad
  // const { signIn, signOut, user } = useSupabaseAuth();

  const authMenu = {
    authed: [
      <span key="authorized" className="block px-4 py-2 rounded-md cursor-pointer">
        <Text>Logout</Text>
      </span>
    ],
    unauthed: [
      <span key="unauthorized" className="block px-4 py-2 rounded-md cursor-pointer">
        <Text>Login</Text>
      </span>
    ]
  };

  return (
    <div className="flex">
      <div className="flex items-center gap-2 lg:gap-3">
        {user && 
          <>
            <OnboardingButton />
            <Divider type="vertical" className="!h-6 !bg-gray-600"></Divider>
            <Image alt="Notification Icon" src={notifications} />
          </>
        }
        <div className="flex justify-end min-w-[60px] gap-2">
          <DropdownList menuContent={user ? authMenu.authed : authMenu.unauthed}>
            <Avatar alt="User Avatar" avatarURL={userAvatar} size={"base"} hasBorder={true} />
          </DropdownList>
          <Image alt="Down Arrow" src={downArrow}/>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;