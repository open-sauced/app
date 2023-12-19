import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiCopy } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { usePostHog } from "posthog-js/react";
import { useRouter } from "next/router";

import { useToast } from "lib/hooks/useToast";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import HubContributorsPageLayout from "layouts/hub-contributors";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import Header from "components/organisms/Header/header";
import HubContributorsHeader from "components/molecules/HubContributorsHeader/hub-contributors-header";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import TextInput from "components/atoms/TextInput/text-input";
import Button from "components/atoms/Button/button";
import { searchUsers } from "lib/hooks/search-users";

interface CreateListPayload {
  name: string;
  is_public: boolean;
  contributors: { id: number; login: string }[];
}

const NewListCreationPage = () => {
  const router = useRouter();
  const contributorIds = router.query.contributors as string;
  const { toast } = useToast();
  const posthog = usePostHog();
  const { sessionToken, providerToken } = useSupabaseAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [listId, setListId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(undefined);
  const [contributors, setContributors] = useState<DbPRContributor[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<GhUser[]>([]);

  useEffect(() => {
    if (!title && router.query.name) {
      setTitle(router.query.name as string);
    }

    if (router.query.public === "true") {
      setIsPublic(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (contributorIds) {
      setSelectedContributors(JSON.parse(contributorIds) as DbPRContributor[]);
    }
  }, [router.query]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleOnSelectAllChecked = (state: boolean) => {
    if (state) {
      setSelectedContributors(contributors);
    } else {
      setSelectedContributors([]);
    }
  };

  const handleOnSelectChecked = (state: boolean, contributor: DbPRContributor) => {
    if (state) {
      setSelectedContributors((prev) => [...prev, contributor]);
    } else {
      setSelectedContributors(selectedContributors.filter((selected) => selected.user_id !== contributor.user_id));
    }
  };

  const handleCreateList = async (payload: CreateListPayload) => {
    if (!payload.name) {
      toast({
        description: "List name is required",
        variant: "danger",
      });
      return;
    }

    setCreateLoading(true);
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
        setListId(data.id);
        setIsSuccess(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setCreateLoading(false);
      setIsOpen(true);
    }
  };

  const handleOnListCreate = () => {
    const payload: CreateListPayload = {
      name: title,
      is_public: isPublic,
      contributors: selectedContributors.map((contributor) => ({
        id: contributor.user_id,
        login: contributor.author_login,
      })),
    };

    handleCreateList(payload);
  };

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    posthog!.capture("clicked: List page link copied");

    try {
      await navigator.clipboard.writeText(url);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleSelectTimezone = (selected: string) => {
    setSelectedTimezone(selected);
  };

  async function onSearch(searchTerm: string | undefined) {
    if (searchTerm && searchTerm.length >= 3) {
      await updateSuggestions(searchTerm);
    }
  }

  const updateSuggestions = async (contributor: string) => {
    setSuggestions([]);

    const response = await searchUsers(contributor, providerToken);

    if (response) {
      const suggestions = response.data.map((item) => item.login);
      setSuggestions(suggestions);
      setSearchResults(response.data);
    }
  };

  const onSearchSelect = (username: string) => {
    const contributorInfo = searchResults.find((item) => item.login === username);

    if (contributorInfo) {
      const contributor: DbPRContributor = {
        user_id: contributorInfo.id,
        author_login: contributorInfo.login,
        username: contributorInfo.login,
        updated_at: "",
      };
      handleOnSelectChecked(true, contributor);

      setContributors((prev) => [...prev, contributor]);
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <HubContributorsPageLayout>
      <Dialog open={isOpen}>
        <div className="info-container container w-full min-h-[6.25rem]">
          <Header>
            <HubContributorsHeader
              setTimezoneFilter={handleSelectTimezone}
              isPublic={isPublic}
              handleToggleIsPublic={() => setIsPublic(!isPublic)}
              loading={createLoading}
              selectedContributorsIds={selectedContributors.map((contributor) => contributor.user_id)}
              timezoneOptions={[]}
              timezone={selectedTimezone}
              title={title}
              onAddToList={handleOnListCreate}
              onTitleChange={(title) => setTitle(title)}
              onSearch={onSearch}
              searchSuggestions={suggestions}
              onSearchSelect={onSearchSelect}
            />
          </Header>
        </div>
        <div className="lg:min-w-[1150px] px-4 md:px-16 pb-8">
          <ContributorListTableHeaders
            selected={selectedContributors.length > 0 && selectedContributors.length === contributors.length}
            handleOnSelectAllContributor={handleOnSelectAllChecked}
          />
          <ContributorTable
            selectedContributors={selectedContributors}
            topic={"*"}
            handleSelectContributors={handleOnSelectChecked}
            contributors={contributors}
            noContributorsMessage="Search for contributors to add to your list"
          ></ContributorTable>
        </div>

        {/* Success and error state dialog section */}
        <DialogContent>
          {isSuccess ? (
            <div className="flex flex-col max-w-xs gap-6 w-max">
              <div className="flex flex-col items-center gap-2">
                <span className="flex items-center justify-center p-3 bg-green-100 rounded-full w-max">
                  <span className="flex items-center justify-center w-10 h-10 bg-green-300 rounded-full">
                    <FiCheckCircle className="text-green-800" size={24} />
                  </span>
                </span>
                <Title level={3} className="text-lg">
                  Your list has been created
                </Title>
                <Text className="leading-tight text-center text-light-slate-9">
                  You can now edit and track your new list in the pages tab, and get useful insights.
                </Text>
              </div>
              <div>
                <label>
                  <span className="text-sm text-light-slate-10">Share list link</span>
                  <div className="flex items-center gap-3 pr-3">
                    <TextInput
                      className="bg-white pointer-events-none"
                      value={`${window.location.origin}/lists/${listId}`}
                    />
                    <button
                      onClick={() => handleCopyToClipboard(`${window.location.origin}/lists/${listId}`)}
                      type="button"
                    >
                      <FiCopy className="text-lg" />
                    </button>
                  </div>
                </label>
              </div>
              <div className="flex gap-3">
                <Button href="/hub/lists" className="justify-center flex-1" variant="text">
                  Go Back to Pages
                </Button>
                <Button href={`/lists/${listId}/overview`} className="justify-center flex-1" variant="primary">
                  Go to List Page
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col max-w-xs gap-6 w-max">
              <div className="flex flex-col items-center gap-2">
                <span className="flex items-center justify-center p-3 bg-red-100 rounded-full w-max">
                  <span className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-full">
                    <AiOutlineWarning className="text-red-800" size={24} />
                  </span>
                </span>
                <Title level={3} className="text-lg">
                  Something went wrong
                </Title>
                <Text className="leading-tight text-center text-light-slate-9">
                  We couldn’t create your list. Please, try again in a few minutes.
                </Text>
              </div>

              <div className="flex gap-3">
                <Button href="/hub/lists" className="justify-center flex-1" variant="text">
                  Go Back to Pages
                </Button>
                <Button href={`/hub/lists`} className="justify-center flex-1" variant="primary">
                  Go to List Page
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </HubContributorsPageLayout>
  );
};

export default NewListCreationPage;
