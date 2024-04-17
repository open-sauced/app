import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { forwardRef, useEffect, useRef, useState } from "react";

import Image from "next/image";
import Markdown from "react-markdown";
import { BsArrowUpShort } from "react-icons/bs";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import Card from "components/atoms/Card/card";
import ProfileLayout from "layouts/profile";
import { getAvatarById } from "lib/utils/github";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import { Drawer } from "components/shared/Drawer";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = Number(session?.user.user_metadata.sub);
  if (!userId) {
    return { notFound: true };
  }

  const featureFlags = await getAllFeatureFlags(userId);
  if (!featureFlags["star_search"]) {
    return { notFound: true };
  }

  return { props: { userId, bearerToken: session?.access_token } };
}

type StarSearchPageProps = {
  userId: number;
  bearerToken: string;
};

type StarSearchChat = {
  author: "You" | "StarSearch";
  content: string;
};

export default function StarSearchPage({ userId, bearerToken }: StarSearchPageProps) {
  const [starSearchState, setStarSearchState] = useState<"initial" | "chat">("initial");
  const [chat, setChat] = useState<StarSearchChat[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const submitPrompt = async (prompt: string) => {
    if (isRunning) {
      return;
    }
    if (starSearchState === "initial") {
      setStarSearchState("chat");
    }
    setIsRunning(true); // disables input

    // add user prompt to history
    setChat((history) => {
      const temp = history;
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
        const temp = history;
        temp.push({ author: "StarSearch", content: "There's been an error. Try again." });
        return temp;
      });
      setIsRunning(false); // enables input
      return;
    }

    setChat((history) => {
      const temp = history;
      temp.push({ author: "StarSearch", content: "" });
      return temp;
    });

    const decoder = new TextDecoderStream();
    const reader = response.body?.pipeThrough(decoder).getReader();
    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        setIsRunning(false); // enables input
        return;
      }
      const values = value.split("\n");
      values
        .filter((v) => v.startsWith("data:"))
        .forEach((v) => {
          const matched = v.match(/data:\s(?<result>.+)/);
          if (!matched || !matched.groups) {
            return;
          }
          const temp = [...chat];
          const changed = temp.at(temp.length - 1);
          changed!.content += matched.groups.result;
          setChat(temp);
        });
    }
  };

  const renderState = () => {
    switch (starSearchState) {
      case "initial":
        return (
          <div className="flex flex-col text-center items-center gap-4 lg:pt-24 z-10">
            <Header />
            <SuggestionBoxes
              addPromptInput={(prompt) => {
                setInput(prompt);
                inputRef.current?.focus();
              }}
            />
          </div>
        );
      case "chat":
        return (
          <section className="flex flex-col items-start gap-4 z-10 w-full min-w-max">
            <ChatHistory userId={userId} chat={chat} />
          </section>
        );
    }
  };

  return (
    <ProfileLayout>
      <div className="relative -mt-1.5 flex flex-col p-4 lg:p-8 justify-between items-center w-full h-full grow bg-slate-50">
        {renderState()}
        <div className="absolute inset-x-0 bottom-2 flex flex-col gap-4 items-center w-full">
          {!isRunning &&
            starSearchState === "chat" &&
            (isMobile ? (
              <Drawer
                title="YO"
                description="YAY"
                showCloseButton
                trigger={
                  <button className="z-30 flex gap-1 shadow-xs items-center text-slate-700 text-sm font-medium bg-slate-100 !border-2 !border-slate-300 px-4 py-1 rounded-full">
                    Need suggestions?
                    <BsArrowUpShort className="text-2xl" />
                  </button>
                }
              >
                <p>Hello</p>
              </Drawer>
            ) : (
              <div className="z-40 w-full max-w-3xl justify-center">
                {showSuggestions ? (
                  <div className="flex flex-col gap-2 justify-center items-center w-full self-center h-fit">
                    <button onClick={() => setShowSuggestions(false)} className="self-end">
                      Close
                    </button>
                    <SuggestionBoxes addPromptInput={submitPrompt} isHorizontal />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSuggestions(true)}
                    className="z-30 mx-auto flex gap-1 shadow-xs items-center text-slate-700 font-medium bg-slate-100 !border-2 !border-slate-300 px-4 py-1 rounded-full"
                  >
                    Need suggestions?
                    <BsArrowUpShort className="text-2xl" />
                  </button>
                )}
              </div>
            ))}
          <StarSearchInput
            ref={inputRef}
            input={input}
            setInput={setInput}
            isRunning={isRunning}
            onSubmitPrompt={submitPrompt}
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-0 h-[125px] w-full translate-y-[-100%] lg:translate-y-[-50%] rounded-full bg-gradient-to-r from-light-red-10 via-sauced-orange to-amber-400 opacity-40 blur-[40px]"></div>
      </div>
    </ProfileLayout>
  );
}

