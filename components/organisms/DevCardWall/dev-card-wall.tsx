import { useKey, useKeyPress, useMeasure } from "react-use";
import { useCallback, useEffect, useState } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import { useGesture } from "@use-gesture/react";
import { useOutsideClickRef } from "rooks";
import DevCard, { DevCardProps } from "components/molecules/DevCard/dev-card";
import Button from "components/atoms/Button/button";
import ChevronLeft from "../../../img/icons/chevron-left.svg";

const LOADING_TILES_COUNT = 20;

const cellHeight = 348;
const cellWidth = 245;
const gapSize = 20;

const coordinatesForIndex = (height: number) => (index: number) => {
  const extraYOffset = cellHeight * 0.4;
  const tilesPerColumn = Math.floor((height - gapSize) / (cellHeight + gapSize)) + 1;
  const columnRow = index % tilesPerColumn;
  const columnIsOdd = Math.floor(index / tilesPerColumn) % 2 === 1;
  const yOffsetForCell = columnIsOdd ? 0 : extraYOffset;
  const y = columnRow * (cellHeight + gapSize) - yOffsetForCell;
  const x = Math.floor(index / tilesPerColumn) * (cellWidth + gapSize);
  return {
    x,
    y,
  };
};

interface DevCardWallProps {
  cards: DevCardProps[];
  isLoading?: boolean;
  initialCardIndex?: number;
}

