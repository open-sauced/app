import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useState } from "react";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import Card from "components/atoms/Card/card";
import ProfileLayout from "layouts/profile";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import { getAvatarById } from "lib/utils/github";

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

  return { props: { userId } };
}

type StarSearchPageProps = {
  userId: number;
};

export default function StarSearchPage({ userId }: StarSearchPageProps) {
  const [starSearchState, setStarSearchState] = useState<"initial" | "chat">("initial");
  const renderState = () => {
    switch (starSearchState) {
      case "initial":
        return <Header />;
      case "chat":
        return <ChatHistory userId={userId} />;
    }
  };
  return (
    <ProfileLayout>
      <div className="relative -mt-1.5 flex flex-col p-4 lg:p-8 justify-between items-center w-full h-full grow bg-slate-50">
        {renderState()}
        <StarSearchInput onSubmit={() => setStarSearchState(starSearchState === "initial" ? "chat" : "initial")} />
        <div className="absolute inset-x-0 top-0 z-0 h-[125px] w-full translate-y-[-100%] lg:translate-y-[-50%] rounded-full bg-gradient-to-r from-light-red-10 via-sauced-orange to-amber-400 opacity-40 blur-[40px]"></div>
      </div>
    </ProfileLayout>
  );
}

function Header() {
  return (
    <section className="flex flex-col text-center items-center gap-4 lg:pt-24">
      <div className="flex gap-4 items-center">
        <img src="/assets/star-search-logo.svg" alt="Star Search Logo" className="w-10 h-10 mb-1" />
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
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full py-8 max-w-3xl">
      {suggestions.map((suggestion, i) => (
        <button key={i}>
          <Card className="shadow-md border-none text-start !p-6 text-slate-600">
            <h3 className="font-semibold">{suggestion.title}</h3>
            <p className="text-sm">{suggestion.prompt}</p>
          </Card>
        </button>
      ))}
    </section>
  );
}

function ChatHistory({ userId }: { userId: number }) {
  return (
    <ScrollArea className="grow items-center w-full p-4 lg:p-8">
      <Chatbox author="You" userId={userId} content="Who are the biggest contributors for the open-sauced/app repo?" />
      <Chatbox
        author="StarSearch"
        content="The top 3 biggest contributors for open-sauced/app nickytonline, brandonroberts, and jpmcb."
      />
    </ScrollArea>
  );
}

function Chatbox({ author, content, userId }: { author: "You" | "StarSearch"; content: string; userId?: number }) {
  const renderAvatar = () => {
    switch (author) {
      case "You":
        return <img src={getAvatarById(`${userId}`)} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" />;
      case "StarSearch":
        return (
          <div className="bg-gradient-to-br from-sauced-orange to-amber-400 px-3 py-1 lg:p-2 rounded-full">
            <img src="/assets/star-search-logo-white.svg" className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <li className="flex gap-2 items-start my-4">
      {renderAvatar()}
      <Card className="flex flex-col grow bg-white z-10 p-2 lg:p-4">
        <h3 className="font-semibold text-sauced-orange">{author}</h3>
        <p>{content}</p>
      </Card>
    </li>
  );
}

function StarSearchInput({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="w-full h-fit max-w-4xl px-1 py-[3px] rounded-xl bg-gradient-to-r from-sauced-orange via-amber-400 to-sauced-orange">
      <div className="w-full h-fit flex justify-between rounded-lg">
        <input
          type="text"
          placeholder="Ask a question"
          className="p-4 border focus:outline-none grow rounded-l-lg border-none"
          required
        />
        <button className="bg-white p-2 rounded-r-lg" onClick={onSubmit}>
          <MdOutlineSubdirectoryArrowRight className="rounded-lg w-10 h-10 p-2 bg-light-orange-3 text-light-orange-10" />
        </button>
      </div>
    </section>
  );
}
