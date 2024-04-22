import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Button from "components/shared/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import humanizeNumber from "lib/utils/humanizeNumber";
import GitHubIcon from "img/icons/github-icon.svg";
import Icon from "components/atoms/Icon/icon";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Star Search Waitlist</h1>
      {isWaitlisted ? (
        <p>You&apos;re one of the {humanizeNumber(waitlistCount)} people on the Star Search waitlist!</p>
      ) : (
        <>
          <p>Star Search is currently in private beta. Please join the waitlist to get early access.</p>
          {sessionToken ? (
            <form onSubmit={joinWaitlist}>
              <Button variant="primary">Join Waitlist</Button>
            </form>
          ) : (
            <Button
              variant="primary"
              onClick={async () => {
                const params = new URLSearchParams();
                params.set("redirectedFrom", "/star-search");

                await signIn({
                  provider: "github",
                  options: { redirectTo: `/?${params}` },
                });
              }}
            >
              Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
