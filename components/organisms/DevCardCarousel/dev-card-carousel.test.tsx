import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { STUB_USERNAMES, STUB_DEV_CARDS } from "./stubData";
import DevCardCarousel from "./dev-card-carousel";

describe("DevCardCarousel", () => {
  it("should render", () => {
    render(<DevCardCarousel usernames={STUB_USERNAMES} />);
  });

  describe("when the user clicks on a card", () => {
    it("should trigger the onSelect", async () => {
      const onSelect = vi.fn();
      render(<DevCardCarousel usernames={STUB_USERNAMES} onSelect={onSelect} />);
      const thirdDevCard = screen.getByTitle(`Select @${STUB_DEV_CARDS[2].login}`);
      await userEvent.click(thirdDevCard);
      expect(onSelect).toHaveBeenCalledWith(STUB_DEV_CARDS[2].login);
    });
  });

  describe("when the user uses the arrow keys", () => {
    describe("when the user presses the right arrow key", () => {
      it("should select last card", async () => {
        const onSelect = vi.fn();
        render(<DevCardCarousel usernames={STUB_USERNAMES} onSelect={onSelect} />);
        await userEvent.keyboard("{arrowright}");
        expect(onSelect).toHaveBeenCalledWith(STUB_DEV_CARDS.slice(-1)[0].login);
      });
    });
    describe("when the user presses the left arrow key", () => {
      it("should select the second card", async () => {
        const onSelect = vi.fn();
        render(<DevCardCarousel usernames={STUB_USERNAMES} onSelect={onSelect} />);
        await userEvent.keyboard("{arrowleft}");
        expect(onSelect).toHaveBeenCalledWith(STUB_DEV_CARDS[1].login);
      });
    });
  });
});