function Header() {
  return (
    <section className="flex flex-col text-center items-center gap-2 lg:gap-4 pt-4 lg:pt-24">
      <div className="flex gap-4 items-center">
        <Image src="/assets/star-search-logo.svg" alt="Star Search Logo" width={40} height={40} />
        <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sauced-orange to-amber-400">
          StarSearch
        </h1>
      </div>
      <h2 className="text-3xl lg:text-4xl font-semibold text-slate-600">Ask questions about contributors</h2>
    </section>
  );
}

function SuggestionBoxes({
  addPromptInput,
  isHorizontal,
}: {
  addPromptInput: (prompt: string) => void;
  isHorizontal?: boolean;
}) {
  const suggestions = [
    {
      title: "Get information on contributor activity",
      prompt: "What type of pull requests has brandonroberts worked on?",
    },
    {
      title: "Identify key contributors",
      prompt: "Who are the most prevalent contributors to the Typescript ecosystem?",
    },
    {
      title: "Find contributors based on their work",
      prompt: "Who are people making pull requests in vercel/turbo about css modules?",
    },
    {
      title: "Find experts",
      prompt: "Who are the best developers that know Tailwind and are interested in Rust?",
    },
  ];
  return (
    <ScrollArea dir="ltr" className="w-full pt-0 pb-8 lg:py-8 max-w-3xl h-fit">
      <div
        className={`${
          isHorizontal ? "flex flex-row items-stretch" : "grid grid-cols-1 lg:grid-cols-2"
        } grid-flow-row gap-0 lg:gap-4`}
      >
        {suggestions.map((suggestion, i) => (
          <button key={i} onClick={() => addPromptInput(suggestion.prompt)}>
            <Card className="shadow-md border-none text-start h-fit !p-6 text-slate-600">
              <h3 className="text-sm lg:text-base font-semibold">{suggestion.title}</h3>
              <p className="text-xs lg:text-sm">{suggestion.prompt}</p>
            </Card>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function ChatHistory({ userId, chat }: { userId: number; chat: StarSearchChat[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <ScrollArea className="relative grow items-center w-full max-w-xs lg:max-w-5xl lg:p-8 flex flex-col h-full xs:max-h-[20rem] max-h-[34rem] lg:max-h-[52rem] mx-auto">
      {chat.map((message, i) => (
        <Chatbox key={i} userId={userId} author={message.author} content={message.content} />
      ))}
      <div ref={scrollRef} />
    </ScrollArea>
  );
}

function Chatbox({ author, content, userId }: StarSearchChat & { userId?: number }) {
  const renderAvatar = () => {
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
          <div className="bg-gradient-to-br from-sauced-orange to-amber-400 px-1.5 py-1 lg:p-2 rounded-full">
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
  };

  return (
    <li className="flex gap-2 justify-center items-start my-4 w-full">
      {renderAvatar()}
      <Card className="flex flex-col grow bg-white z-10 p-2 lg:p-4 w-full max-w-xl lg:max-w-5xl">
        <h3 className="font-semibold text-sauced-orange">{author}</h3>
        <Markdown>{content}</Markdown>
      </Card>
    </li>
  );
}

const StarSearchInput = forwardRef<
  HTMLInputElement,
  {
    input: string;
    setInput: (prompt: string) => void;
    isRunning: boolean;
    onSubmitPrompt: (prompt: string) => void;
  }
>(function StarSearchInput({ input, setInput, isRunning, onSubmitPrompt }, ref) {
  return (
    <section className="mx-0.5 lg:mx-auto w-full lg:max-w-3xl px-1 py-[3px] rounded-xl bg-gradient-to-r from-sauced-orange via-amber-400 to-sauced-orange">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          onSubmitPrompt(formData.get("prompt") as string);
          form.reset();
        }}
        className="w-full bg-white h-fit flex justify-between rounded-lg"
      >
        <input
          required
          type="text"
          name="prompt"
          ref={ref}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isRunning}
          placeholder="Ask a question"
          className="p-4 border bg-white focus:outline-none grow rounded-l-lg border-none"
        />
        <button type="submit" disabled={isRunning} className="bg-white p-2 rounded-r-lg">
          <MdOutlineSubdirectoryArrowRight className="rounded-lg w-10 h-10 p-2 bg-light-orange-3 text-light-orange-10" />
        </button>
      </form>
    </section>
  );
});
