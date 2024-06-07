import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BsArrowUpShort, BsLink45Deg, BsTwitterX } from "react-icons/bs";
import { ThumbsdownIcon, ThumbsupIcon, XCircleIcon } from "@primer/octicons-react";
import clsx from "clsx";
import { captureException } from "@sentry/nextjs";
import { HiOutlineShare } from "react-icons/hi";
import { FiLinkedin } from "react-icons/fi";
import { Drawer } from "components/shared/Drawer";
import {
  StarSearchFeedbackAnalytic,
  StarSearchPromptAnalytic,
  useStarSearchFeedback,
} from "lib/hooks/useStarSearchFeedback";
import { useToast } from "lib/hooks/useToast";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import { StarSearchLoader } from "components/StarSearch/StarSearchLoader";
import StarSearchLoginModal from "components/StarSearch/LoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import { writeToClipboard } from "lib/utils/write-to-clipboard";
import { shortenUrl } from "lib/utils/shorten-url";
import { ChatAvatar } from "./ChatAvatar";
import { WidgetDefinition } from "./StarSearchWidget";
import { Chatbox, StarSearchChatMessage } from "./Chatbox";
import { SuggestedPrompts } from "./SuggestedPrompts";

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

const componentRegistry = new Map<string, React.ComponentType<any>>();

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
    captureException(
      new Error(`Unable to dynamically import the widget component for StarSearch. Widget name: ${name}`, {
        cause: error,
      })
    );
  }
}

