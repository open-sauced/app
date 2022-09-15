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
import {FiLogOut} from "react-icons/fi";
import GitHubIcon from "public/icons/github-icon.svg";
import Icon from "components/atoms/Icon/icon";
import { useGlobalStateContext } from 'context/global-state';

const AuthSection: React.FC = ({  }) => {

  const { signIn, signOut, user } = useSupabaseAuth();
  const { appState } = useGlobalStateContext();

  const authMenu = {
    authed: [
      <span onClick={async () => await signOut()} key="authorized" className="group flex gap-x-3 text-lg hover:bg-light-orange-3 items-center px-4 py-2 rounded-md cursor-pointer transition">
        <FiLogOut className="group-hover:text-light-orange-10"/>
        <Text className="group-hover:text-light-orange-10">Disconnect</Text>
      </span>
    ]
  };

  return (
    <div className="flex">
      <div className="flex items-center gap-2 lg:gap-3">
        {user ?
          <>
            { !appState.onboarded ? <OnboardingButton/> : ''}
            <Divider type="vertical" className="!h-6 !bg-gray-600"></Divider>
            <Image alt="Notification Icon" src={notifications} />
            <DropdownList menuContent={authMenu.authed}>
              <div className="flex justify-end min-w-[60px] gap-2">
                <Avatar alt="User Avatar" avatarURL={user ? user.user_metadata.avatar_url : userAvatar} size={"base"} hasBorder={true} />
                <Image alt="Down Arrow" src={downArrow}/>
              </div>
            </DropdownList>
          </>

          :

          <Button type="primary" onClick={async () => await signIn({ provider: "github" })} >Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2"/></Button>
        }
      </div>
    </div>
  );
};

export default AuthSection;
