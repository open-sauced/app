import ComponentGradient from "../../molecules/ComponentGradient/component-gradient";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import GitHubOrange from "/public/icons/github-orange-icon.svg";
import AvatarRoll from "components/molecules/AvatarRoll/avatar-roll";
const ComponentWaitlist = () => {
  return (
    <ComponentGradient>
      <div className="z-10">
        <div className="py-3 flex justify-center">
          <HeaderLogo />
        </div>
        <div className="mt-24">
          <div className="text-center">
            <Text className="!text-2xl !font-semibold !text-dark-orange-9 tracking-tight z-10">
              Thanks for signing up!
            </Text>
          </div>
          <div className="max-w-2xl mt-7 px-9 font-semibold">
            <Title className="text-center tracking-tight leading-10 !text-light-slate-1" level={1}>
              You and 32 others are on the Open Sauced waitlist.
            </Title>
          </div>
          <div className="flex mt-8 justify-center">
            <AvatarRoll avatarCount={9} />
          </div>
          <div className="flex mt-12 flex-col items-center">
            <Button className="!text-lg   !bg-dark-orange-2 !border-dark-orange-7 !font-semibold" type="outline">
              <Icon size={18} className="mr-2" IconImage={GitHubOrange} /> Share on Twitter
            </Button>
            <Button className="mt-3" type="link">
              &#10229; Go back home
            </Button>
          </div>
        </div>
      </div>
    </ComponentGradient>
  );
};

export default ComponentWaitlist;