function getSharedPromptUrl(promptMessage: string | undefined) {
  if (!promptMessage) {
    return;
  }

  const params = new URLSearchParams();
  params.set("prompt", promptMessage);

  return new URL(`/star-search?${params}`, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
}

type StarSearchChatProps = {
  userId: number | undefined;
  sharedPrompt: string | null;
  bearerToken: string | undefined | null;
  isMobile: boolean;
};

export function StarSearchChat({ userId, sharedPrompt, bearerToken, isMobile }: StarSearchChatProps) {
  const [starSearchState, setStarSearchState] = useState<"initial" | "chat">("initial");
  const [chat, setChat] = useState<StarSearchChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ranOnce, setRanOnce] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { feedback, prompt } = useStarSearchFeedback();
  const { toast } = useToast();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [twitterShareUrl, setTwitterShareUrl] = useState<string | undefined>();
  const [linkedInShareUrl, setLinkedInShareUrl] = useState<string | undefined>();
  const promptMessage = chat[0]?.content as string | undefined; // First message is always the prompt
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    if (!promptMessage) {
      return;
    }

    const promptUrl = getSharedPromptUrl(promptMessage);
    let twitterUrl = "https://twitter.com/intent/tweet";
    let linkedinUrl = "https://www.linkedin.com/sharing/share-offsite/";
    const twitterParams = new URLSearchParams();
    const linkedinParams = new URLSearchParams();

    setTimeout(async () => {
      const shortUrl = await shortenUrl(`${promptUrl}`);

      twitterParams.set("text", `Here's my StarSearch prompt!\n\nTry it out for yourself. #StarSearch`);
      twitterParams.set("url", shortUrl);
      twitterUrl += `?${twitterParams.toString()}`;
      setTwitterShareUrl(twitterUrl);

      linkedinParams.set("url", shortUrl);
      linkedinUrl += `?${linkedinParams.toString()}`;
      setLinkedInShareUrl(linkedinUrl);
    }, 0);
  }, [promptMessage]);

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
    if (!inputRef.current?.form) {
      return;
    }

    inputRef.current.value = prompt;
    const { form } = inputRef.current;

    setTimeout(() => {
      if (typeof form.requestSubmit === "function") {
        form.requestSubmit();
      } else {
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      }
    });
  }

  useEffect(() => {
    if (!sharedPrompt || ranOnce) {
      return;
    }

    if (inputRef.current && !checkAuth) {
      addPromptInput(sharedPrompt);
      setShowSuggestions(false);
    }
  }, [sharedPrompt, inputRef.current, checkAuth]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const submitPrompt = async (prompt: string) => {
    if ((checkAuth && sharedPrompt && !bearerToken) || (!bearerToken && !sharedPrompt)) {
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
        const cannedMessage = `I am a chat bot that highlights open source contributors. Try asking about a contributor you know in the open source ecosystem or a GitHub project you use!

Need some ideas? Try hitting the **Need Inspiration?** button below!`;
        const temp = [...history];

        temp.push({ author: "StarSearch", content: cannedMessage });
        return temp;
      });
      setIsRunning(false); // enables input
      setCheckAuth(true);
      return;
    }

    const decoder = new TextDecoderStream();
    const reader = response.body?.pipeThrough(decoder).getReader();
    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        setIsRunning(false); // enables input
        setCheckAuth(true);

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

      const values = value?.split("\n") || [];

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
              captureException(new Error(`Parsed and rejected malformed JSON for StarSearch. JSON payload: ${v}`));
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

                if (updatedChat.length === 1) {
                  updatedChat.push({
                    author: "StarSearch",
                    content: payload.content.parts[0],
                  });

                  return updatedChat;
                }

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
            captureException(new Error(`Failed to parse JSON for StarSearch. JSON payload: ${v}`, { cause: error }));
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
            {sharedPrompt && !ranOnce ? null : (
              <>
                <Header />
                {isMobile ? null : <SuggestedPrompts addPromptInput={addPromptInput} suggestions={SUGGESTIONS} />}
              </>
            )}
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

        if (!isRunning && !isMobile && ranOnce && showSuggestions) {
          heightToRemove = 370;
        }

        return (
          <>
            <div className="flex flex-col w-full max-w-xl mx-auto mb-4 lg:max-w-5xl lg:px-8">
              <ScrollArea
                className="flex grow"
                asChild={true}
                style={{ maxHeight: `calc(100vh - ${heightToRemove}px)` }}
              >
                <section role="feed" aria-label="StarSearch conversation" aria-busy={isRunning} aria-setsize={-1}>
                  {chatMessagesToProcess.map((message, i, messages) => {
                    if (loaderIndex === i && isRunning && messages.length - 1 === i) {
                      return (
                        <Fragment key={i}>
                          <Chatbox userId={userId} message={message} componentRegistry={componentRegistry} />
                          <div className="flex items-center gap-2 my-4 w-max">
                            <ChatAvatar author="StarSearch" userId={userId} />
                            <StarSearchLoader />
                          </div>
                        </Fragment>
                      );
                    } else {
                      return (
                        <Chatbox key={i} userId={userId} message={message} componentRegistry={componentRegistry} />
                      );
                    }
                  })}
                </section>
                <div ref={scrollRef} />
              </ScrollArea>
              <div className={clsx("text-slate-600 flex gap-4 items-center self-end", isRunning && "invisible")}>
                <button
                  type="button"
                  className="flex items-center gap-2 hover:text-sauced-orange"
                  onClick={() => {
                    setStarSearchState("initial");
                    setChat([]);
                  }}
                >
                  Clear chat history
                  <TrashIcon width={18} height={18} />
                </button>
                <span className="flex gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-2 hover:text-sauced-orange"
                    onClick={() => {
                      registerFeedback("positive");
                    }}
                  >
                    <span className="sr-only">Thumbs up</span>
                    <ThumbsupIcon size={16} />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 hover:text-sauced-orange"
                    onClick={() => {
                      registerFeedback("negative");
                    }}
                  >
                    <span className="sr-only">Thumbs down</span>
                    <ThumbsdownIcon size={16} />
                  </button>
                  {promptMessage && (
                    <div className="flex items-center gap-2 pl-4 hover:text-sauced-orange">
                      <DropdownMenu open={dropdownOpen} modal={false}>
                        <DropdownMenuTrigger
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          aria-label="Share prompt options"
                        >
                          <HiOutlineShare width={22} height={22} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          ref={dropdownRef}
                          align="end"
                          className="flex flex-col gap-1 py-2 rounded-lg"
                        >
                          <DropdownMenuItem className="rounded-md">
                            <a
                              href={twitterShareUrl}
                              target="_blank"
                              onClick={() => {
                                setDropdownOpen(false);
                              }}
                              className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                            >
                              <BsTwitterX size={22} />
                              <span>Share to Twitter/X</span>
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-md">
                            <a
                              href={linkedInShareUrl}
                              target="_blank"
                              onClick={() => {
                                setDropdownOpen(false);
                              }}
                              className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                            >
                              <FiLinkedin size={22} />
                              <span>Share to LinkedIn</span>
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={async () => {
                              const shortUrl = await shortenUrl(`${getSharedPromptUrl(promptMessage)}`);
                              writeToClipboard(shortUrl);
                              setDropdownOpen(false);
                            }}
                            className="rounded-md"
                          >
                            <div className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
                              <BsLink45Deg size={22} />
                              <span>Copy link</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className="star-search relative -mt-1.5 flex flex-col px-2 justify-between items-center w-full h-full grow bg-slate-50">
        {renderState()}
        <div className="sticky w-full bottom-2 md:bottom-4">
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
                <SuggestedPrompts addPromptInput={addPromptInput} suggestions={SUGGESTIONS} />
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
            <div className="relative flex flex-col gap-2 mx-auto mb-4 w-fit">
              <button
                onClick={() => {
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
                className="absolute flex self-end gap-2 w-fit -right-5 -top-3"
              >
                <XCircleIcon className="w-5 h-5 text-slate-400" aria-label="Close suggestions" />
              </button>
              <SuggestedPrompts
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
              className="p-4 bg-white border border-none rounded-l-lg focus:outline-none grow"
              onFocus={() => {
                if ((checkAuth && sharedPrompt && !bearerToken) || (!bearerToken && !sharedPrompt)) {
                  setLoginModalOpen(true);
                }
              }}
            />
            <button type="submit" disabled={isRunning} className="p-2 bg-white rounded-r-lg">
              <span className="sr-only">Submit your question to StarSearch</span>
              <MdOutlineSubdirectoryArrowRight className="w-10 h-10 p-2 rounded-lg bg-light-orange-3 text-light-orange-10" />
            </button>
          </form>
          <p className="py-2 text-sm text-center text-slate-400">
            {isMobile ? (
              <>StarSearch may generate incorrect responses</>
            ) : (
              <>StarSearch may generate incorrect responses, double check important information</>
            )}
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 h-[125px] w-full translate-y-[-100%] lg:translate-y-[-50%] rounded-full bg-gradient-to-r from-light-red-10 via-sauced-orange to-amber-400 opacity-20 opa blur-[40px]"></div>
      </div>
      <StarSearchLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center gap-2 text-center lg:gap-4 lg:pt-8">
      <div className="flex items-center gap-2">
        <Image src="/assets/star-search-logo.svg" alt="" width={40} height={40} />
        <h1 className="text-3xl font-bold text-transparent lg:text-4xl bg-clip-text bg-gradient-to-r from-sauced-orange to-amber-400">
          StarSearch
        </h1>
      </div>
      <h2 className="pt-1 text-3xl font-semibold lg:text-4xl text-slate-600">Copilot, but for git history</h2>
    </header>
  );
}