export default function DevCardWall({ isLoading = false, cards, initialCardIndex }: DevCardWallProps) {
  const [containerRef, { height }] = useMeasure<HTMLDivElement>();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [outsideClickRef] = useOutsideClickRef(() => {
    setActiveCardIndex(null);
  });

  const [leftArrowIsPressed] = useKeyPress("ArrowLeft");
  const [downArrowIsPressed] = useKeyPress("ArrowDown");

  const pulseAnimation = useSpring({
    from: {
      opacity: 0.1,
    },
    to: isLoading
      ? [
          {
            opacity: 0.2,
          },
          {
            opacity: 0.1,
          },
        ]
      : { opacity: 0 },
    loop: isLoading,
    config: {
      duration: 1000,
    },
  });

  const nextButtonActiveStyle = {
    opacity: 0.8,
    translateY: 4,
    config: {
      duration: 100,
    },
  };

  const nextButtonDefaultStyle = {
    opacity: 1,
    translateY: 0,
  };

  const [nextButtonSpringStyle, nextButtonSpringApi] = useSpring(
    () => (leftArrowIsPressed ? nextButtonActiveStyle : nextButtonDefaultStyle),
    [leftArrowIsPressed]
  );

  const bindHover = useGesture({
    onHover: (state) => {
      const hoverIndex = state.args[0];
      // setHoverIndex(hoverIndex);
      cardApi.start((i) => {
        const hoverStyle = { translateY: -20 };
        const defaultStyle = { translateY: 0 };
        // move the card up in y value while hovering
        return state.hovering && i === hoverIndex && i !== activeCardIndex ? hoverStyle : defaultStyle;
      });
    },
  });

  const [cardSprings, cardApi] = useSprings(
    cards.length,
    (index) => ({
      from: {
        x: 0,
        y: 0,
        opacity: 1,
        translateY: 0,
        scale: 1,
        zIndex: 0,
      },
      to: {
        scale: 1,
        opacity: 1,
        zIndex: 0,
        delay: index * 100,
        ...coordinatesForIndex(height)(index),
      },
    }),
    [cards, height]
  );

  const [cardButtonSprings, cardButtonApi] = useSprings(
    cards.length,
    (index) => ({
      opacity: 0,
      translateY: 50,
    }),
    [cards, activeCardIndex]
  );

  useEffect(() => {
    (async function animate() {
      cardApi.start((i) => {
        return i === activeCardIndex
          ? {
              scale: 1.1,
              translateY: 0,
              opacity: 1,
              zIndex: 49,
              x: 0,
              y: height / 2 - cellHeight / 2,
              immediate: "zIndex",
            }
          : { scale: 1, translateY: 0, opacity: 1, zIndex: 0, ...coordinatesForIndex(height)(i), immediate: "zIndex" };
      });

      cardButtonApi.start((i) => {
        return i === activeCardIndex
          ? {
              opacity: 1,
              translateY: 0,
              delay: 250,
            }
          : {
              opacity: 0,
              translateY: 50,
            };
      });
    })();
  }, [activeCardIndex, cardApi, cardButtonApi, height]);

  useEffect(() => {
    if (initialCardIndex !== undefined) {
      setActiveCardIndex(initialCardIndex);
    }
  }, [initialCardIndex]);

  const nextCard = useCallback(() => {
    setActiveCardIndex((index) => {
      if (index === null) {
        return 0;
      }
      return (index + 1) % cards.length;
    });
  }, [cards]);

  useKey("ArrowLeft", nextCard, {}, [nextCard]);
  useKey("ArrowDown", nextCard, {}, [nextCard]);

  useEffect(() => {
    if (leftArrowIsPressed || downArrowIsPressed) {
      nextButtonSpringApi.start({
        opacity: 0.8,
        translateY: 4,
        config: {
          duration: 100,
        },
      });
    } else {
      nextButtonSpringApi.start({
        opacity: 1,
        translateY: 0,
      });
    }
  }, [leftArrowIsPressed, downArrowIsPressed, nextButtonSpringApi]);

  function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    nextCard();
  }

  const loadingSkeleton = Array.from({ length: LOADING_TILES_COUNT }, (_, i) => {
    const { x, y } = coordinatesForIndex(height)(i);
    return (
      <animated.div
        className={"grid absolute rounded-3xl bg-white"}
        key={i}
        style={{
          width: `${cellWidth}px`,
          height: `${cellHeight}px`,
          left: `${x}px`,
          top: `${y}px`,
          ...pulseAnimation,
        }}
      ></animated.div>
    );
  });

  const cardElements = cardSprings.map(({ x, y, translateY, scale, zIndex }, i) => {
    const cardProps = cards[i];
    const buttonSpring = cardButtonSprings[i];
    return (
      <animated.div
        {...bindHover(i)}
        className="grid absolute gap-3"
        key={i}
        onClick={(event) => {
          event.stopPropagation();
          setActiveCardIndex(i);
        }}
        style={{
          width: `${cellWidth}px`,
          height: `${cellHeight}px`,
          left: x.to((x) => `${x}px`),
          top: y.to((y) => `${y}px`),
          translateY: translateY.to((y) => `${y}px`),
          scale: scale,
          zIndex,
        }}
      >
        <DevCard key="card" isInteractive={i === activeCardIndex} hideProfileButton {...cardProps} />
        <animated.div key="button" className={"grid place-content-center"} style={{ ...buttonSpring }}>
          <Button variant="primary" href={`/user/${cardProps.username}`}>
            View Profile
          </Button>
        </animated.div>
      </animated.div>
    );
  });

  return (
    <div
      className="grid relative"
      ref={outsideClickRef}
      onClick={() => {
        setActiveCardIndex(null);
      }}
    >
      <div className="relative ml-20" ref={containerRef}>
        {/* card wall surface area, should extend beyond the top and bottom */}
        {/* {isLoadingUsernames ? loadingSkeleton : cardElements} */}
        {loadingSkeleton}
        {cardElements}
        <div
          style={{
            width: "calc(100% + 15px)",
            position: "absolute",
            top: 0,
            left: -15,
            bottom: 0,
            right: 0,
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)",
          }}
        ></div>
        <div
          style={{
            width: "calc(100% + 15px)",
            position: "absolute",
            top: 0,
            left: -15,
            zIndex: 2,
            pointerEvents: "none",
            height: "72.42614145%",
            background: "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 40%)",
          }}
        ></div>
      </div>
      <animated.button
        onClick={handleNextButtonClick}
        onMouseDown={(event) => nextButtonSpringApi.start(nextButtonActiveStyle)}
        onMouseUp={(event) => nextButtonSpringApi.start(nextButtonDefaultStyle)}
        className="rounded-md border border-amber-700 w-10 h-10 absolute left-0 top-1/2 block z-50 active:outline-none"
        style={{
          backgroundColor: "#271700",
          backgroundImage: `url(${ChevronLeft.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          ...nextButtonSpringStyle,
        }}
      ></animated.button>
    </div>
  );
}
