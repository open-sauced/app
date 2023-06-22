/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DevCardCarousel from "./dev-card-carousel";
import { STUB_DEV_CARDS } from "components/organisms/DevCardCarousel/stubData";

describe("DevCardCarousel", () => {
  it("should render", () => {
    render(<DevCardCarousel cards={[...STUB_DEV_CARDS]} />);
  });

  describe("when the user clicks on a card", () => {
    it("should trigger the onSelect", () => {
      const onSelect = jest.fn();
      render(<DevCardCarousel cards={[...STUB_DEV_CARDS]} onSelect={onSelect} />);
      const thirdDevCard = screen.getByTitle(STUB_DEV_CARDS[2].username);
      userEvent.click(thirdDevCard);
      expect(onSelect).toHaveBeenCalledWith(STUB_DEV_CARDS[2].username);
    });
  });

  describe("when the user uses the arrow keys", () => {
    describe("when the user presses the right arrow key", () => {
      it("should select last card", () => {
        const onSelect = jest.fn();
        render(<DevCardCarousel cards={[...STUB_DEV_CARDS]} onSelect={onSelect} />);
        userEvent.keyboard("{arrowright}");
        expect(onSelect).toHaveBeenCalledWith(STUB_DEV_CARDS.slice(-1)[0].username);
      });
    });
    describe("when the user presses the left arrow key", () => {
      it("should select the second card", () => {
        const onSelect = jest.fn();
        render(<DevCardCarousel cards={[...STUB_DEV_CARDS]} onSelect={onSelect} />);
        userEvent.keyboard("{arrowleft}");
        expect(onSelect).toHaveBeenCalledWith(STUB_DEV_CARDS[1].username);
      });
    });
  });
});
