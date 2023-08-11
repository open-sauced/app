import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import { IoNotifications } from "react-icons/io5";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { BiLinkExternal } from "react-icons/bi";
import { Divider } from "@supabase/ui";

import useSession from "lib/hooks/useSession";

import PersonIcon from "img/icons/person-icon.svg";

import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import GitHubIcon from "img/icons/github-icon.svg";
import Icon from "components/atoms/Icon/icon";
import DropdownList from "../DropdownList/dropdown-list";
import OnboardingButton from "../OnboardingButton/onboarding-button";
import userAvatar from "../../../img/ellipse-1.png";
import downArrow from "../../../img/chevron-down.svg";
import useSupabaseAuth from "../../../lib/hooks/useSupabaseAuth";

const AuthSection: React.FC = ({}) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const { signIn, signOut, user } = useSupabaseAuth();
  const { onboarded, session } = useSession(true);
  const [userInfo, setUserInfo] = useState<DbUser | undefined>(undefined);
  const [host, setHost] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  useEffect(() => {
    if (session && !userInfo) {
      setUserInfo(session);
    }
  }, [session]);

  const authMenu = {
    authed: [
      <Link
        href={`/user/${user?.user_metadata.user_name}`}
        key="settings"
        className="flex items-center px-4 py-2 text-lg transition rounded-md cursor-pointer group gap-x-3 hover:bg-light-orange-3"
      >
        <div className="flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full">
          <Image width={10} height={10} alt="Icon" src={PersonIcon} />
        </div>
        <Text className="group-hover:text-light-orange-10">{user?.user_metadata.user_name}</Text>
      </Link>,
      <Link
        href={"https://docs.opensauced.pizza/community/faqs/"}
        key="faqs"
        className="flex items-center px-4 py-2 text-lg transition rounded-md cursor-pointer group gap-x-3 hover:bg-light-orange-3"
      >
        <BiLinkExternal className="group-hover:text-light-orange-10" />
        <Text className="group-hover:text-light-orange-10">FAQs</Text>
      </Link>,
      <Link
        href="/user/settings"
        key="settings"
        className="flex items-center px-4 py-2 text-lg transition rounded-md cursor-pointer group gap-x-3 hover:bg-light-orange-3"
      >
        <FiSettings className="group-hover:text-light-orange-10" />
        <Text className="group-hover:text-light-orange-10">Settings</Text>
      </Link>,
      <span
        onClick={async () => {
          const pageHref = window.location.href;
          const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf("?")));
          if (searchParams.has("login")) {
            searchParams.delete("login");
            router.replace(`${pageHref.substring(0, pageHref.indexOf("?"))}?${searchParams.toString()}`);
          }

          await signOut();
        }}
        key="authorized"
        className="flex items-center px-4 py-2 text-lg transition rounded-md cursor-pointer group gap-x-3 hover:bg-light-orange-3"
      >
        <FiLogOut className="group-hover:text-light-orange-10" />
        <Text className="group-hover:text-light-orange-10">Disconnect</Text>
      </span>,
    ],
  };
  return (
    <div className="flex p-2 m-1 sm:py-0">
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
            <button className="relative cursor-pointer" onClick={() => router.push(`/user/notifications`)}>
              {userInfo && userInfo.notification_count > 0 && (
                <span className="absolute right-0 block w-2 h-2 bg-orange-300 rounded-full"></span>
              )}
              <IoNotifications className="text-xl text-light-slate-9" />
            </button>

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
          <Button
            variant="primary"
            onClick={async () =>
              await signIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
            }
          >
            Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthSection;
