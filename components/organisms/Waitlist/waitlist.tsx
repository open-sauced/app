import ComponentGradient from "../../molecules/ComponentGradient/component-gradient";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import Button from "components/atoms/Button/button";
import { FiArrowLeft } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import AvatarRoll from "components/molecules/AvatarRoll/avatar-roll";
const WaitlistComponent = () => {
  return (
    <ComponentGradient>
      <div className="z-10">
        <div className="py-3 flex justify-center">
          <HeaderLogo withBg={false} />
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
          <div className="flex mt-8 flex-col items-center">
            <Button
              className="text-lg hover:border-dark-orange-9 focus-visible:ring-dark-orange-3 focus-visible:ring-2 hover:bg-dark-orange-3  bg-dark-orange-2 border-dark-orange-7 font-semibold"
              variant="outline"
            >
              <FaGithub className="mr-2" /> Share on Twitter
            </Button>
            <Button className="hover:bg-dark-orange-3  mt-3" variant="link">
              <FiArrowLeft className="mr-1 font-bold" /> Go back home
            </Button>
          </div>
        </div>
      </div>
    </ComponentGradient>
  );
};

export default WaitlistComponent;
