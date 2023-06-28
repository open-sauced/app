import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import cntl from "cntl";
import { cardImageUrl, linkedinCardShareUrl, twitterCardShareUrl } from "lib/utils/urls";
import { getAvatarByUsername } from "lib/utils/github";
import { fetchContributorPRs } from "lib/hooks/api/useContributorPullRequests";
import getContributorPullRequestVelocity from "lib/utils/get-contributor-pr-velocity";
import { getRepoList } from "lib/hooks/useRepoList";
import getPercent from "lib/utils/get-percent";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import Button from "components/atoms/Button/button";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import DevCardCarousel, { DevCardCarouselProps } from "components/organisms/DevCardCarousel/dev-card-carousel";
import { DevCardProps } from "components/molecules/DevCard/dev-card";
import SEO from "layouts/SEO/SEO";
import BubbleBG from "../../../img/bubble-bg.svg";
import TwitterIcon from "../../../img/icons/social-twitter.svg";
import LinkinIcon from "../../../img/icons/social-linkedin.svg";
;
const ADDITIONAL_PROFILES_TO_LOAD = [
  "bdougie",
  "nickytonline",
  "brandonroberts",
  "bekahhw",
  "ogdev-01",
  "jpmcb",
  "gr2m",
  "joshuakgoldberg",
  "natemoo-re",
  "CBID2",
];

interface CardProps {
  username: string;
  cards: DevCardCarouselProps["cards"];
}

interface Params extends ParsedUrlQuery {
  username: string;
}

async function fetchUserData(username: string) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
    headers: {
      accept: "application/json",
    },
  });

  return (await req.json()) as DbUser;
}

async function fetchInitialCardData(username: string): Promise<DevCardProps> {
  const user = await fetchUserData(username);
  const githubAvatar = getAvatarByUsername(username, 300);

  const ageInDays = user.first_opened_pr_at
    ? Math.floor((Date.now() - Date.parse(user.first_opened_pr_at)) / 86400000)
    : 0;


  return {
    username,
    avatarURL: githubAvatar,
    name: user.name || username,
    bio: user.bio,
    age: ageInDays,
    isLoading: true,
  };
}

async function fetchRemainingCardData(
  username: string
): Promise<Pick<DevCardProps, "prs" | "prVelocity" | "prMergePercentage" | "contributions">> {
  const { data, meta } = await fetchContributorPRs(username, undefined, "*", [], 100);
  const prs = data.length;
  const prVelocity = getContributorPullRequestVelocity(data);
  const prTotal = meta.itemCount;
  const mergedPrs = data.filter((prData) => prData.merged);
  const prMergePercentage = getPercent(prTotal, mergedPrs.length || 0);
  const contributions = getRepoList(Array.from(new Set(data.map((prData) => prData.full_name))).join(",")).length;
  return {
    prs,
    prVelocity,
    prMergePercentage,
    contributions,
  };
}

export const getServerSideProps: GetServerSideProps<CardProps, Params> = async (context) => {
  const username = context?.params?.username as string | undefined;
  if (!username) {
    return {
      notFound: true,
    };
  }

  const uniqueUsernames = [...new Set([username, ...ADDITIONAL_PROFILES_TO_LOAD])];
  const cards = await Promise.all(uniqueUsernames.map(fetchInitialCardData));


  return {
    props: {
      username,
      cards,
    },
  };
};

const Card: NextPage<CardProps> = ({ username, cards }) => {
  const { user: loggedInUser } = useSupabaseAuth();
  const [selectedUserName, setSelectedUserName] = useState<string>(username);
  const iframeTransition = useTransition(selectedUserName, {
    from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
  });

  const [fullCardsData, setFullCardsData] = useState<DevCardCarouselProps["cards"]>(cards);
  const firstCard = fullCardsData.find((card) => card.username === username);
  const isViewingOwnProfile = loggedInUser?.user_metadata?.user_name === username;

  const socialSummary = `${firstCard?.bio || `${username} has connected their GitHub but has not added a bio.`}`;

  const ogImage = cardImageUrl(username);

  /**
   * for each of the cards we need to load additional data async because it's slow to block page load
   * to fetch all of them
   */
  useEffect(() => {
    cards.forEach(async (card) => {
      const cardData = await fetchRemainingCardData(card.username);
      setFullCardsData((prev) =>
        prev.map((c) => {
          if (c.username === card.username) {
            return {
              ...c,
              ...cardData,
              isLoading: false,
            };
          }

          return c;
        })
      );
    });
  }, [cards]);

  return (
    <div
      style={{
        background: `url(${BubbleBG.src}) no-repeat center center, linear-gradient(147deg, #212121 13.41%, #2E2E2E 86.8%)`,
        backgroundSize: "cover",
      }}
    >
      <SEO
        title={`${username} | OpenSauced`}
        description={socialSummary}
        image={ogImage}
        twitterCard="summary_large_image"
      />
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
          <div className="flex items-center justify-center md:justify-end">
            <div className="flex flex-col gap-10">
              <DevCardCarousel cards={fullCardsData} onSelect={(name) => setSelectedUserName(name)} />
              <div className="hidden md:flex align-self-stretch justify-center">
                {isViewingOwnProfile ? (
                  <SocialButtons username={username} summary={socialSummary} />
                ) : (
                  <Button variant="primary" className="justify-center" href="/start">
                    Create your own dev card!
                  </Button>
                )}
              </div>
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
                    <a className="absolute w-full h-full grid place-content-center z-20" href={`/user/${username}`}>
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
          {isViewingOwnProfile ? (
            <SocialButtons username={username} summary={socialSummary} />
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="primary" className="justify-center" href={`/user/${selectedUserName}`}>
              See Full Profile
              </Button>
              <Button variant="dark" className="justify-center" href="/start">
              Create your own dev card!
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Card;


function SocialButtons({username, summary} : {username: string, summary: string }) {
  const icons = [
    {
      name: "Twitter",
      src: TwitterIcon.src,
      url: twitterCardShareUrl(username),
      color: "#3eabfa",
    },
    {
      name: "LinkedIn",
      src: LinkinIcon.src,
      url: linkedinCardShareUrl(username, summary),
      color: "#3e50b0",
    },
  ];

  const linkStyle = cntl`
   rounded-full
   w-10
   h-10
   grid
   place-content-center
   border
   hover:opacity-80
   transition-all
  `;

  return (
    <div>
      <div className="text-white text-xs mb-2">Share your DevCard</div>
      <div className="flex gap-2 justify-center">
        {icons.map((icon) => (
          <a
            key={icon.src}
            href={icon.url}
            className={linkStyle}
            style={{ backgroundColor: icon.color, borderColor: "rgba(255,255,255,0.2)"}}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={icon.src} alt={icon.name} width={24} height={24} />
          </a>
        ))}
      </div>
    </div>
  );
}