import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";
import { captureException } from "@sentry/nextjs";
import { FiCopy } from "react-icons/fi";
import Button from "components/shared/Button/button";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import DevCardCarousel from "components/organisms/DevCardCarousel/dev-card-carousel";
import SEO from "layouts/SEO/SEO";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { linkedinCardShareUrl, siteUrl, twitterCardShareUrl } from "lib/utils/urls";
import FullHeightContainer from "components/atoms/FullHeightContainer/full-height-container";
import { isValidUrlSlug } from "lib/utils/url-validators";
import { copyImageToClipboard } from "lib/utils/copy-to-clipboard";
import { useToast } from "lib/hooks/useToast";
import { Spinner } from "components/atoms/SpinLoader/spin-loader";
import TwitterIcon from "../../../public/twitter-x-logo.svg";
import LinkinIcon from "../../../img/icons/social-linkedin.svg";
import BubbleBG from "../../../img/bubble-bg.svg";
const ADDITIONAL_PROFILES_TO_LOAD = [
  "bdougie",
  "nickytonline",
  "brandonroberts",
  "bekahhw",
  "zeucapua",
  "jpmcb",
  "gr2m",
  "joshuakgoldberg",
  "natemoo-re",
  "CBID2",
];

export type UserDevStats = DbUser & DbListContributorStat;

async function fetchUserData(username: string) {
  try {
    if (!isValidUrlSlug(username)) {
      throw Error("Invalid username");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/devstats`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await response.json()) as UserDevStats;
  } catch (e) {
    captureException(e);
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const username = context?.params?.username as string | undefined;
  if (!username) {
    return {
      notFound: true,
    };
  }

  const uniqueUsernames = [...new Set([username, ...ADDITIONAL_PROFILES_TO_LOAD])];
  const cards = await Promise.all(uniqueUsernames.map(fetchUserData));

  return {
    props: {
      username,
      cards,
    },
  };
}

export default function CardPage({ username, cards }: { username: string; cards: UserDevStats[] }) {
  const { user: loggedInUser } = useSupabaseAuth();
  const [selectedUserName, setSelectedUserName] = useState<string>(username);
  const iframeTransition = useTransition(selectedUserName, {
    from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
  });

  const firstCard = cards?.find((card) => card.login === username);
  const isViewingOwnProfile = loggedInUser?.user_metadata?.user_name === username;

  const socialSummary = `${firstCard?.bio || `${username} has connected their GitHub but has not added a bio.`}`;

  return (
    <FullHeightContainer>
      <SEO
        title={`${username} | OpenSauced`}
        description={socialSummary}
        image={siteUrl(`og-images/dev-card`, { username })}
        twitterCard="summary_large_image"
      />
      <main
        className="grid max-h-screen md:overflow-hidden"
        style={{
          background: `url(${BubbleBG.src}) no-repeat center center, linear-gradient(147deg, #212121 13.41%, #2E2E2E 86.8%)`,
          backgroundSize: "cover",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <div className="grid justify-center place-content-start py-7 px-3 md:justify-start">
          <HeaderLogo />
        </div>
        <div
          className="grid place-content-center"
          style={{
            gridTemplateColumns: "34% auto",
            columnGap: "4%",
          }}
        >
          <div className="flex flex-col gap-10 self-start h-fit my-auto">
            <DevCardCarousel cards={cards} onSelect={(name) => setSelectedUserName(name)} />
            <div className="mt-8 flex align-self-stretch justify-center">
              {isViewingOwnProfile ? (
                <SocialButtons username={username} summary={socialSummary} />
              ) : (
                <Button variant="primary" className="justify-center" href="/start">
                  Create your own dev card!
                </Button>
              )}
            </div>
          </div>

          <div className="hidden md:grid">
            {iframeTransition((style, username) => {
              return (
                <animated.div
                  className="grid relative place-content-center"
                  style={{
                    ...style,
                    gridArea: "1 / 1",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="grid hover:scale-[1.01] cursor-pointer transition-all group">
                    <div className="rounded-l-3xl h-full max-h-full grid bg-slate-50 overflow-hidden">
                      <iframe
                        className="h-screen max-h-full group-hover:blur-sm transition-all z-10 relative"
                        src={`/u/${username}`}
                        style={{
                          pointerEvents: "none",
                          aspectRatio: "1555 / 938",
                          border: "none",
                          gridArea: "1 / 1",
                        }}
                      ></iframe>
                    </div>
                    <a className="absolute w-full h-full grid place-content-center z-20" href={`/u/${username}`}>
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
      </main>
    </FullHeightContainer>
  );
}

function CopyButton({ username }: { username: string }) {
  const [copying, setCopying] = useState(false);
  const { toast } = useToast();
  const posthog = usePostHog();

  return (
    <div
      className="rounded-full w-10 h-10 bg-sauced-orange stroke-white cursor-pointer hover:opacity-80 transition-all
flex items-center justify-center"
      onClick={async () => {
        setCopying(true);
        posthog.capture("DevCard image copied", { username });
        copyImageToClipboard(siteUrl(`og-images/dev-card`, { username })).then((copied) => {
          if (copied) {
            setTimeout(() => {
              toast({ description: "Copied to clipboard", variant: "success" });
              setCopying(false);
            }, 500);
          } else {
            toast({ description: "Error copying to clipboard", variant: "warning" });
            setCopying(false);
          }
        });
      }}
    >
      {copying ? <Spinner className="w-6 h-8" /> : <FiCopy className="w-6 h-8 stroke-white" />}
    </div>
  );
}

function SocialButtons({ username, summary }: { username: string; summary: string }) {
  const posthog = usePostHog();
  const icons = [
    {
      name: "Twitter",
      src: TwitterIcon.src,
      url: twitterCardShareUrl(username),
      color: "#000",
    },
    {
      name: "LinkedIn",
      src: LinkinIcon.src,
      url: linkedinCardShareUrl(username, summary),
      color: "#3e50b0",
    },
  ];

  return (
    <div>
      <div className="flex justify-center text-white text-xs mb-2">Share your DevCard</div>
      <div className="flex gap-2 justify-center">
        {icons.map((icon) => (
          <a
            key={icon.src}
            href={icon.url}
            className="rounded-full w-10 h-10 grid p-2.5 place-content-center border hover:opacity-80 transition-all"
            style={{ backgroundColor: icon.color, borderColor: "rgba(255,255,255,0.3)" }}
            target="_blank"
            onClick={() => posthog.capture("DevCard share link clicked", { platform: icon.name, username })}
          >
            <Image
              src={icon.src}
              alt={icon.name}
              width={icon.name === "Twitter" ? 14 : 24}
              height={icon.name === "Twitter" ? 14 : 24}
            />
          </a>
        ))}

        <CopyButton username={username} />
      </div>
    </div>
  );
}
