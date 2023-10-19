import { useState } from "react";
import { useRouter } from "next/router";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import TextInput from "components/atoms/TextInput/text-input";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import TopNav from "components/organisms/TopNav/top-nav";
import Footer from "components/organisms/Footer/footer";
import InfoCard from "components/molecules/InfoCard/info-card";
import GitHubImportDialog from "components/organisms/GitHubImportDialog/github-import-dialog";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useToast } from "lib/hooks/useToast";

interface CreateListPayload {
  name: string;
  is_public: boolean;
  contributors: { id: number; login: string }[];
}

interface GhFollowing {
  id: number;
  login: string;
  type: string;
}

const CreateListPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { sessionToken, providerToken, user } = useSupabaseAuth();

  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOnNameChange = (value: string) => {
    setName(value);
  };

  // pick 10 unique random contributors from the GitHub following list
  const getFollowingRandom = (arr: GhFollowing[], n: number): GhFollowing[] => {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  };

  const createList = async (payload: CreateListPayload) => {
    if (!payload.name) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleGitHubImport = async (props: { follow: boolean }) => {
    if (!user) {
      toast({ description: "Unable to connect to GitHub! Try logging out and re-connecting.", variant: "warning" });
      return;
    }

    setSubmitted(true);
    const req = await fetch(`https://api.github.com/users/${user?.user_metadata.user_name}/following?per_page=30`, {
      headers: {
        "Content-type": "application/json",
        ...(providerToken ? { Authorization: `Bearer ${providerToken}` } : {}),
      },
    });

    if (!req.ok) {
      toast({ description: "Unable to connect to GitHub", variant: "warning" });
      setSubmitted(false);
      return;
    }

    const followingList: GhFollowing[] = await req.json();

    if (followingList.length === 0) {
      toast({ description: "You are not following anyone on GitHub", variant: "danger" });
      setSubmitted(false);
      return;
    }

    // Filter out orgs
    const contributorFollowingList = followingList.filter((contributor) => contributor.type === "User");
    const following = getFollowingRandom(contributorFollowingList, 10);

    const response = await createList({
      name,
      contributors: following.map((user) => ({ id: user.id, login: user.login })),
      is_public: isPublic,
    });

    if (response) {
      if (props.follow) {
        const followRequests = following.map((user) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.login}/follow`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }).catch(() => {})
        );

        Promise.allSettled(followRequests);
        toast({ description: "List created successfully", variant: "success" });
      }

      router.push(`/lists/${response.id}/overview`);
    } else {
      toast({ description: "An error occurred!", variant: "danger" });
      setSubmitted(false);
    }
  };

  return (
    <section className="flex flex-col justify-center w-full py-4 xl:flex-row xl:gap-20 xl:pl-28">
      <div className="flex flex-col gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            Create New List
          </Title>
          <Text className="my-8">
            A list is a collection of contributors that you and your team can get insights for.
          </Text>
        </div>

        <div className="pb-8 border-b border-light-slate-8">
          <Title className="!text-1xl !leading-none mb-4" level={4}>
            List Name
          </Title>

          <TextInput placeholder="Page Name (ex: My Team)" value={name} handleChange={handleOnNameChange} />
        </div>

        <div className="flex flex-col gap-4 py-6 border-light-slate-8">
          <Title className="!text-1xl !leading-none mb-4 mt-8" level={4}>
            Page Visibility
          </Title>

          <div className="flex justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="w-6 h-6 text-light-slate-9" />
              <Text className="pl-2">Make this list publicly visible</Text>
            </div>

            <div className="flex ml-2 !border-red-900 items-center">
              <Text className="!text-orange-600 pr-2 hidden md:block">Make Public</Text>
              <ToggleSwitch
                name="isPublic"
                checked={isPublic}
                handleToggle={() => setIsPublic((isPublic) => !isPublic)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Add Contributors
          </Title>

          <InfoCard
            title="Explore Contributors"
            description="Use our explore tool to find Contributors and create your list"
            icon="globe"
            handleClick={() => {
              router.push(`/hub/lists/find?name=${name}&public=${isPublic}`);
            }}
          />

          <InfoCard
            title="Import your GitHub following"
            description="Connect to your GitHub to create a list with all the Contributors you follow"
            icon="github"
            handleClick={() => {
              if (!name) {
                toast({
                  description: "List name is required",
                  variant: "danger",
                });

                return;
              }

              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      <div className="top-0 py-4 mt-5 lg:sticky md:mt-0 lg:py-0">
        <div className="flex flex-col justify-between pt-8 mt-8 border-t"></div>
      </div>

      <GitHubImportDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleImport={handleGitHubImport}
        loading={submitted}
      />
    </section>
  );
};

const AddListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-col items-center pt-20 page-container grow md:pt-14">
        <main className="flex flex-col items-center flex-1 w-full px-3 py-8 md:px-2 bg-light-slate-2">
          <div className="container px-2 mx-auto md:px-16">
            <CreateListPage />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

AddListPage.isPrivateRoute = true;
export default AddListPage;
