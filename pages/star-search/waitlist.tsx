import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Markdown from "react-markdown";
import { ArrowRightIcon } from "@primer/octicons-react";
import Button from "components/shared/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import humanizeNumber from "lib/utils/humanizeNumber";
import { getAvatarById } from "lib/utils/github";
import ProfileLayout from "layouts/profile";

interface ChatboxProps {
  author: string;
  content: string;
}

function Chatbox({ author, content }: ChatboxProps) {
  const renderAvatar = () => {
    switch (author) {
      case "You":
        return (
          <Image
            src={getAvatarById("27322879")}
            alt="Your profile picture"
            width={32}
            height={32}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
          />
        );
      case "StarSearch":
        return (
          <div
            className="bg-gradient-to-br from-sauced-orange to-amber-400 px-1.5 py-1 lg:p-2 rounded-full aspect-square"
            style={{ height: "40px" }}
          >
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

  const extraClasses =
    author === "You" ? "p-[14px] rounded-[12px]" : "py-[34px] px-[30px] rounded-[22px] md:!w-[655px]";

  return (
    <>
      {author === "You" ? renderAvatar() : null}
      <div className={`waitlist-chatbox bg-white border-[2px] border-gradient-orange-one ${extraClasses}`}>
        <Markdown className="grid gap-4 [&_ol]:grid [&_ol]:gap-4">{content}</Markdown>
      </div>
      {author === "StarSearch" ? renderAvatar() : null}
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let isWaitlisted = false;
  let waitlistCount = 0;

  if (session) {
    const [waitlistCountResponse, userResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/waitlisted`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.user_metadata.user_name}`, {
        headers: {
          accept: "application/json",
        },
      }),
    ]);

    const [waitlistPayload, user] = await Promise.all([waitlistCountResponse.json(), userResponse.json()]);

    isWaitlisted = user.is_waitlisted;
    waitlistCount = waitlistPayload.waitlisted_users;
  }

  return {
    props: {
      isWaitlisted,
      waitlistCount,
    },
  };
};

interface StarSearchWaitListPageProps {
  isWaitlisted: boolean;
  waitlistCount: number;
}

export default function StarSearchWaitListPage({ isWaitlisted, waitlistCount }: StarSearchWaitListPageProps) {
  const { sessionToken, signIn, user } = useSupabaseAuth();

  async function joinWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bearerToken = sessionToken ? sessionToken : undefined;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/waitlist`, {
      method: "POST",
      headers: {
        "Accept-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response.status === 201;
  }

  return (
    <ProfileLayout>
      <div className="flex flex-col items-center gap-4 px-2 mb-8 sm:pt-8 md:pt-0">
        <div className="flex gap-2 items-center">
          <Image src="/assets/star-search-logo.svg" alt="" width={40} height={40} />
          <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sauced-orange to-amber-400">
            StarSearch
          </h1>
        </div>
        <p className="font-semibold text-5xl text-center tracking-tight text-balance">Copilot, but for git history</p>
        <p className="text-center">Ask anything, get AI powered insights on based contributor data</p>
        {isWaitlisted ? (
          <p>You&apos;re in along with {humanizeNumber(waitlistCount)} other people on the Star Search waitlist!</p>
        ) : (
          <>
            {sessionToken ? (
              <form onSubmit={joinWaitlist}>
                <Button variant="primary" className="flex gap-2 md:mt-6">
                  <span>Join the Waitlist</span>
                  <ArrowRightIcon />
                </Button>
              </form>
            ) : (
              <Button
                variant="primary"
                onClick={async () => {
                  const params = new URLSearchParams();
                  params.set("redirectedFrom", "/star-search");

                  await signIn({
                    provider: "github",
                    options: { redirectTo: `${new URL(`/?{params}`, window.location.href)}` },
                  });
                }}
                className="flex gap-2 md:mt-6"
              >
                <span>Sign up to Join the Waitlist</span>
                <ArrowRightIcon />
              </Button>
            )}
          </>
        )}
        <div className="grid place-content-center px-2 w-full /*lg:bg-[url(/assets/images/waitlist-background.png)] md:bg-no-repeat md:bg-center*/">
          <ul className="mt-4 md:mt-8 grid gap-8">
            <li className="flex gap-4 text-slate-600">
              <Chatbox author="You" content="Who worked on React Server Components recently?" />
            </li>
            <li className="flex gap-4 text-slate-600 place-self-end">
              <Chatbox
                author="StarSearch"
                content={`Based on the provided GitHub activities and contributions data, the following users have recently worked on React Server Components:

1. **@brunnolou:** Submitted a pull request titled "Feature/react server components" to the danswer-ai/danswer repository, including changes related to adding react server components with the aim of enhancing the functionality of the project.
1. **@sebmarkbage:** Implemented the concept of a DEV-only "owner" for Server Components in the React repository through a pull request titled "Track Owner for Server Components". The owner concept is added for parity with DevTools and could be used to wire up future owner-based stacks.
1. **@EvanBacon:** Submitted a pull request to the facebook/react-native repository titled "mark all of react-native as client boundary for React Server Components". The pull request marks all of react-native as a client boundary for React Server Components, allowing for importing react-native in a react-server environment for React Server Components support.`}
              />
            </li>
          </ul>
        </div>
      </div>
    </ProfileLayout>
  );
}
