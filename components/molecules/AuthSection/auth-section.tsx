import Image from "next/image";
import Link from "next/link";

import { FiLogOut, FiSettings } from "react-icons/fi";
import { Divider } from "@supabase/ui";

import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "../../../lib/hooks/useSupabaseAuth";

import PersonIcon from "img/icons/person-icon.svg";
import notifications from "../../../img/notifications.svg";
import downArrow from "../../../img/chevron-down.svg";
import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/atoms/Button/button";
import userAvatar from "../../../img/ellipse-1.png";
import OnboardingButton from "../OnboardingButton/onboarding-button";
import DropdownList from "../DropdownList/dropdown-list";
import Text from "components/atoms/Typography/text";
import GitHubIcon from "img/icons/github-icon.svg";
import Icon from "components/atoms/Icon/icon";

const AuthSection: React.FC = ({}) => {
  const { signIn, signOut, user } = useSupabaseAuth();
  const { onboarded } = useSession();

  const authMenu = {
    authed: [
      <Link
        href={`/user/${user?.user_metadata.user_name}`}
        key="settings"
        className="group flex gap-x-3 text-lg hover:bg-light-orange-3 items-center px-4 py-2 rounded-md cursor-pointer transition"
      >
        <div className="w-5 h-5 flex justify-center items-center bg-blue-100 rounded-full">
          <Image width={10} height={10} alt="Icon" src={PersonIcon} />
        </div>
        <Text className="group-hover:text-light-orange-10">{user?.user_metadata.user_name}</Text>
      </Link>,
      <Link
        href="/user/settings"
        key="settings"
        className="group flex gap-x-3 text-lg hover:bg-light-orange-3 items-center px-4 py-2 rounded-md cursor-pointer transition"
      >
        <FiSettings className="group-hover:text-light-orange-10" />
        <Text className="group-hover:text-light-orange-10">Settings</Text>
      </Link>,
      <span
        onClick={async () => await signOut()}
        key="authorized"
        className="group flex gap-x-3 text-lg hover:bg-light-orange-3 items-center px-4 py-2 rounded-md cursor-pointer transition"
      >
        <FiLogOut className="group-hover:text-light-orange-10" />
        <Text className="group-hover:text-light-orange-10">Disconnect</Text>
      </span>
    ]
  };

  return (
    <div className="flex">
      <div className="flex items-center gap-2 lg:gap-3">
        {user ? (
          <>
            {onboarded === false ? (
              <>
                <OnboardingButton />
                <Divider type="vertical" className="!h-6 !bg-light-slate-6"></Divider>
              </>
            ) : (
              ""
            )}

            <Image alt="Notification Icon" src={notifications} />
            <DropdownList menuContent={authMenu.authed}>
              <div className="flex justify-end min-w-[60px] gap-2">
                <Avatar
                  alt="User Avatar"
                  avatarURL={user ? user.user_metadata.avatar_url : userAvatar}
                  size={"base"}
                  hasBorder={true}
                  isCached={false}
                />
                <Image alt="Down Arrow" src={downArrow} />
              </div>
            </DropdownList>
          </>
        ) : (
          <Button type="primary" onClick={async () => await signIn({ provider: "github" })}>
            Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthSection;
