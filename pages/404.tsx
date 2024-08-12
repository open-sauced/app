import Link from "next/link";
import { useEffect, useState } from "react";
import FullHeightContainer from "components/atoms/FullHeightContainer/full-height-container";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import { useFetchTopContributors } from "lib/hooks/useFetchTopContributors";
import DevCardWall from "components/organisms/DevCardWall/dev-card-wall";
import BubbleBG from "../img/bubble-bg.svg";
import { UserDevStats } from "./u/[username]/card";

async function fetchUserData(username: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/devstats`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await response.json() as UserDevStats;
};

export default function Custom404() {
  const { data } = useFetchTopContributors({ limit: 20 });
  const [cards, setCards] = useState<UserDevStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialCardIndex, setInitialCardIndex] = useState<number | undefined>();

  useEffect(() => {
    async function loadCards() {
      const cardData = await Promise.all(data.map((user) => fetchUserData(user.login)));
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
          <HeaderLogo />
        </div>
        <main id="main" className="grid md:grid-cols-2 place-content-center py-6">
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

