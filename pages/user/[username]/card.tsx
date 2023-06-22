import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import Button from "components/atoms/Button/button";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import DevCardCarousel from "components/organisms/DevCardCarousel/dev-card-carousel";
import { STUB_DEV_CARDS } from "components/organisms/DevCardCarousel/stubData";
import BubbleBG from "../../../img/bubble-bg.svg";

interface CardProps {
  username: string;
}

export const getServerSideProps: GetServerSideProps<CardProps> = async (context) => {
  const username = context?.params?.username as string | undefined;
  if (!username) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      username,
    },
  };
};

const cardData = [...STUB_DEV_CARDS];

const Card: NextPage<CardProps> = ({ username }) => {
  const [selectedUserName, setSelectedUserName] = useState<string>(username);
  const iframeTransition = useTransition(selectedUserName, {
    from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
  });

  return (
    <div
      style={{
        background: `url(${BubbleBG.src}) no-repeat center center, linear-gradient(147deg, #212121 13.41%, #2E2E2E 86.8%)`,
        backgroundSize: "cover",
      }}
    >
      <main
        className="grid w-full h-full min-h-screen md:max-h-screen md:overflow-hidden md:pb-20"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <div className="grid justify-center place-content-start py-7 px-3 md:justify-start">
          <HeaderLogo withBg={false} />
        </div>
        <div
          className="grid place-content-center"
          style={{
            gridTemplateColumns: "34% auto",
            columnGap: "4%",
          }}
        >
          <div className="flex items-center md:justify-end">
            <div className="flex flex-col gap-10">
              <DevCardCarousel isLoading={false} cards={cardData} onSelect={(name) => setSelectedUserName(name)} />
              <div className="hidden md:flex align-self-stretch justify-center">
                <Button variant="primary" className="justify-center">
                  Create your own dev card!
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden md:grid overflow-hidden">
            {iframeTransition((style, username) => {
              return (
                <animated.div
                  className="grid overflow-hidden relative"
                  style={{
                    ...style,
                    gridArea: "1 / 1",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="grid hover:scale-[1.01] cursor-pointer transition-all group">
                    <div className="rounded-l-3xl h-full max-h-full grid bg-slate-50 overflow-hidden">
                      <iframe
                        className="h-full max-h-full group-hover:blur-sm transition-all z-10 relative"
                        width={1555}
                        height={938}
                        src={`/user/${username}`}
                        style={{
                          pointerEvents: "none",
                          aspectRatio: "1555 / 938",
                          border: "none",
                          gridArea: "1 / 1",
                        }}
                      ></iframe>
                    </div>
                    <a className="absolute w-full h-full grid place-content-center" href={`/user/${username}`}>
                      <Button
                        variant="primary"
                        className="justify-center self-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        View Full Profile
                      </Button>
                    </a>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>
        <div className="grid justify-center place-content-start py-7 md:hidden">
          <div className="flex flex-col gap-2">
            <Button variant="primary" className="justify-center" href={`/user/${selectedUserName}`}>
              See Full Profile
            </Button>
            <Button variant="dark" className="justify-center">
              Create your own dev card!
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Card;
