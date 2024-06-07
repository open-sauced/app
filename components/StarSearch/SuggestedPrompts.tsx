import Card from "components/atoms/Card/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/shared/Carousel";

type SuggesionTypes = {
  title: string;
  prompt: string;
};

export function SuggestedPrompts({
  addPromptInput,
  isHorizontal,
  suggestions,
}: {
  addPromptInput: (prompt: string) => void;
  isHorizontal?: boolean;
  suggestions: SuggesionTypes[];
}) {
  return isHorizontal ? (
    <Carousel className="w-fit max-w-[32rem] my-0 mx-auto px-auto md:ml-[1.63rem] lg:mx-auto" orientation="horizontal">
      <CarouselContent>
        {suggestions.map((suggestion, i) => (
          <CarouselItem key={i} className="items-stretch">
            <button onClick={() => addPromptInput(suggestion.prompt)} className="h-full mx-auto">
              <Card className="w-[30rem] shadow-md border-none mx-auto h-full text-start !p-6 text-slate-600">
                <h3 className="text-sm font-semibold lg:text-base">{suggestion.title}</h3>
                <p className="text-xs lg:text-sm">{suggestion.prompt}</p>
              </Card>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ) : (
    <ul
      aria-label="suggested prompts"
      className="grid w-full max-w-3xl grid-cols-1 gap-2 lg:grid-cols-2 place-content-center lg:gap-4"
    >
      {suggestions.map((suggestion, i) => (
        <li key={i}>
          <button
            onClick={() => addPromptInput(suggestion.prompt)}
            aria-labelledby={`prompt-label-${i}`}
            aria-describedby={`prompt-description-${i}`}
            className="w-full h-full"
          >
            <Card className="shadow-md border-none text-start !p-6 text-slate-600">
              <span id={`prompt-label-${i}`} className="text-sm font-semibold lg:text-base">
                {suggestion.title}
              </span>
              <p id={`prompt-description-${i}`} className="text-xs lg:text-sm">
                {suggestion.prompt}
              </p>
            </Card>
          </button>
        </li>
      ))}
    </ul>
  );
}
