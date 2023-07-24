import { useRouter } from "next/router";

import GitHubIcon from "img/icons/github-icon.svg";

import HubLayout from "layouts/hub";
import Button from "components/atoms/Button/button";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useInsight from "lib/hooks/useInsight";
import { useToast } from "lib/hooks/useToast";
import Icon from "components/atoms/Icon/icon";

const AcceptMemberInvitePage = () => {
  const { user, sessionToken, signIn } = useSupabaseAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { insightId, id: inviteId } = router.query;
  const id = insightId as string;
  const { data: insight, isLoading: insightLoading, isError: insightError } = useInsight(id);

  async function acceptInvite() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insightId}/members/${inviteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ access: "view" }),
    });

    if (response.ok) {
      router.push(`/pages/${user?.user_metadata.user_name}/${insightId}/dashboard`);
    } else {
      toast({ description: "An error occurred!", variant: "danger" });
    }
  }

  if (insightLoading) {
    return <>Loading</>;
  }

  if (insightError) {
    return <>An error occurred while loading this page</>;
  }

  return (
    <section className="flex flex-col w-full py-4">
      <div className="flex flex-col justify-center gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            Insight Member Invitation - {insight?.name}
          </Title>

          <Text className="my-8">
            An insight is a dashboard containing selected repositories that you and your team can get insights from.
          </Text>
        </div>

        <div className="flex flex-col justify-center pb-8 border-b border-light-slate-8">
          <div className="flex justify-center py-4">
            {user ? (
              <Button onClick={acceptInvite} variant="primary">
                Accept Invite
              </Button>
            ) : (
              <Button variant="primary" onClick={async () => await signIn({ provider: "github" })}>
                Connect with GitHub <Icon IconImage={GitHubIcon} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

AcceptMemberInvitePage.PageLayout = HubLayout;
AcceptMemberInvitePage.isPrivateRoute = true;
AcceptMemberInvitePage.SEO = {
  title: "Accept Insight Member Invitation | Open Sauced Insights",
  noindex: true,
};

export default AcceptMemberInvitePage;
