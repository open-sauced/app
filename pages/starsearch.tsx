import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import Card from "components/atoms/Card/card";
import ProfileLayout from "layouts/profile";

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

  return { props: {} };
}

type StarSearchPageProps = {};

export default function StarSearchPage() {
  return (
    <ProfileLayout>
      <div className="relative -mt-1.5 flex flex-col p-8 justify-between items-center w-full h-full grow bg-slate-50">
        <Header />
        <StarSearchInput />
        <div className="absolute inset-x-0 top-0 h-[125px] w-full translate-y-[-80%] lg:translate-y-[-50%] rounded-full bg-gradient-to-r from-light-red-10 via-sauced-orange to-amber-400 opacity-40 blur-[40px]"></div>
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

function StarSearchInput() {
  return (
    <section className="w-full h-fit px-1 py-[3px] rounded-xl bg-gradient-to-r from-sauced-orange via-amber-400 to-sauced-orange">
      <div className="w-full h-fit flex justify-between rounded-lg">
        <input
          type="text"
          placeholder="Ask a question"
          className="p-4 border focus:outline-none grow rounded-l-lg border-none"
          required
        />
        <button className="bg-white p-2 rounded-r-lg">
          <MdOutlineSubdirectoryArrowRight className="rounded-lg w-10 h-10 p-2 bg-light-orange-3 text-light-orange-10" />
        </button>
      </div>
    </section>
  );
}
