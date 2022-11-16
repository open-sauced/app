import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";

import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "layouts/hub";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getAvatarLink } from "lib/utils/github";

enum RepoLookupError {
  Initial = 0,
  NotIndexed = 1,
  Invalid = 3,
  Error = 4
}

const NewInsightPage: WithPageLayout = () => {
  const { user, sessionToken } = useSupabaseAuth();
  const router = useRouter();
  const username: string = user?.user_metadata.user_name;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [repoToAdd, setRepoToAdd] = useState("");
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [repoHistory, setRepoHistory] = useState<DbRepo[]>([]);
  const [addRepoError, setAddRepoError] = useState<RepoLookupError>(RepoLookupError.Initial);
  const [isPublic, setIsPublic] = useState(false);

  const reposRemoved = repoHistory.map((repo) => {
    const totalPrs =
      (repo.openPrsCount || 0) + (repo.closedPrsCount || 0) + (repo.mergedPrsCount || 0) + (repo.draftPrsCount || 0);

    return {
      orgName: repo.owner,
      repoName: repo.name,
      totalPrs,
      avatar: getAvatarLink(repo.owner, 60),
      handleRemoveItem: () => {}
    };
  });

  const handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateInsightPage = async () => {
    setSubmitted(true);

    if (!name) {
      setNameError("Insight name is a required field");
      setSubmitted(false);
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        name,
        ids: repos.map((repo) => repo.id),
        // eslint-disable-next-line
        is_public: isPublic
      })
    });

    if (response.ok) {
      router.push("/hub/insights");
    }

    setSubmitted(false);
  };

  const handleOnRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoToAdd(event.target.value);
  };

  const loadAndAddRepo = async (repoToAdd: string) => {
    setAddRepoError(RepoLookupError.Initial);

    const hasRepo = repos.find((repo) => `${repo.owner}/${repo.name}` === repoToAdd);

    if (hasRepo) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GS_API_URL}/repos/${repoToAdd}`);

      if (response.ok) {
        const addedRepo = (await response.json()) as DbRepo;

        setRepos((repos) => {
          return [...repos, addedRepo];
        });
        setAddRepoError(RepoLookupError.Initial);
      } else {
        const publicRepoResponse = await fetch(`https://api.github.com/repos/${repoToAdd}`);

        if (publicRepoResponse.ok) {
          setAddRepoError(RepoLookupError.NotIndexed);
        } else {
          setAddRepoError(RepoLookupError.Invalid);
        }
      }
    } catch {
      setAddRepoError(RepoLookupError.Error);
    }
  };

  const handleAddRepository = async () => {
    await loadAndAddRepo(repoToAdd);
    setRepoToAdd("");
  };

  const handleReAddRepository = async (repoAdded: string) => {
    try {
      await loadAndAddRepo(repoAdded);

      setRepoHistory((historyRepos) => {
        return historyRepos.filter((repo) => `${repo.owner}/${repo.name}` !== repoAdded);
      });
    } catch (e) {}
  };

  const handleRemoveRepository = (id: string) => {
    setRepos((addedRepos) => {
      return addedRepos.filter((repo) => repo.id !== id);
    });

    setRepoHistory((historyRepos) => {
      return [...historyRepos, repos.find((repo) => repo.id === id) as DbRepo];
    });
  };

  const getRepoLookupError = (code: RepoLookupError) => {
    if (code === RepoLookupError.Error) {
      return <Text>There was error retrieving this repository.</Text>;
    }

    if (code === RepoLookupError.Invalid) {
      return <Text>This repository entered is invalid.</Text>;
    }

    if (code === RepoLookupError.NotIndexed) {
      return (
        <Text>
          This repository is not currently being indexed by OpenSauced. <br />
          <Link className="!text-black" href="https://github.com/open-sauced/feedback/discussions/2" target="_blank">
            Visit our feedback discussion
          </Link>{" "}
          to request this repository be added.
        </Text>
      );
    }

    return <></>;
  };

  return (
    <section className="flex  flex-col lg:flex-row w-full lg:gap-20 py-4 lg:pl-28 justify-center ">
      <div className="flex flex-col gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            Create New Insight Page
          </Title>
          <Text className="my-8">
            An insight page is a dashboard containing selected repositories that you and your team can get insights
            from.
          </Text>
        </div>

        <div className="pb-8 border-b border-light-slate-8">
          <Title className="!text-1xl !leading-none mb-4" level={4}>
            Page Name
          </Title>

          <TextInput placeholder="Page Name (ex: My Team)" value={name} onChange={handleOnNameChange} />
          {submitted && nameError ? <Text>{nameError}</Text> : ""}
          {/* <Text>insights.opensauced.pizza/pages/{username}/{`{pageId}`}/dashboard</Text> */}
        </div>

        <div className="py-6 border-b flex flex-col gap-4 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Add Repositories
          </Title>

          <TextInput
            value={repoToAdd}
            placeholder="Repository Full Name (ex: open-sauced/open-sauced)"
            onChange={handleOnRepoChange}
          />

          <div>
            <Button disabled={repos.length === 10} onClick={handleAddRepository} type="primary">
              Add Repository
            </Button>
          </div>
        </div>

        {getRepoLookupError(addRepoError)}

        <Title className="!text-1xl !leading-none mb-4 my-4" level={4}>
          Page Visibility
        </Title>

        <div className="flex justify-between">
          <div className="flex items-center">
            <UserGroupIcon className="w-[24px] h-[24px] text-light-slate-9" />
            <Text className="pl-2">Make this page publicly visible</Text>
          </div>

          <div className="flex mx-4 !border-red-900 items-center">
            <Text className="!text-orange-600 pr-2">Make Public</Text>
            <ToggleSwitch
              name="isPublic"
              checked={isPublic}
              handleToggle={() => setIsPublic((isPublic) => !isPublic)}
            />
          </div>
        </div>
      </div>

      <div className="lg:sticky mt-5 md:mt-0 top-0 py-4 lg:py-0">
        <RepositoriesCart
          hasItems={repos.length > 0}
          handleCreatePage={handleCreateInsightPage}
          handleAddToCart={handleReAddRepository}
          history={reposRemoved}
          createPageButtonDisabled={submitted}
        >
          {repos.map((repo) => {
            const totalPrs =
              (repo.openPrsCount || 0) +
              (repo.closedPrsCount || 0) +
              (repo.mergedPrsCount || 0) +
              (repo.draftPrsCount || 0);

            return (
              <RepositoryCartItem
                key={`repo_${repo.id}`}
                avatar={getAvatarLink(repo.owner, 60)}
                handleRemoveItem={() => handleRemoveRepository(repo.id)}
                orgName={repo.owner}
                repoName={repo.name}
                totalPrs={totalPrs}
              />
            );
          })}
        </RepositoriesCart>
      </div>
    </section>
  );
};

NewInsightPage.PageLayout = HubLayout;

export default NewInsightPage;
