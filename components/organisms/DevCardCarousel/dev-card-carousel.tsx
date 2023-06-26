import cntl from "cntl";
import DevCard, { DevCardProps } from "components/molecules/DevCard/dev-card";
import { animated, to, useSprings } from "react-spring";
import { useGesture } from "@use-gesture/react";
import { useCallback, useEffect, useState } from "react";
import { useKey, useKeyPress } from "react-use";

export interface DevCardCarouselProps {
  cards: DevCardProps[];
  onSelect?: (username: string) => void;
}

const startTo = (index: number, delay = false) => ({
  x: -50 * index,
  scale: 1 - index * 0.1,
  delay: delay ? index * 100 : 0,
  zIndex: 100 - index,
  coverOpacity: index * 0.1,
  immediate: (key: string) => key === "zIndex",
});

const startFrom = (_i: number) => ({ x: 0, scale: 1, y: 0, zIndex: 0, coverOpacity: 0 });

const transform = (x: number, y: number, s: number) => `translate(${x}px, ${y}px) scale(${s})`;

export default function DevCardCarousel(props: DevCardCarouselProps) {
  const [cardOrder, setCardOrder] = useState(props.cards.map((card, index) => index));
  const [springProps, api] = useSprings(props.cards.length, (i: number) => ({
    ...startTo(i, true),
    from: startFrom(i),
  })); // Create a bunch of springs using the helpers above

  const bind = useGesture({
    onHover: (state) => {
      const hoverIndex = state.args[0];
      api.start((i) => {
        // move the card up in y value while hovering
        return { y: state.hovering && i === hoverIndex ? -20 : 0 };
      });
    },
  });

  const handleSelect = useCallback(
    (cardOrderIndex: number) => {
      const cardIndex = cardOrder[cardOrderIndex];
      props.onSelect?.(props.cards[cardIndex].username);
      // take all cards above the clicked card and move them down
      setCardOrder((cards) => {
        const cardsAfterIndex = cards.slice(cardOrderIndex);
        const cardsBeforeIndexInclusive = cards.slice(0, cardOrderIndex);

        return [...cardsAfterIndex, ...cardsBeforeIndexInclusive];
      });
    },
    [cardOrder, props, setCardOrder]
  );

  const [keyLeftIsPressed] = useKeyPress("ArrowLeft");
  const [keyRightIsPressed] = useKeyPress("ArrowRight");

  useKey(
    "ArrowRight",
    () => {
      handleSelect(cardOrder.length - 1);
    },
    {},
    [handleSelect]
  );
  useKey(
    "ArrowLeft",
    () => {
      handleSelect(1);
    },
    {},
    [handleSelect]
  );

  function handleClick(cardOrderIndex: number) {
    handleSelect(cardOrderIndex);
  }

  useEffect(() => {
    api.start((i) => {
      const newIndex = cardOrder.indexOf(i);
      return { ...startTo(newIndex) };
    });
  }, [cardOrder, api]);



  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-2 text-white">
        <ArrowIndicator direction="left" isActive={keyLeftIsPressed} />
        <ArrowIndicator direction="right" isActive={keyRightIsPressed} />
      </div>
      <div className="grid place-content-center">
        {springProps.map(({ x, y, scale, zIndex, coverOpacity }, index) => {
          const cardProps = props.cards[index];
          const cardOrderIndex = cardOrder.indexOf(index);
          const className = cntl`
            DevCardCarousel-card
            rounded-3xl
            left-0
            top-0
            w-full
            h-full
            relative
            cursor-pointer
          `;
          return (
            <animated.div
              {...bind(index)}
              key={cardProps.username}
              className={className}
              role="button"
              title={cardProps.username}
              style={{
                gridArea: "1 / 1",
                zIndex: zIndex,
                transform: to([x, y, scale], transform),
                transformOrigin: "left center",
              }}
            >
              <DevCard isInteractive={index === cardOrder[0]} {...cardProps} />
              <animated.div
                className="DevCardCarousel-darken absolute left-0 right-0 top-0 bottom-0 bg-black rounded-3xl z-10"
                title={`Select @${cardProps.username}`}
                style={{ opacity: coverOpacity, pointerEvents: index === cardOrder[0] ? "none" : "auto" }}
                onClick={() => {
                  handleClick(cardOrderIndex);
                }}
              ></animated.div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

const ArrowIndicator = ({direction, isActive}: { direction: "left" | "right", isActive: boolean}) => {
  const baseClass = cntl`
    grid
    rounded-md
    border
    w-6
    h-6
    text-xs
    border-white
    cursor-default
    place-content-center
    ${isActive ? "opacity-100" : "opacity-40"}
  `;

  const text = direction === "left" ? "◀" : "▶";

  return (
    <div className={baseClass}>
      {text}
    </div>
  );

};
