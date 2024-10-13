import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useDebounce } from "rooks";
import Button from "components/shared/Button/button";
import TextInput from "components/atoms/TextInput/text-input";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";
import RepoNotIndexed from "components/organisms/Repositories/repository-not-indexed";
import useRepositories from "lib/hooks/api/useRepositories";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { generateRepoParts, getAvatarByUsername } from "lib/utils/github";
import Error from "components/atoms/Error/Error";
import Search from "components/atoms/Search/search";
import { useToast } from "lib/hooks/useToast";
import { useFetchInsightRecommendedRepositories } from "lib/hooks/useFetchOrgRecommendations";
import { RepoCardProfileProps } from "components/molecules/RepoCardProfile/repo-card-profile";
import SingleSelect from "components/atoms/Select/single-select";
import { fetchApiData } from "helpers/fetchApiData";
import { useGetUserWorkspaces } from "lib/hooks/api/useGetUserWorkspaces";
import SuggestedRepositoriesList from "../SuggestedRepoList/suggested-repo-list";

// lazy import DeleteInsightPageModal and TeamMembersConfig component to optimize bundle size they don't load on initial render
const DeleteInsightPageModal = dynamic(() => import("./DeleteInsightPageModal"));
const TransferInsightModal = dynamic(() => import("components/Workspaces/TransferInsightModal"));

const enum RepoLookupError {
  Initial = 0,
  NotIndexed = 1,
  Invalid = 3,
  Error = 4,
}

const enum OrgLookupError {
  Initial = 0,
  Invalid = 1,
  Error = 2,
}

