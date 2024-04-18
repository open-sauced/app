import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import Card from "components/atoms/Card/card";
import ProfileLayout from "layouts/profile";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import { getAvatarById } from "lib/utils/github";
import SEO from "layouts/SEO/SEO";

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

  const ogImageUrl = `${new URL(
    "/assets/og-images/star-search-og-image.png",
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  )}`;

  return { props: { userId, bearerToken: session?.access_token, ogImageUrl } };
}

type StarSearchPageProps = {
  userId: number;
  bearerToken: string;
  ogImageUrl: string;
};

type StarSearchChat = {
  author: "You" | "StarSearch";
  content: string;
};

export default function StarSearchPage({ userId, bearerToken, ogImageUrl }: StarSearchPageProps) {
  const [starSearchState, setStarSearchState] = useState<"initial" | "chat">("initial");
  const [chat, setChat] = useState<StarSearchChat[]>([]);
  const [isRunning, setIsRunning] = useState(false);

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
        return <Header />;
      case "chat":
        return (
          <ChatHistory
            userId={userId}
            chat={chat}
            resetChat={() => setStarSearchState("initial")}
            isRunning={isRunning}
          />
        );
    }
  };

  return (
    <>
      <SEO
        title="OpenSauced Insights - StarSearch"
        description="Copilot, but for your git history"
        image={ogImageUrl}
        twitterCard="summary_large_image"
      />
      <ProfileLayout>
        <div className="relative -mt-1.5 flex flex-col p-4 lg:p-8 justify-between items-center w-full h-full grow bg-slate-50">
          <main className="mx-auto px-auto w-full h-full max-h-99 z-10">
            {renderState()}
            <StarSearchInput isRunning={isRunning} onSubmitPrompt={submitPrompt} />
          </main>
          <div className="absolute inset-x-0 top-0 z-0 h-[125px] w-full translate-y-[-100%] lg:translate-y-[-50%] rounded-full bg-gradient-to-r from-light-red-10 via-sauced-orange to-amber-400 opacity-40 blur-[40px]"></div>
        </div>
      </ProfileLayout>
    </>
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
      <SuggestionBoxes />
    </section>
  );
}

function SuggestionBoxes() {
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
    <ScrollArea className="w-full pt-0 pb-8 lg:py-8 max-w-3xl h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-0 lg:gap-4">
        {suggestions.map((suggestion, i) => (
          <button key={i}>
            <Card className="shadow-md border-none text-start !p-6 text-slate-600">
              <h3 className="text-sm lg:text-base font-semibold">{suggestion.title}</h3>
              <p className="text-xs lg:text-sm">{suggestion.prompt}</p>
            </Card>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function ChatHistory({
  userId,
  chat,
  resetChat,
  isRunning,
}: {
  userId: number;
  chat: StarSearchChat[];
  resetChat: () => void;
  isRunning: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <div aria-live="polite" className="w-full max-w-xl lg:max-w-5xl lg:px-8 mx-auto">
      <ScrollArea className="relative grow items-center flex flex-col h-full max-h-[34rem] lg:max-h-[52rem]">
        {chat.map((message, i) => (
          <Chatbox key={i} userId={userId} author={message.author} content={message.content} />
        ))}
        <div ref={scrollRef} />
      </ScrollArea>
      {!isRunning ? (
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="flex gap-2 items-center hover:text-sauced-orange"
            onClick={() => resetChat()}
          >
            Clear chat history
            <TrashIcon width={16} height={16} />
          </button>
        </div>
      ) : null}
    </div>
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
    <li className="flex gap-2 items-start my-4">
      {renderAvatar()}
      <Card className="flex flex-col grow bg-white z-10 p-2 lg:p-4 w-full max-w-xl lg:max-w-5xl">
        <h3 className="font-semibold text-sauced-orange">{author}</h3>
        <Markdown>{content}</Markdown>
      </Card>
    </li>
  );
}

function StarSearchInput({
  isRunning,
  onSubmitPrompt,
}: {
  isRunning: boolean;
  onSubmitPrompt: (prompt: string) => void;
}) {
  return (
    <section className="absolute inset-x-0 bottom-2 mx-0.5 lg:mx-auto lg:max-w-3xl px-1 py-[3px] rounded-xl bg-gradient-to-r from-sauced-orange via-amber-400 to-sauced-orange">
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
}
