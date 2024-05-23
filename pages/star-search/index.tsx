import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { Fragment, useEffect, useRef, useState } from "react";

import Image from "next/image";
import Markdown from "react-markdown";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BsArrowUpShort } from "react-icons/bs";
import { ThumbsdownIcon, ThumbsupIcon, XCircleIcon } from "@primer/octicons-react";
import clsx from "clsx";
import * as Sentry from "@sentry/nextjs";
import remarkGfm from "remark-gfm";
import Card from "components/atoms/Card/card";
import ProfileLayout from "layouts/profile";
import { getAvatarById } from "lib/utils/github";
import { Drawer } from "components/shared/Drawer";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import SEO from "layouts/SEO/SEO";
import {
  StarSearchFeedbackAnalytic,
  StarSearchPromptAnalytic,
  useStarSearchFeedback,
} from "lib/hooks/useStarSearchFeedback";
import { useToast } from "lib/hooks/useToast";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/shared/Carousel";
import { StarSearchLoader } from "components/StarSearch/StarSearchLoader";
import StarSearchLoginModal from "components/StarSearch/LoginModal";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

export interface WidgetDefinition {
  name: string;
  arguments?: Record<string, Record<string, any>>;
}

type Author = "You" | "StarSearch";

const componentRegistry = new Map<string, Function>();

const SUGGESTIONS = [
  {
    title: "Get information on contributor activity",
    prompt: "What type of pull requests has @brandonroberts worked on?",
  },
  {
    title: "Identify key contributors",
    prompt: "Who are the most prevalent contributors to the TypeScript ecosystem?",
  },
  {
    title: "Find contributors based on their work",
    prompt: "Show me the lottery factor for contributors in the remix-run/react-router project?",
  },
  {
    title: "Find experts",
    prompt: "Who are the best developers that know Tailwind and are interested in Rust?",
  },
];

type SuggesionTypes = (typeof SUGGESTIONS)[number];

interface ChatAvatarProps {
  author: Author;
  userId?: number;
}

function ChatAvatar({ author, userId }: ChatAvatarProps) {
  switch (author) {
    case "You":
      return (
        <Image
          src={getAvatarById(`${userId}`)}
          alt="Your profile picture"
          width={32}
          height={32}
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
        />
      );
    case "StarSearch":
      return (
        <div className="bg-gradient-to-br from-sauced-orange to-amber-400 px-1.5 py-1 lg:p-2 rounded-full w-max">
          <Image
            src="/assets/star-search-logo-white.svg"
            alt="StarSearch logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
      );
  }
}

