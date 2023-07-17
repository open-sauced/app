import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { useDebounce } from "rooks";
import Button from "components/atoms/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";
import RepoNotIndexed from "components/organisms/Repositories/repository-not-indexed";
import useRepositories from "lib/hooks/api/useRepositories";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getAvatarById, getAvatarByUsername } from "lib/utils/github";
import useStore from "lib/store";
import Error from "components/atoms/Error/Error";
import Search from "components/atoms/Search/search";
import { RepoCardProfileProps } from "components/molecules/RepoCardProfile/repo-card-profile";
import { useToast } from "lib/hooks/useToast";
import TeamMembersConfig, { TeamMemberData } from "components/molecules/TeamMembersConfig/team-members-config";
import useInsightMembers from "lib/hooks/useInsightMembers";
import SuggestedRepositoriesList from "../SuggestedRepoList/suggested-repo-list";
import DeleteInsightPageModal from "./DeleteInsightPageModal";

enum RepoLookupError {
  Initial = 0,
  NotIndexed = 1,
  Invalid = 3,
  Error = 4,
}

interface InsightPageProps {
  edit?: boolean;
  insight?: DbUserInsight;
  pageRepos?: DbRepo[];
}

const InsightPage = ({ edit, insight, pageRepos }: InsightPageProps) => {
  const { sessionToken, providerToken } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pageHref = router.asPath;
  const [reposIds, setReposIds] = useState<number[]>([]);
  const { data: repoListData } = useRepositories(reposIds);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf("?")));
    if (router.query.selectedRepos) {
      setRepos(JSON.parse(router.query.selectedRepos as string) || []);
    } else if (searchParams.has("selectedReposIDs")) {
      setReposIds(JSON.parse(searchParams.get("selectedReposIDs") as string) || []);
      setRepos(repoListData);
    }
  }, [repoListData, router.query.selectedRepos, pageHref]);

  const { data, addMember, deleteMember, updateMember } = useInsightMembers(insight?.id || 0);

  const members =
    data &&
    data.map((member) => ({
      ...member,
      email: member.invitation_email,
      avatarUrl: !!member.user_id ? getAvatarById(String(member.user_id)) : "",
    }));

  const insightOwner: TeamMemberData = {
    insight_id: Number(insight?.id),
    email: String(insight?.user.email),
    id: String(insight?.user.id),

    name: String(insight?.user.name || insight?.user.login),
    avatarUrl: getAvatarByUsername(String(insight?.user.login)),
    access: "owner",
  };

  // Loading States
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const [name, setName] = useState(insight?.name || "");
  const [isNameValid, setIsNameValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [repoHistory, setRepoHistory] = useState<DbRepo[]>([]);
  const [addRepoError, setAddRepoError] = useState<RepoLookupError>(RepoLookupError.Initial);
  const [isPublic, setIsPublic] = useState(!!insight?.is_public);
  const insightRepoLimit = useStore((state) => state.insightRepoLimit);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repoSearchTerm, setRepoSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (pageRepos) {
      setRepos(pageRepos);
    }

    if (insight) {
      setIsPublic(insight.is_public);
    }
  }, [pageRepos, insight?.is_public]);

  const reposRemoved = repoHistory.map((repo) => {
    const [repoOwner, repoName] = repo.full_name.split("/");
    const totalPrs =
      (repo.open_prs_count || 0) +
      (repo.closed_prs_count || 0) +
      (repo.merged_prs_count || 0) +
      (repo.draft_prs_count || 0);

    return {
      orgName: repoOwner,
      repoName: repoName,
      totalPrs,
      avatar: getAvatarByUsername(repoOwner, 60),
      handleRemoveItem: () => { },
    };
  });

  const validateName = (name: string) => {
    if (!name || name.trim().length <= 3) return false;

    return true;
  };

  const handleOnNameChange = (value: string) => {
    setName(value);
    setIsNameValid(validateName(value));
  };

  const disableCreateButton = () => {
    if ((insight?.name && validateName(name)) || (repos.length && validateName(name))) return false;
    if (submitted) return true;
    if (!isNameValid) return true;

    return false;
  };

  const handleCreateInsightPage = async () => {
    setSubmitted(true);
    setCreateLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({
        name,
        repos: repos.map((repo) => ({ id: repo.id, fullName: repo.full_name })),
        // eslint-disable-next-line
        is_public: isPublic,
      }),
    });
    setCreateLoading(false);
    if (response.ok) {
      toast({ description: "Page created successfully", variant: "success" });
      setTimeout(() => {
        router.push("/hub/insights");
      }, 1000);
    }

    setSubmitted(false);
  };

  const handleUpdateInsightPage = async () => {
    setSubmitted(true);
    setCreateLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insight?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({
        name,
        repos: repos.map((repo) => ({ id: repo.id, fullName: repo.full_name })),
        // eslint-disable-next-line
        is_public: isPublic,
      }),
    });
    setCreateLoading(false);
    if (response && response.ok) {
      toast({ description: "Page updated successfully", variant: "success" });
      router.push("/hub/insights");
    } else {
      toast({ description: "An error occurred!", variant: "danger" });
    }

    setSubmitted(false);
  };

  const loadAndAddRepo = async (repoToAdd: string) => {
    setAddRepoError(RepoLookupError.Initial);

    const hasRepo = repos.find((repo) => `${repo.full_name}` === repoToAdd);

    if (hasRepo) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/repos/${repoToAdd}`);

      if (response.ok) {
        const addedRepo = (await response.json()) as DbRepo;

        setRepos((repos) => {
          return [...repos, addedRepo];
        });
        setAddRepoError(RepoLookupError.Initial);
        setRepoSearchTerm("");
      } else {
        const publicRepoResponse = await fetch(`https://api.github.com/repos/${repoToAdd}`);

        if (publicRepoResponse.ok) {
          const publicRepo = await publicRepoResponse.json();

          // create a stub repo to send to API
          const addedRepo = {
            id: publicRepo.id,
            full_name: publicRepo.full_name,
          } as DbRepo;

          setRepos((repos) => {
            return [...repos, addedRepo];
          });
          setAddRepoError(RepoLookupError.Initial);
          setRepoSearchTerm("");
        } else {
          setAddRepoError(RepoLookupError.Invalid);
        }
      }
    } catch {
      setAddRepoError(RepoLookupError.Error);
    }
  };

  const handleAddRepository = async () => {
    await loadAndAddRepo(repoSearchTerm);
  };

  const handleReAddRepository = async (repoAdded: string) => {
    try {
      await loadAndAddRepo(repoAdded);

      setRepoHistory((historyRepos) => {
        return historyRepos.filter((repo) => `${repo.full_name}` !== repoAdded);
      });
    } catch (e) { }
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
      return <Error errorMessage="There was error retrieving this repository." />;
    }

    if (code === RepoLookupError.Invalid) {
      return <Error errorMessage="This repository entered is invalid." />;
    }

    if (code === RepoLookupError.NotIndexed) {
      return <RepoNotIndexed />;
    }

    return <></>;
  };

  const handleDeleteInsightPage = async () => {
    setSubmitted(true);
    setDeleteLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insight?.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    setDeleteLoading(false);
    if (response.ok) {
      toast({ description: "Page deleted successfully!", variant: "success" });
      setIsModalOpen(false);
      router.push("/hub/insights");
    }

    setSubmitted(false);
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
  };

  const updateSuggestionsDebounced = useDebounce(async () => {
    setCreateLoading(true);

    const req = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        `${repoSearchTerm} in:name in:repo:owner/name sort:updated`
      )}`,
      {
        ...(providerToken
          ? {
            headers: {
              Authorization: `Bearer ${providerToken}`,
            },
          }
          : {}),
      }
    );

    setCreateLoading(false);
    if (req.ok) {
      const res = await req.json();
      const suggestions = res.items.map((item: any) => item.full_name);
      setSuggestions(suggestions);
    }
  }, 250);

  useEffect(() => {
    setSuggestions([]);
    if (!repoSearchTerm) return;
    updateSuggestionsDebounced();
  }, [repoSearchTerm]);

  const staticSuggestedRepos: RepoCardProfileProps[] = [
    {
      avatar: "https://avatars.githubusercontent.com/u/57568598?s=200&v=4",
      prCount: 8,
      repoName: "insights",
      issueCount: 87,
      orgName: "open-sauced",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/59704711?s=200&v=4",
      prCount: 26,
      repoName: "cli",
      issueCount: 398,
      orgName: "cli",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/42048915?s=200&v=4",
      prCount: 100,
      repoName: "deno",
      issueCount: 1200,
      orgName: "denoland",
    },
  ];

  return (
    <section className="flex flex-col justify-center w-full py-4 xl:flex-row xl:gap-20 xl:pl-28 ">
      <div className="flex flex-col gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            {edit ? "Update" : "Create New"} Insight Page
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

          <TextInput placeholder="Page Name (ex: My Team)" value={name} handleChange={handleOnNameChange} />
          {/* <Text>insights.opensauced.pizza/pages/{username}/{`{pageId}`}/dashboard</Text> */}
        </div>

        <div className="flex flex-col gap-4 py-6 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Add Repositories
          </Title>
          <Search
            isLoading={createLoading}
            placeholder="Repository Full Name (ex: open-sauced/open-sauced)"
            className="!w-full text-md text-gra"
            name={"query"}
            suggestions={suggestions}
            onChange={(value) => setRepoSearchTerm(value)}
            onSearch={(search) => setRepoSearchTerm(search as string)}
          />

          <div>
            <Button disabled={repos.length === insightRepoLimit} onClick={handleAddRepository} variant="outline">
              Add Repository
            </Button>
          </div>

          <SuggestedRepositoriesList
            reposData={staticSuggestedRepos}
            onAddRepo={(repo) => {
              loadAndAddRepo(repo);
            }}
          />
        </div>

        <div>{getRepoLookupError(addRepoError)}</div>

        {edit && (
          <div className="pt-12 mt-12 border-t border-light-slate-8">
            <TeamMembersConfig
              onUpdateMember={(id, access) => updateMember(id, access)}
              onDeleteMember={deleteMember}
              onAddMember={addMember}
              members={[insightOwner, ...members]}
            />
          </div>
        )}

        {edit && (
          <div className="flex flex-col gap-4 py-6 border-t border-b border-light-slate-8">
            <Title className="!text-1xl !leading-none py-6" level={4}>
              Danger Zone
            </Title>

            <div className="flex flex-col p-6 rounded-2xl bg-light-slate-4">
              <Title className="!text-1xl !leading-none !border-light-slate-8 border-b pb-4" level={4}>
                Delete Page
              </Title>
              <Text className="my-4">Once you delete a page, you&#39;re past the point of no return.</Text>

              <div>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="default"
                  className="border bg-light-red-6 border-light-red-8 hover:bg-light-red-7 text-light-red-10"
                >
                  Delete page
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="top-0 py-4 mt-5 lg:sticky md:mt-0 lg:py-0">
        <RepositoriesCart
          loading={createLoading}
          edit={edit}
          hasItems={repos.length > 0}
          handleCreatePage={handleCreateInsightPage}
          handleUpdatePage={handleUpdateInsightPage}
          handleAddToCart={handleReAddRepository}
          history={reposRemoved}
          createPageButtonDisabled={disableCreateButton()}
        >
          {repos.map((repo) => {
            const [repoOwner, repoName] = repo.full_name.split("/");
            const totalPrs =
              (repo.open_prs_count || 0) +
              (repo.closed_prs_count || 0) +
              (repo.merged_prs_count || 0) +
              (repo.draft_prs_count || 0);

            return (
              <RepositoryCartItem
                key={`repo_${repo.id}`}
                avatar={getAvatarByUsername(repoOwner, 60)}
                handleRemoveItem={() => handleRemoveRepository(repo.id)}
                orgName={repoOwner}
                repoName={repoName}
                totalPrs={totalPrs}
              />
            );
          })}
        </RepositoriesCart>
        <div className="flex flex-col justify-between mt-8 pt-8 border-t">
          <Title className="!text-1xl !leading-none mb-4 mt-8" level={4}>
            Page Visibility
          </Title>

          <div className="flex justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="w-6 h-6 text-light-slate-9" />
              <Text className="pl-2">Make this page publicly visible</Text>
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
      </div>

      <DeleteInsightPageModal
        isLoading={deleteLoading}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        submitted={submitted}
        pageName={name}
        onConfirm={handleDeleteInsightPage}
        onClose={handleOnModalClose}
      />
    </section>
  );
};

export default InsightPage;