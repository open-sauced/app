import Link from "next/link";
import FullHeightContainer from "components/atoms/FullHeightContainer/full-height-container";
import HeaderLogo from "components/molecules/HeaderLogo/header-logo";
import BubbleBG from "../img/bubble-bg.svg";

export default function Custom500() {
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
        </div>
        <main className="grid md:grid-cols-2 place-content-center py-6">
          <div className="text-center px-6 relative z-10">
            <h1 className="text-8xl font-bold mb-2">500</h1>
            <div className="text-3xl mb-2">uh oh! looks like there&apos;s an issue with the pizza oven</div>
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
            ></div>
          </div>
        </main>
      </div>
    </FullHeightContainer>
  );
}
