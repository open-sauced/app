import Link from "next/link";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import FullHeightContainer from "components/atoms/FullHeightContainer/full-height-container";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import { useFetchTopContributors } from "lib/hooks/useFetchTopContributors";
import DevCardWall from "components/organisms/DevCardWall/dev-card-wall";
import { DevCardProps } from "components/molecules/DevCard/dev-card";
import { fetchContributorPRs } from "lib/hooks/api/useContributorPullRequests";
import { getRepoList } from "lib/hooks/useRepoList";
import getContributorPullRequestVelocity from "lib/utils/get-contributor-pr-velocity";
import getPercent from "lib/utils/get-percent";
import { getAvatarByUsername } from "lib/utils/github";
import BubbleBG from "../img/bubble-bg.svg";

export default function Custom404() {
  const { data } = useFetchTopContributors({ limit: 20 });
  const [cards, setCards] = useState<DevCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialCardIndex, setInitialCardIndex] = useState<number | undefined>();

  useEffect(() => {
    async function loadCards() {
      const cardData = await Promise.all(data.map((user) => getAllCardData(user.login)));
      // randomize cards
      cardData.sort(() => Math.random() - 0.5);
      setCards(cardData);
      setIsLoading(false);
      setTimeout(() => {
        setInitialCardIndex(0);
      }, 500);
    }

    loadCards();
  }, [data]);

  return (
    <FullHeightContainer className="text-white">
      <div
        className="grid relative w-full h-full md:pb-20 overflow-hidden max-w-screen"
        style={{
          background: `#010101 url(${BubbleBG.src}) no-repeat center center`,
          backgroundSize: "cover",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <div className="grid items-center justify-center place-content-start py-7 px-4 z-50 md:grid-flow-col  md:justify-between">
          <HeaderLogo withBg={false} />
          <Link
            href="/start"
            className="hidden md:flex items-center text-sm text-white border border-light-orange-8 py-2 px-3 rounded-lg hover:opacity-80"
          >
            Signup with Github
          </Link>
        </div>
        <main className="grid md:grid-cols-2 place-content-center py-6">
          <div className="text-center px-6 relative z-10">
            <h1 className="text-8xl font-bold mb-2">404</h1>
            <div className="text-3xl mb-2">uh oh page not found</div>
            <div className="mb-2">while you&apos;re here, you can check out some of our amazing contributors!</div>
            <Link href="/" className="text-orange-600 hover:text-orange-500">
              Take me home &rarr;
            </Link>
          </div>
          <div className="hidden md:grid">
            <div
              className="grid"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "50%",
              }}
            >
              <DevCardWall cards={cards} isLoading={isLoading} initialCardIndex={initialCardIndex} />
            </div>
          </div>
        </main>
      </div>
    </FullHeightContainer>
  );
}

async function getAllCardData(username: string): Promise<DevCardProps> {
  const [basicData, contributorData] = await Promise.all([
    fetchBasicCardData(username),
    fetchContributorCardData(username),
  ]);

  return {
    ...basicData,
    ...contributorData,
    isLoading: false,
  };
}

async function fetchUserData(username: string) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
    headers: {
      accept: "application/json",
    },
  });

  return (await req.json()) as DbUser;
}

async function fetchBasicCardData(username: string): Promise<DevCardProps> {
  const user = await fetchUserData(username);
  const githubAvatar = getAvatarByUsername(username, 300);

  const ageInDays = user.first_opened_pr_at ? differenceInDays(new Date(), new Date(user.first_opened_pr_at)) : 0;

  return {
    username,
    avatarURL: githubAvatar,
    name: user.name || username,
    bio: user.bio,
    age: ageInDays,
  };
}

async function fetchContributorCardData(
  username: string
): Promise<Pick<DevCardProps, "prs" | "prVelocity" | "prMergePercentage" | "repos">> {
  const { data, meta } = await fetchContributorPRs(username, undefined, "*", [], 100);
  const prs = data.length;
  const prVelocity = getContributorPullRequestVelocity(data);
  const prTotal = meta.itemCount;
  const mergedPrs = data.filter((prData) => prData.merged);
  const prMergePercentage = getPercent(prTotal, mergedPrs.length || 0);
  const repos = getRepoList(Array.from(new Set(data.map((prData) => prData.full_name))).join(",")).length;
  return {
    prs,
    prVelocity,
    prMergePercentage,
    repos,
  };
}
