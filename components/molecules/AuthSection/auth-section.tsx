import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoNotifications } from "react-icons/io5";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { BiLinkExternal } from "react-icons/bi";
import { Divider } from "@supabase/ui";
import store from "lib/store";

import useSession from "lib/hooks/useSession";

import PersonIcon from "img/icons/person-icon.svg";

import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/shared/Button/button";
import Text from "components/atoms/Typography/text";
import GitHubIcon from "img/icons/github-icon.svg";
import Icon from "components/atoms/Icon/icon";
import SearchDialog, { SearchDialogTrigger } from "components/organisms/SearchDialog/search-dialog";
import Tooltip from "components/atoms/Tooltip/tooltip";
import DropdownList from "../DropdownList/dropdown-list";
import OnboardingButton from "../OnboardingButton/onboarding-button";
import userAvatar from "../../../img/ellipse-1.png";
import downArrow from "../../../img/chevron-down.svg";
import useSupabaseAuth from "../../../lib/hooks/useSupabaseAuth";

const AuthSection: React.FC = ({}) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const { redirectedFrom } = router.query as { redirectedFrom?: string };

  const openSearch = store((state) => state.openSearch);

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
    if (redirectedFrom && session) {
      router.replace(`${decodeURIComponent(redirectedFrom)}`);
    }
  }, [redirectedFrom, session]);

  useEffect(() => {
    if (session && !userInfo) {
      setUserInfo(session);
    }
  }, [session]);

  const authMenu = {
    authed: [
      <Link
        href={`/u/${user?.user_metadata.user_name}`}
        key="settings"
        className="flex items-center px-4 py-2 text-lg transition rounded-md cursor-pointer group gap-x-3 hover:bg-light-orange-3"
      >
        <div className="flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full">
          <Image width={10} height={10} alt="Icon" src={PersonIcon} />
        </div>
        <Text className="group-hover:text-light-orange-10">{user?.user_metadata.user_name}</Text>
      </Link>,
      <Link
        href={"https://docs.opensauced.pizza/welcome/faqs/"}
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
      <button
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
      </button>,
    ],
  };
  return (
    <>
      <div className="flex p-2 m-1 sm:py-0">
        <div className="flex items-center gap-2 lg:gap-3">
          <SearchDialogTrigger />
          {user ? (
            <>
              {onboarded !== undefined && !onboarded && (
                <>
                  <div className="relative hidden lg:flex xl:hidden">
                    <Tooltip content="Complete the onboarding" direction="bottom">
                      <OnboardingButton ariaLabel="Complete your onboarding" className="!flex !pr-1" />
                    </Tooltip>
                  </div>
                  <OnboardingButton className="!hidden xl:!flex !pr-1">
                    <Text className="text-sm !text-light-slate-12 hidden xl:block py-1 px-2">
                      Complete the onboarding
                    </Text>
                  </OnboardingButton>
                  <Divider type="vertical" className="!h-6 !bg-light-slate-6"></Divider>
                </>
              )}
              <button
                className="relative cursor-pointer"
                onClick={() => {
                  if (userInfo && userInfo.notification_count > 0) {
                    setUserInfo({ ...userInfo, notification_count: 0 });
                  }
                  router.push(`/user/notifications`);
                }}
              >
                {userInfo && userInfo.notification_count > 0 && (
                  <span className="absolute right-0 block w-2 h-2 bg-orange-300 rounded-full"></span>
                )}
                <IoNotifications className="text-xl text-light-slate-9" />
              </button>

              <DropdownList className="-mb-1" menuContent={authMenu.authed}>
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
              onClick={async () => {
                signIn({
                  provider: "github",
                  options: {
                    redirectTo: `${host}${redirectedFrom ? decodeURIComponent(redirectedFrom) : currentPath}`,
                  },
                });
              }}
              className="flex items-center"
            >
              Connect <span className="hidden sm:inline-block ml-1">with GitHub</span>
              <Icon IconImage={GitHubIcon} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
      {openSearch && <SearchDialog />}
    </>
  );
};

export default AuthSection;