async function updateComponentRegistry(name: string) {
  if (componentRegistry.has(name)) {
    return;
  }

  try {
    let component;

    switch (name) {
      case "renderLottoFactor":
        component = (await import("components/StarSearch/Widgets/LotteryFactorWidget")).default;
        break;
      default:
        break;
    }

    if (component) {
      componentRegistry.set(name, component);
    }
  } catch (error) {
    Sentry.captureException(
      new Error(`Unable to dynamically import the widget component for StarSearch. Widget name: ${name}`, {
        cause: error,
      })
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = Number(session?.user.user_metadata.sub);

  const ogImageUrl = `${new URL(
    "/assets/og-images/star-search-og-image.png",
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  )}`;

  return { props: { userId, ogImageUrl } };
}

type StarSearchPageProps = {
  userId: number;
  ogImageUrl: string;
};

type StarSearchChat = { author: "You"; content: string } | { author: "StarSearch"; content: string | WidgetDefinition };

/**
 * This function renders a StarSearch widget component based on the widget definition provided.
 * The function will look up the widget component in the component registry and render it with the provided arguments (component props).
 *
 * @param widgetDefinition - The widget definition object that contains the name of the widget and the arguments to pass to the widget.
 *
 * @returns The rendered widget component or null if the widget component is not found.
 *
 */
function StarSearchWidget({ widgetDefinition }: { widgetDefinition: WidgetDefinition }) {
  try {
    const Component = componentRegistry.get(widgetDefinition.name);
    const componentToRender = Component ? <Component {...widgetDefinition.arguments} /> : null;

    if (componentToRender === null) {
      throw new Error(`Component ${widgetDefinition.name} not found in registry`);
    }

    return (
      <div className="w-full lg:w-1/2 mx-auto pt-2" style={{ maxWidth: "440px" }}>
        {componentToRender}
      </div>
    );
  } catch (error: unknown) {
    Sentry.captureException(
      new Error(
        `Unable to render dynamic widget in StarSearch. Widget definition: ${JSON.stringify(widgetDefinition)}`,
        {
          cause: error,
        }
      )
    );

    // Returning null because widgets enhance the experience but are not critical to the functionality.
    return null;
  }
}

export default function StarSearchPage({ userId, ogImageUrl }: StarSearchPageProps) {
  const [starSearchState, setStarSearchState] = useState<"initial" | "chat">("initial");
  const [chat, setChat] = useState<StarSearchChat[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ranOnce, setRanOnce] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { feedback, prompt } = useStarSearchFeedback();
  const { toast } = useToast();
  const { sessionToken: bearerToken } = useSupabaseAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  function registerPrompt(promptInput: StarSearchPromptAnalytic) {
    prompt({
      promptContent: promptInput.promptContent,
      promptResponse: promptInput.promptResponse,
    });
  }

  function registerFeedback(feedbackType: StarSearchFeedbackAnalytic["feedback"]) {
    feedback({
      feedback: feedbackType,
      promptContent: chat
        .filter(({ author }) => author === "You")
        .map(({ content }) => {
          if (typeof content !== "string") {
            return JSON.stringify(content);
          }

          return content;
        }),
      promptResponse: chat
        .filter(({ author }) => author === "StarSearch")
        .map(({ content }) => {
          if (typeof content !== "string") {
            return JSON.stringify(content);
          }

          return content;
        }),
    });
    toast({ description: "Thank you for your feedback!", variant: "success" });
  }

  function addPromptInput(prompt: string) {
    if (!bearerToken) {
      setLoginModalOpen(true);
      return;
    }

    if (!inputRef.current?.form) {
      return;
    }

    inputRef.current.value = prompt;
    const { form } = inputRef.current;

    if (typeof form.requestSubmit === "function") {
      form.requestSubmit();
    } else {
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const submitPrompt = async (prompt: string) => {
    if (!bearerToken) {
      setLoginModalOpen(true);
      return;
    }

    if (isRunning) {
      return;
    }

    if (!ranOnce) {
      setRanOnce(true);
    }

    if (starSearchState === "initial") {
      setStarSearchState("chat");
    }
    setIsRunning(true); // disables input

    // add user prompt to history
    setChat((history) => {
      const temp = [...history];
      temp.push({ author: "You", content: prompt });
      return temp;
    });

    // get ReadableStream from API
    const baseUrl = new URL(process.env.NEXT_PUBLIC_API_URL!);
    const response = await fetch(`${baseUrl}/star-search/stream`, {
      method: "POST",
      body: JSON.stringify({
        query_text: prompt,
      }),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (response.status !== 200) {
      setChat((history) => {
        const temp = [...history];
        temp.push({ author: "StarSearch", content: "There's been an error. Try again." });
        return temp;
      });
      setIsRunning(false); // enables input
      return;
    }

    const decoder = new TextDecoderStream();
    const reader = response.body?.pipeThrough(decoder).getReader();
    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        setIsRunning(false); // enables input

        registerPrompt({
          promptContent: prompt,
          promptResponse:
            chat
              .slice(1)
              // There can be multiple responses because of widgets, so we need to serialize the widget data
              .map((c) => (typeof c.content === "string" ? c.content : JSON.stringify(c.content)))
              .join("\n") || "No response captured",
        });
        return;
      }

      /**
        Content has this shape where each chunk has the concatenated "content.parts"
        that make up the whole message as it flows in.

        id: 1
        data: {"id":"123-abc","author":"manager","iso_time":"2024-05-20T20:30:42.0","content":{"type":"content","parts":["I"]},"status":"in_progress","error":null}

        id: 2
        data: {"id":"123-abc","author":"manager","iso_time":"2024-05-20T20:30:43.0","content":{"type":"content","parts":["I am"]},"status":"in_progress","error":null}

        id: 3
        data: {"id":"123-abc","author":"manager","iso_time":"2024-05-20T20:30:44.0","content":{"type":"content","parts":["I am StarSearch"]},"status":"in_progress","error":null}

        ... etc. etc.

        id: 5
        data: {"id":"123-abc","author":"manager","iso_time":"2024-05-20T20:30:45.0","content":{"type":"content","parts":["I am StarSearch. Witness me."]},"status":"done","error":null}


        If the content.type is "function_call", we know we need to render a component.
        if the content.type is "content", we render the markdown as HTML.
       */

      const values = value.split("\n");

      values.forEach(async (v) => {
        if (v.startsWith("id:")) {
          // this is just the id of the SSE from the response.
          return;
        }

        if (v.startsWith("data:")) {
          /*
           * regex for capturing star-search stream events JSON:
           * data:\s(?<result>.*)
           *
           * The aim of this regex is to capture all characters coming from
           * the star-search server side events.
           *
           * 'data:' - matches the "data:" characters explicitly.
           * '\s'    - matches any whitespace that follows the data. In most cases, this is a single space ' '.
           *           So, for example, this captures 'data: '.
           *
           * '(?<result>.*)' - named capture group "result".
           *    ├────── '?<result>'  - capture group is named "result".
           *    └────── '.*'         - matches any characters (including zero characters) after the "data:\s" segment.
           *                           Should capture ALL of the json object on the line after 'data: '.
           *
           * Example: data: { id: "abc123" }
           * - Captures the 'data: ' (including the space)
           * - The named capture group "result" gets the entire JSON object "{ id: \"abc123\" }"
           *   as a string that can be parsed to an object.
           */

          const matched = v.match(/data:\s(?<result>.*)/);

          if (!matched || !matched.groups) {
            return;
          }

          try {
            let jsonContent: WidgetDefinition;
            const { result } = matched.groups;

            // deserialize the json dump from the payload
            const payload = JSON.parse(result) as StarSearchPayload;

            // skip over cases where the payload is somehow malformed or missing content altogether
            if (!payload || !payload.content || payload.content.parts.length === 0) {
              Sentry.captureException(
                new Error(`Parsed and rejected malformed JSON for StarSearch. JSON payload: ${v}`)
              );
              return;
            }

            // function_call means we're loading a widget definition for the enriched UI
            if (payload.content.type === "function_call") {
              jsonContent = JSON.parse(payload.content.parts[0]);
              jsonContent.arguments = JSON.parse(jsonContent.arguments as any) as WidgetDefinition["arguments"];
              await updateComponentRegistry(jsonContent.name);

              setChat((chat) => {
                const updatedChat = [...chat];

                // create a new chat item because the widget will require it's own chatbox.
                updatedChat.push({
                  author: "StarSearch",
                  content: jsonContent,
                });

                return updatedChat;
              });
            }

            if (payload.content.type === "content" || payload.content.type === "final") {
              setChat((chat) => {
                const updatedChat = [...chat];

                let changes = updatedChat.at(-1);

                if (changes) {
                  if (!changes || typeof changes.content !== "string") {
                    // if the previous item in the chats was a widget, we need to add a new chat item.
                    updatedChat.push({
                      author: "StarSearch",
                      content: "",
                    });
                    changes = updatedChat.at(-1);
                  }

                  if (changes) {
                    // set the content that was reserved by the stream event
                    changes.content = payload.content.parts[0];
                  }
                }

                return updatedChat;
              });
            }
          } catch (error) {
            Sentry.captureException(
              new Error(`Failed to parse JSON for StarSearch. JSON payload: ${v}`, { cause: error })
            );
          }

          return;
        }
      });
    }
  };

  const renderState = () => {
    switch (starSearchState) {
      case "initial":
        return (
          <div className="h-[calc(100vh-240px)] md:h-fit grid place-content-center text-center items-center gap-4">
            <Header />
            {isMobile ? null : <SuggestionBoxes addPromptInput={addPromptInput} suggestions={SUGGESTIONS} />}
          </div>
        );
      case "chat":
        // We only want to process the chat messages that are either strings or valid widgets.
        // The API currently sends back other function calls that we currently do not support or don't need to support,
        // so we filter those out by checking if they are in the component registry.
        const chatMessagesToProcess = chat.filter(
          (c) => typeof c.content === "string" || componentRegistry.has(c.content.name)
        );
        const loaderIndex = chatMessagesToProcess.findLastIndex((c) => c.author === "You");
        let heightToRemove = 300;

        if (!isRunning && !isMobile && ranOnce) {
          heightToRemove = showSuggestions ? 470 : 400;
        }

        return (
          <>
            <div
              aria-live="polite"
              className="flex flex-col w-full max-w-xl lg:max-w-5xl lg:px-8 mx-auto mb-4"
              style={{ height: `calc(100vh - ${heightToRemove}px)` }}
            >
              <ScrollArea className="flex grow" asChild={true}>
                <ul>
                  {chatMessagesToProcess.map((message, i, messages) => {
                    if (loaderIndex === i && isRunning && messages.length - 1 === i) {
                      return (
                        <Fragment key={i}>
                          <Chatbox userId={userId} message={message} />
                          <li className="flex gap-2 my-4 w-max items-center">
                            <ChatAvatar author="StarSearch" userId={userId} />
                            <StarSearchLoader />
                          </li>
                        </Fragment>
                      );
                    } else {
                      return <Chatbox key={i} userId={userId} message={message} />;
                    }
                  })}
                </ul>
                <div ref={scrollRef} />
              </ScrollArea>
              <div className={clsx("grid gap-2 justify-items-end self-end mt-2", isRunning && "invisible")}>
                <button
                  type="button"
                  className="flex gap-2 items-center hover:text-sauced-orange text-slate-600"
                  onClick={() => {
                    setStarSearchState("initial");
                    setChat([]);
                  }}
                >
                  Clear chat history
                  <TrashIcon width={16} height={16} />
                </button>

                <div className="flex justify-end mb-4 gap-2 text-slate-600">
                  <span>Was this response useful?</span>
                  <button
                    type="button"
                    className="flex gap-2 items-center hover:text-sauced-orange"
                    onClick={() => {
                      registerFeedback("positive");
                    }}
                  >
                    <span className="sr-only">Thumbs up</span>
                    <ThumbsupIcon size={16} />
                  </button>
                  <button
                    type="button"
                    className="flex gap-2 items-center hover:text-sauced-orange"
                    onClick={() => {
                      registerFeedback("negative");
                    }}
                  >
                    <span className="sr-only">Thumbs down</span>
                    <ThumbsdownIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <SEO
        title="OpenSauced Insights - StarSearch"
        description="Copilot, but for git history"
        image={ogImageUrl}
        twitterCard="summary_large_image"
      />
      <ProfileLayout showFooter={false}>
        <div className="star-search relative -mt-1.5 flex flex-col p-10 lg:p-16 justify-between items-center w-full h-full grow bg-slate-50">
          {renderState()}
          <div className="sticky bottom-2 md:bottom-4 w-full">
            {!isRunning &&
              (isMobile ? (
                <Drawer
                  title="Choose a suggestion"
                  description="You can customize the prompt after selection"
                  showCloseButton
                  trigger={
                    <button
                      onClick={() => setShowSuggestions(!showSuggestions)}
                      className="mx-auto w-fit flex gap-1 shadow-xs items-center text-slate-700 font-medium bg-slate-100 !border-2 !border-slate-300 px-4 py-1 rounded-full mb-2 md:mb-4"
                    >
                      Need inspiration?
                      <BsArrowUpShort className="text-2xl" />
                    </button>
                  }
                >
                  <SuggestionBoxes addPromptInput={addPromptInput} suggestions={SUGGESTIONS} />
                </Drawer>
              ) : (
                <>
                  {!showSuggestions && ranOnce && (
                    <button
                      onClick={() => setShowSuggestions(!showSuggestions)}
                      className="mx-auto w-fit flex gap-1 shadow-xs items-center text-slate-700 font-medium bg-slate-100 !border-2 !border-slate-300 px-4 py-1 rounded-full mb-2 md:mb-4"
                    >
                      Need inspiration?
                      <BsArrowUpShort className="text-2xl" />
                    </button>
                  )}
                </>
              ))}
            {!isMobile && showSuggestions && (
              <div className="relative flex flex-col gap-2 mb-4 w-fit mx-auto">
                <button
                  onClick={() => {
                    setShowSuggestions(false);
                    inputRef.current?.focus();
                  }}
                  className="absolute flex gap-2 w-fit self-end -right-5 -top-3"
                >
                  <XCircleIcon className="w-5 h-5 text-slate-400" aria-label="Close suggestions" />
                </button>
                <SuggestionBoxes
                  isHorizontal
                  addPromptInput={(prompt) => {
                    addPromptInput(prompt);
                    setShowSuggestions(false);
                  }}
                  suggestions={SUGGESTIONS}
                />
              </div>
            )}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);
                submitPrompt(formData.get("prompt") as string);
                form.reset();
              }}
              className="bg-white flex justify-between mx-0.5 lg:mx-auto lg:max-w-3xl px-1 py-[3px] rounded-xl bg-gradient-to-r from-sauced-orange via-amber-400 to-sauced-orange"
            >
              <input
                required
                type="text"
                name="prompt"
                ref={inputRef}
                disabled={isRunning}
                placeholder="Ask a question"
                className="p-4 border bg-white focus:outline-none grow rounded-l-lg border-none"
                onClick={() => {
                  if (!bearerToken) {
                    setLoginModalOpen(true);
                  }
                }}
              />
              <button type="submit" disabled={isRunning} className="bg-white p-2 rounded-r-lg">
                <span className="sr-only">Submit your question to StarSearch</span>
                <MdOutlineSubdirectoryArrowRight className="rounded-lg w-10 h-10 p-2 bg-light-orange-3 text-light-orange-10" />
              </button>
            </form>
            <p className="text-sm text-slate-400 text-center py-2">
              StarSearch may generate incorrect responses, double check important information
            </p>
          </div>
          <div className="absolute inset-x-0 top-0 h-[125px] w-full translate-y-[-100%] lg:translate-y-[-50%] rounded-full bg-gradient-to-r from-light-red-10 via-sauced-orange to-amber-400 opacity-40 blur-[40px]"></div>
        </div>
        <StarSearchLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      </ProfileLayout>
    </>
  );
}

function Header() {
  return (
    <div className="flex flex-col text-center items-center gap-2 lg:gap-4 lg:pt-8">
      <div className="flex gap-2 items-center">
        <Image src="/assets/star-search-logo.svg" alt="" width={40} height={40} />
        <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sauced-orange to-amber-400">
          StarSearch
        </h1>
      </div>
      <h2 className="text-3xl lg:text-4xl font-semibold text-slate-600 pt-1">Copilot, but for git history</h2>
    </div>
  );
}

function SuggestionBoxes({
  addPromptInput,
  isHorizontal,
  suggestions,
}: {
  addPromptInput: (prompt: string) => void;
  isHorizontal?: boolean;
  suggestions: SuggesionTypes[];
}) {
  return isHorizontal ? (
    <Carousel className="w-fit max-w-[32rem] my-0 mx-auto px-auto" orientation="horizontal">
      <CarouselContent>
        {suggestions.map((suggestion, i) => (
          <CarouselItem key={i} className="items-stretch">
            <button onClick={() => addPromptInput(suggestion.prompt)} className="h-full mx-auto">
              <Card className="w-[30rem] shadow-md border-none mx-auto h-full text-start !p-6 text-slate-600">
                <h3 className="text-sm lg:text-base font-semibold">{suggestion.title}</h3>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center gap-2 lg:gap-4 w-full max-w-3xl">
      {suggestions.map((suggestion, i) => (
        <button 
          key={i} 
          onClick={() => addPromptInput(suggestion.prompt)}
          aria-labelledby={`prompt-label-${i}`}
          aria-describedby={`prompt-description-${i}`}
        >
          <Card className="w-fit h-fit shadow-md border-none text-start !p-6 text-slate-600">
            <span id={`prompt-label-${i}`} className="text-sm lg:text-base font-semibold">
              {suggestion.title}
            </span>
            <p id={`prompt-description-${i}`} className="text-xs lg:text-sm">
              {suggestion.prompt}
            </p>
          </Card>
        </button>
      ))}
    </div>
  );
}

function Chatbox({ message, userId }: { message: StarSearchChat; userId?: number }) {
  let content;

  if (typeof message.content == "string") {
    // Breaking all words so that the rendered markdown doesn't overflow the container
    // in certain cases where the content is a long string.
    content = (
      <Markdown remarkPlugins={[remarkGfm]} className="break-words prose">
        {message.content}
      </Markdown>
    );
  } else {
    if (!componentRegistry.has(message.content.name)) {
      return null;
    }

    content = <StarSearchWidget widgetDefinition={message.content} />;

    if (!content) {
      return null;
    }
  }

  return (
    <li className="grid gap-2 md:flex md:justify-center items-start my-4 w-full">
      <ChatAvatar author="StarSearch" userId={userId} />
      <Card className="flex flex-col grow bg-white p-2 lg:p-4 w-full max-w-xl lg:max-w-5xl [&_a]:text-sauced-orange [&_a:hover]:underline">
        <h3 className="font-semibold text-sauced-orange">{message.author}</h3>
        {content}
      </Card>
    </li>
  );
}