interface InsightPageProps {
  edit?: boolean;
  insight?: DbUserInsight;
  pageRepos?: DbRepo[];
  workspaceId?: string;
}
const staticSuggestedRepos: RepoCardProfileProps[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/57568598?s=200&v=4",
    prCount: 8,
    repoName: "app",
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

const InsightPage = ({ edit, insight, pageRepos, workspaceId }: InsightPageProps) => {
  const { sessionToken, providerToken, user } = useSupabaseAuth();

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

  const { data: recommendedRepos, isLoading } = useFetchInsightRecommendedRepositories();

  // Loading States
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [addRepoLoading, setAddRepoLoading] = useState({ repoName: "", isAddedFromCart: false, isLoading: false });

  const [name, setName] = useState(insight?.name || "");
  const [organization, setOrganization] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [repoHistory, setRepoHistory] = useState<DbRepo[]>([]);
  const [addRepoError, setAddRepoError] = useState<RepoLookupError>(RepoLookupError.Initial);
  const [syncOrganizationError, setSyncOrganizationError] = useState<OrgLookupError>(OrgLookupError.Initial);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repoSearchTerm, setRepoSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { data: workspacesData, isLoading: workspacesLoading } = useGetUserWorkspaces();
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>(workspaceId!);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  useEffect(() => {
    if (workspaceId && !workspacesLoading) {
      const filteredWorkspaces = workspacesData?.data?.filter((workspace) =>
        workspace.members.find(
          (member) => member.user_id === Number(user?.user_metadata.sub) && ["owner", "editor"].includes(member.role)
        )
      );

      setOptions(
        Array.from(filteredWorkspaces!, (workspace) => {
          return { label: workspace.name, value: workspace.id };
        })
      );
    }
  }, [workspacesData]);

  const recommendedReposWithoutSelected =
    recommendedRepos && recommendedRepos.length > 0
      ? recommendedRepos
          .filter((repo) => !repos.find((selectedRepo) => selectedRepo.id === repo.id))
          .map((repo) => {
            const [orgName, repoName] = repo.full_name.split("/");
            const totalPrs = (repo.open_prs_count || 0) + (repo.closed_prs_count || 0) + (repo.merged_prs_count || 0);
            const avatar = getAvatarByUsername(orgName, 60);
            const totalIssues = repo.issues || 0;

            return {
              orgName,
              repoName,
              totalPrs,
              avatar,
              totalIssues,
            };
          })
          .slice(0, 3)
      : staticSuggestedRepos;

  useEffect(() => {
    if (pageRepos) {
      setRepos(pageRepos);
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
      handleRemoveItem: () => {},
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

  const handleOnOrganizationChange = (value: string) => {
    setOrganization(value);
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

    if (!sessionToken || !user) {
      toast({ description: "You must be logged in to create a page", variant: "danger" });
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${workspaceId ? `workspaces/${workspaceId}` : user}/insights`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          name,
          repos: repos.map((repo) => ({ id: repo.id, fullName: repo.full_name })),
          is_public: true,
        }),
      }
    );
    setCreateLoading(false);
    if (response.ok) {
      const { insight_id } = await response.json();
      toast({ description: "Page created successfully", variant: "success" });
      router.push(`/workspaces/${workspaceId}/repository-insights/${insight_id}/dashboard`);
    }

    setSubmitted(false);
  };

  const handleUpdateInsightPage = async () => {
    setSubmitted(true);
    setCreateLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}/insights/${insight?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          name,
          repos: repos.map((repo) => ({ id: repo.id, fullName: repo.full_name })),
          // eslint-disable-next-line
          is_public: true,
        }),
      }
    );
    setCreateLoading(false);
    if (response && response.ok) {
      toast({ description: "Page updated successfully", variant: "success" });
      router.push(`/workspaces/${workspaceId}/repository-insights/${insight?.id}/dashboard`);
    } else {
      toast({ description: "An error occurred!", variant: "danger" });
    }

    setSubmitted(false);
  };

  const addSuggestedRepo = (repoToAdd: string) => {
    const hasRepo = repos.find((repo) => `${repo.full_name}` === repoToAdd);

    if (hasRepo) {
      return;
    }

    const actualRepo = recommendedRepos?.find((repo) => repo.full_name === repoToAdd);

    if (!actualRepo) {
      loadAndAddRepo(repoToAdd);
      return;
    }

    setRepos((repos) => {
      return [...repos, actualRepo as unknown as DbRepo];
    });
  };

  const loadAndAddRepo = async (repoToAdd: string, isAddedFromCart = false) => {
    setAddRepoError(RepoLookupError.Initial);

    const hasRepo = repos.find((repo) => `${repo.full_name}` === repoToAdd);

    if (hasRepo) {
      return;
    }

    const { apiPaths, isValidUrl } = generateRepoParts(repoToAdd);

    if (!isValidUrl) {
      setAddRepoError(RepoLookupError.Invalid);
      return;
    }

    const { repoFullName } = apiPaths;

    setAddRepoLoading({ repoName: repoToAdd, isAddedFromCart, isLoading: true });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/repos/${repoFullName}`);
      setAddRepoLoading({ repoName: repoToAdd, isAddedFromCart, isLoading: false });

      if (response.ok) {
        const addedRepo = (await response.json()) as DbRepo;

        setRepos((repos) => {
          return [...repos, addedRepo];
        });
        setAddRepoError(RepoLookupError.Initial);
        setRepoSearchTerm("");
      } else {
        const publicRepoResponse = await fetch(`https://api.github.com/repos/${repoFullName}`);

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
      setAddRepoLoading({ repoName: repoToAdd, isAddedFromCart, isLoading: false });
      setAddRepoError(RepoLookupError.Error);
    }
  };

  const handleAddRepository = async () => {
    await loadAndAddRepo(repoSearchTerm);
  };

  const handleReAddRepository = async (repoAdded: string) => {
    const existInSuggestions = recommendedRepos.find((repo) => `${repo.full_name}` === repoAdded);

    if (existInSuggestions) {
      setRepoHistory((historyRepos) => {
        return historyRepos.filter((repo) => `${repo.full_name}` !== repoAdded);
      });

      addSuggestedRepo(repoAdded);
      return;
    }

    try {
      await loadAndAddRepo(repoAdded, true);

      setRepoHistory((historyRepos) => {
        return historyRepos.filter((repo) => `${repo.full_name}` !== repoAdded);
      });
    } catch (e) {}
  };

  const handleRemoveRepository = (id: string) => {
    setRepos((addedRepos) => {
      return addedRepos.filter((repo) => repo.id !== id);
    });

    const repoRemoved = repos.find((repo) => repo.id === id);

    const repoAlreadyInHistory = repoHistory.find((repo) => repo.id === id);
    if (repoAlreadyInHistory) {
      return;
    }

    setRepoHistory((historyRepos) => {
      return [...historyRepos, repoRemoved as DbRepo];
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

    return null;
  };

  const getOrganizationLookupError = (code: OrgLookupError) => {
    if (code === OrgLookupError.Error) {
      return <Error errorMessage="There was error retrieving this organization's public repositories." />;
    }

    if (code === OrgLookupError.Invalid) {
      return <Error errorMessage="This organization entered is invalid." />;
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
      router.push(`/workspaces/${workspaceId}/repository-insights`);
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

  const handleAddOrganizationRepositories = async () => {
    setSyncOrganizationError(OrgLookupError.Initial);

    const orgReposResponse = await fetch(
      `https://api.github.com/orgs/${organization}/repos?type=public&sort=pushed&direction=desc`,
      {
        headers: providerToken
          ? {
              Authorization: `Bearer ${providerToken}`,
            }
          : {},
      }
    );

    if (orgReposResponse.ok) {
      const orgReposData = await orgReposResponse.json();

      // create a stub repo to send to API
      const orgRepos = orgReposData
        .filter(
          (orgRepo: { id: number; full_name: string }) => !repos.find((repo) => orgRepo.full_name === repo.full_name)
        )
        .slice(0, 10)
        .map((orgRepo: { id: number; full_name: string }) => ({
          id: orgRepo.id,
          full_name: orgRepo.full_name,
        })) as DbRepo[];

      setRepos((repos) => {
        return [...repos, ...orgRepos];
      });

      setSyncOrganizationError(OrgLookupError.Initial);
      setOrganization("");
    } else {
      if (orgReposResponse.status === 404) {
        setSyncOrganizationError(OrgLookupError.Invalid);
      } else {
        setSyncOrganizationError(OrgLookupError.Error);
      }
    }
  };

  const transferWorkspace = async () => {
    const selectedOption = options.find((opt) => opt.value === selectedWorkspace);
    const response = await fetchApiData({
      method: "POST",
      path: `workspaces/${workspaceId!}/insights/${selectedWorkspace}`,
      body: {
        id: insight?.id,
      },
      bearerToken: sessionToken!,
      pathValidator: () => true,
    });
    if (response.error) {
      toast({ description: "An error has occurred. Try again.", variant: "success" });
      return;
    }

    toast({ description: `Moved insight to ${selectedOption?.label}`, variant: "success" });
    router.push(`/workspaces/${selectedWorkspace}/repository-insights/${insight?.id}/dashboard`);
  };

  useEffect(() => {
    setSuggestions([]);
    if (!repoSearchTerm) return;
    updateSuggestionsDebounced();
  }, [repoSearchTerm]);

  return (
    <section className="flex flex-col justify-center w-full py-4 xl:flex-row xl:gap-20 xl:pl-28 ">
      <div className="flex flex-col gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            {edit ? "Update" : "Create New"} {workspaceId ? "Repository Insight" : "Insight Page"}
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
        </div>

        <div className="flex flex-col gap-4 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Sync GitHub Organization
          </Title>

          <div className="w-full flex gap-3 md:items-center flex-col md:flex-row">
            <TextInput
              placeholder="Organization Name (ex: open-sauced)"
              value={organization}
              handleChange={handleOnOrganizationChange}
            />
          </div>
          <div>
            <Button
              disabled={organization.trim().length < 3}
              onClick={handleAddOrganizationRepositories}
              variant="outline"
              className="shrink-0 w-max"
            >
              Sync Organization
            </Button>
          </div>

          <div>{getOrganizationLookupError(syncOrganizationError)}</div>
        </div>

        <div className="flex flex-col gap-4 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Add Repository
          </Title>
          <Search
            isLoading={createLoading}
            placeholder="Repository URL or Full Name (ex: open-sauced/open-sauced)"
            labelText="Repository URL or Full Name (ex: open-sauced/open-sauced)"
            className="!w-full text-md text-gra"
            name={"query"}
            value={repoSearchTerm}
            suggestions={suggestions}
            onChange={(value) => setRepoSearchTerm(value)}
            onSearch={(search) => setRepoSearchTerm(search as string)}
          />

          <div className="w-full flex gap-3 md:items-center flex-col md:flex-row">
            <Button
              disabled={addRepoLoading.repoName === repoSearchTerm && addRepoLoading.isLoading}
              loading={addRepoLoading.repoName === repoSearchTerm && addRepoLoading.isLoading}
              onClick={handleAddRepository}
              variant="outline"
              className="shrink-0 w-max"
            >
              Add Repository
            </Button>
          </div>

          <div className="py-4">
            <SuggestedRepositoriesList
              reposData={recommendedReposWithoutSelected}
              loadingData={addRepoLoading}
              isLoading={isLoading}
              onAddRepo={(repo) => {
                addSuggestedRepo(repo);
              }}
            />
          </div>
        </div>

        <div>{getRepoLookupError(addRepoError)}</div>

        {edit && (
          <div className="flex flex-col gap-8 py-8 px-4">
            <Title className="!text-xl !leading-none !text-red-700 font-semibold" level={4}>
              Danger Zone
            </Title>

            <div className="flex flex-col p-6 rounded-2xl bg-light-slate-4">
              {workspaceId && (
                <section className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Title level={4}>Transfer to other Workspace</Title>
                    <Text>Move this insight to another workspace where you are an owner or editor.</Text>
                  </div>
                  <SingleSelect
                    isSearchable
                    placeholder={options.find((opt) => opt.value === workspaceId)?.label}
                    options={options}
                    onValueChange={(value: string) => {
                      setSelectedWorkspace(value);
                    }}
                  />
                  <Button
                    onClick={() => setIsTransferModalOpen(true)}
                    disabled={selectedWorkspace === workspaceId}
                    variant="primary"
                    className="w-fit"
                  >
                    Transfer
                  </Button>
                </section>
              )}
              <Title className="!text-1xl !leading-none pt-6" level={4}>
                Delete Page
              </Title>
              <Text className="my-4">Once you delete a page, you&#39;re past the point of no return.</Text>

              <div>
                <Button onClick={() => setIsModalOpen(true)} variant="destructive">
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
          history={reposRemoved.filter(
            (repo) => !repos.find((r) => r.full_name === `${repo.orgName}/${repo.repoName}`)
          )}
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
      </div>

      {workspaceId && (
        <TransferInsightModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          handleTransfer={transferWorkspace}
          insightName={insight?.name || ""}
          currentWorkspaceName={options.find((opt) => opt.value === workspaceId)?.label || ""}
          destinationWorkspaceName={options.find((opt) => opt.value === selectedWorkspace)?.label || ""}
        />
      )}

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
