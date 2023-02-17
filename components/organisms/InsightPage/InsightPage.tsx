import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Endpoints } from "@octokit/types";

import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";
import RepoNotIndexed from "components/organisms/Repositories/repository-not-indexed";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getAvatarByUsername } from "lib/utils/github";
import useStore from "lib/store";

export type GitHubRepo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

enum RepoLookupError {
  Initial = 0,
  NotIndexed = 1,
  Invalid = 3,
  Error = 4
}

interface InsightPageProps {
  edit?: boolean;
  insight?: DbUserInsight;
  pageRepos?: GitHubRepo[];
}

const InsightPage = ({ edit, insight, pageRepos }: InsightPageProps) => {
  const { sessionToken } = useSupabaseAuth();
  const router = useRouter();
  let receivedData = [];
  if(router.query.selectedRepos) {
    receivedData = JSON.parse(router.query.selectedRepos as string);
  }

  const [name, setName] = useState(insight?.name || "");
  const [isNameValid, setIsNameValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [repoToAdd, setRepoToAdd] = useState("");
  const [repos, setRepos] = useState<GitHubRepo[]>(receivedData);
  const [repoHistory, setRepoHistory] = useState<GitHubRepo[]>([]);
  const [addRepoError, setAddRepoError] = useState<RepoLookupError>(RepoLookupError.Initial);
  const [isPublic, setIsPublic] = useState(!!insight?.is_public);
  const insightRepoLimit = useStore(state => state.insightRepoLimit);

  useEffect(() => {
    if (pageRepos) {
      setRepos(pageRepos);
    }

    if (insight) {
      setIsPublic(insight.is_public);
    }
  }, [pageRepos, insight?.is_public, insight]);

  const reposRemoved = repoHistory.map(({full_name, open_issues_count}) => {
    const [orgName, repoName] = full_name.split("/");

    return {
      orgName,
      repoName,
      totalIssues: open_issues_count,
      avatar: getAvatarByUsername(orgName, 60),
      handleRemoveItem: () => {}
    };
  });

  const handleOnNameChange = (value: string) => {

    setName(value);

    if (!value || value.trim().length <= 3) setIsNameValid(false);

    if (value.trim().length > 3) {
      setIsNameValid(true);
    }
  };

  const handleCreateInsightPage = async () => {
    setSubmitted(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        name,
        repos: repos.map((repo) => ({id: repo.id, fullName: repo.full_name})),
        is_public: isPublic
      })
    });

    if (response.ok) {
      await router.push("/hub/insights");
    }

    setSubmitted(false);
  };

  const handleUpdateInsightPage = async () => {
    setSubmitted(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insight?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        name,
        repos: repos.map((repo) => ({id: repo.id, fullName: repo.full_name})),
        is_public: isPublic
      })
    });

    if (response.ok) {
      await router.push("/hub/insights");
    }

    setSubmitted(false);
  };

  const handleOnRepoChange = (value: string) => setRepoToAdd(value);

  const loadAndAddRepo = async (repoToAdd: string) => {
    setAddRepoError(RepoLookupError.Initial);

    const hasRepo = repos.find((repo) => repo.full_name === repoToAdd);

    if (hasRepo) {
      return;
    }

    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_GS_API_URL}/repos/${repoToAdd}`);
      const response = await fetch(`https://api.github.com/repos/${repoToAdd}`);

      if (response.ok) {
        const addedRepo = (await response.json());

        setRepos((repos) => {
          return [...repos, addedRepo];
        });
        setAddRepoError(RepoLookupError.Initial);
        setRepoToAdd("");
      }
    } catch {
      setAddRepoError(RepoLookupError.Error);
    }
  };

  const handleAddRepository = async () => {
    await loadAndAddRepo(repoToAdd);
  };

  const handleReAddRepository = async (repoAdded: string) => {
    try {
      await loadAndAddRepo(repoAdded);

      setRepoHistory((historyRepos) => {
        return historyRepos.filter((repo) => repo.full_name !== repoAdded);
      });
    } catch (e) {}
  };

  const handleRemoveRepository = (id: number) => {
    setRepos((addedRepos) => {
      return addedRepos.filter((repo) => repo.id !== id);
    });

    // @ts-ignore
    setRepoHistory((historyRepos) => {
      return [...historyRepos, repos.find((repo) => repo.id === id)];
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
      return <RepoNotIndexed />;
    }

    return <></>;
  };

  return (
    <section className="flex  flex-col lg:flex-row w-full lg:gap-20 py-4 lg:pl-28 justify-center ">
      <div className="flex flex-col gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            { edit ? "Update" : "Create New" } Insight Page
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

          <TextInput
            placeholder="Page Name (ex: My Team)"
            value={name}
            handleChange={handleOnNameChange}
          />
          {/* <Text>insights.opensauced.pizza/pages/{username}/{`{pageId}`}/dashboard</Text> */}
        </div>

        <div className="py-6 border-b flex flex-col gap-4 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Add Repositories
          </Title>

          <TextInput
            value={repoToAdd}
            placeholder="Repository Full Name (ex: open-sauced/open-sauced)"
            handleChange={handleOnRepoChange}
          />

          <div>
            <Button disabled={repos.length === insightRepoLimit} onClick={handleAddRepository} type="primary">
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
          edit={edit}
          hasItems={repos.length > 0}
          handleCreatePage={handleCreateInsightPage}
          handleUpdatePage={handleUpdateInsightPage}
          handleAddToCart={handleReAddRepository}
          history={reposRemoved}
          createPageButtonDisabled={submitted || !isNameValid}
        >
          {repos.map((repo) => {
            const [owner, name] = repo.full_name.split("/");
            const totalIssues = repo.open_issues_count;

            return (
              <RepositoryCartItem
                key={`repo_${repo.id}`}
                avatar={getAvatarByUsername(owner, 60)}
                handleRemoveItem={() => handleRemoveRepository(repo.id)}
                orgName={owner}
                repoName={name}
                totalIssues={totalIssues}
              />
            );
          })}
        </RepositoriesCart>
      </div>
    </section>
  );
};

export default InsightPage;
