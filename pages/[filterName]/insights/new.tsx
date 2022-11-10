import { useRouter } from "next/router";
import { useState } from "react";

import Radio from "components/atoms/Radio/radio";
import TextInput from "components/atoms/TextInput/text-input";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "layouts/hub";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import Button from "components/atoms/Button/button";
import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";
import { getProfileLink } from "lib/utils/github";

const NewInsightPage: WithPageLayout = () => {
  const { user, sessionToken } = useSupabaseAuth();
  const router = useRouter();
  const username = user?.user_metadata.user_name;
  const [name, setName] = useState("");
  const [repoToAdd, setRepoToAdd] = useState("");
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [repoHistory, setRepoHistory] = useState<DbRepo[]>([]);
  const [addRepoError, setAddRepoError] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  const reposRemoved = repoHistory.map(repo => {
    const totalPrs = (repo.openPrsCount || 0) + (repo.closedPrsCount || 0) + (repo.mergedPrsCount || 0) + (repo.draftPrsCount || 0);

    return {
      orgName: repo.owner,
      repoName: repo.name,
      totalPrs,
      avatar: `${getProfileLink(repo.owner)}.png?size=60`,
      handleRemoveItem: () => {}              
    };
  });

  const handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateInsightPage = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          name,
          ids: repos.map(repo => repo.id)
        })
      });

      if (response.ok) {
        router.push("/hub/insights");
      }
    } catch (e) {

    }
  };

  const handleOnRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoToAdd(event.target.value);
  };

  const loadAndAddRepo = async(repoToAdd: string) => {
    setAddRepoError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GS_API_URL}/repos/${repoToAdd}`);

      if (response.ok) {
        const addedRepo = await response.json() as DbRepo;
      
        setRepos(repos => {
          return [...repos, addedRepo];
        });
        setAddRepoError(null);
      } else {
        setAddRepoError("Repository is not indexed or invalid");
      }
    } catch {
      setAddRepoError("Repository is not indexed or invalid");
    }
  };

  const handleAddRepository = async () => {
    await loadAndAddRepo(repoToAdd);
  };

  const handleReAddRepository = async(repoAdded: string) => {
    try {
      await loadAndAddRepo(repoAdded);

      setRepoHistory(historyRepos => {
        return historyRepos.filter(repo => `${repo.owner}/${repo.name}` !== repoAdded);
      });
    } catch (e) {

    }    
  };

  const handleRemoveRepository = (id: string) => {
    setRepos(addedRepos => {
      return addedRepos.filter(repo => repo.id !== id);
    });

    setRepoHistory(historyRepos => {
      return [...historyRepos, repos.find(repo => repo.id === id) as DbRepo];
    });
  };

  return (
    <section className="flex flex-col md:flex-row w-full py-4 px-2 md:px-4 justify-center items-center">
      <div className="px-4">
        <Title className="!text-2xl !leading-none mb-4" level={1}>
          Create New Insight Page
        </Title>

        <Text className="my-8">
          An insight page is a dashboard containing selected repositories that you and your team can get insights from.
        </Text>

        <hr className="m-4"/>

        <Title className="!text-1xl !leading-none mb-4" level={4}>
          Page Name
        </Title>

        <TextInput placeholder="Page Name (ex: My Team)" onChange={handleOnNameChange}/>
        {/* <Text>insights.opensauced.pizza/pages/{username}/{`{pageId}`}</Text> */}

        <hr className="m-4"/>

        <Title className="!text-1xl !leading-none mb-4 my-4" level={4}>
          Add Repositories
        </Title>

        <TextInput
          classNames="my-2"
          placeholder="Repository Full Name (ex: org/repo)"
          onChange={handleOnRepoChange}
        />
        
        <div>
          <Button onClick={handleAddRepository} type="primary">Add Repository</Button>
        </div>

        {addRepoError ? <Text className="!text-red-500">
          {addRepoError}
        </Text>: ""}
      </div>

      <div className="">
        <RepositoriesCart
          hasItems={repos.length > 0}
          handleCreatePage={handleCreateInsightPage}
          handleAddToCart={handleReAddRepository}
          history={reposRemoved}>
          {repos.map(repo => {
            const totalPrs = (repo.openPrsCount || 0) + (repo.closedPrsCount || 0) + (repo.mergedPrsCount || 0) + (repo.draftPrsCount || 0);

            return (<RepositoryCartItem key={`repo_${repo.id}`}
              avatar={`${getProfileLink(repo.owner)}.png?size=60`}
              handleRemoveItem={() => handleRemoveRepository(repo.id)}
              orgName={repo.owner}
              repoName={repo.name}
              totalPrs={totalPrs}
            />);
          })}
        </RepositoriesCart>

        {/* <Title className="!text-1xl !leading-none mb-4" level={4}>
          Page Visibility
        </Title>

        [Icon] <Text>Make this page publicly visible</Text> 
        
        <ToggleSwitch name="isPublic" checked={false} handleToggle={handleVisibility}/> */}
      </div>
    </section>
  );
};

NewInsightPage.PageLayout = HubLayout;

export default NewInsightPage;
