import React from "react";
import Image from "next/image";
import notifications from "../../../public/notifications.svg";
import downArrow from "../../../public/chevron-down.svg";
import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/atoms/Button/button";
import userAvatar from "../../../public/ellipse-1.png";
import OnboardingButton from "../OnboardingButton/onboarding-button";
import DropdownList from "../DropdownList/dropdown-list";
import Text from "components/atoms/Typography/text";
import { Divider } from "@supabase/ui";
import useSupabaseAuth from "../../../lib/hooks/useSupabaseAuth";

const AuthSection: React.FC = ({  }) => {

  const { signIn, signOut, user } = useSupabaseAuth();

  const authMenu = {
    authed: [
      <span onClick={async () => await signOut()} key="authorized" className="block px-4 py-2 rounded-md cursor-pointer">
        <Text>Logout</Text>
      </span>
    ]
  };

  return (
    <div className="flex">
      <div className="flex items-center gap-2 lg:gap-3">
        {user ? 
          <>
            <OnboardingButton />
            <Divider type="vertical" className="!h-6 !bg-gray-600"></Divider>
            <Image alt="Notification Icon" src={notifications} />
            <div className="flex justify-end min-w-[60px] gap-2">
              <DropdownList menuContent={authMenu.authed}>
                <Avatar alt="User Avatar" avatarURL={user ? user.user_metadata.avatar_url : userAvatar} size={"base"} hasBorder={true} />
              </DropdownList>
              <Image alt="Down Arrow" src={downArrow}/>
            </div>
          </>
          
          :

          <Button type="primary" onClick={async () => await signIn({ provider: "github" })} >Login</Button>
        }
      </div>
    </div>
  );
};

export default AuthSection;