import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";
import { FiAlertOctagon, FiCheckCircle } from "react-icons/fi";
import useFetchAllContributors from "lib/hooks/useFetchAllContributors";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";

import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import Header from "components/organisms/Header/header";
import AddContributorsHeader from "components/AddContributorsHeader/add-contributors-header";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Button from "components/shared/Button/button";
import { searchUsers } from "lib/hooks/search-users";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

// TODO: Move to a shared file
export function isListId(listId: string) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(listId);
}

interface AddContributorsPageProps {
  list: DbUserList;
  workspaceId: string;
  initialCount: number;
  timezoneOption: { timezone: string }[];
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { listId, workspaceId } = ctx.params as { listId: string; workspaceId?: string };
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const userId = Number(session?.user.user_metadata.sub);

  if (!isListId(listId)) {
    return {
      notFound: true,
    };
  }

  const { data: list, error: listError } = await fetchApiData<DBList>({
    path: `workspaces/${workspaceId}/userLists/${listId}`,
    bearerToken,
    // TODO: remove this in another PR for cleaning up fetchApiData
    pathValidator: () => true,
  });

  // Only the list owner should be allowed to add contributors
  if (listError?.status === 404) {
    return {
      notFound: true,
    };
  }

  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const canEdit = !!workspaceMembers?.data?.find(
    (member) => ["owner", "editor"].includes(member.role) && member.user_id === userId
  );

  if (!canEdit) {
    return {
      notFound: true,
    };
  }

  const { data: initialData, error: initialError } = await fetchApiData<any>({
    path: `workspaces/${workspaceId}/userLists/${listId}/contributors`,
    bearerToken,
    pathValidator: () => true,
  });

  return {
    props: {
      list,
      workspaceId,
      initialCount: initialData.meta.itemCount,
    },
  };
};

interface ContributorsAddedModalProps {
  list: DbUserList;
  workspaceId?: string;
  contributorCount: number;
  isOpen: boolean;
  onClose: () => void;
}

interface ErrorModalProps {
  list: DbUserList;
  workspaceId?: string;
  isOpen: boolean;
  onRetry: () => void;
  onClose: () => void;
}

const ErrorModal = ({ list, workspaceId, isOpen, onRetry, onClose }: ErrorModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent onEscapeKeyDown={(event) => onClose()} className="grid place-content-center">
        <div className="flex flex-col max-w-xs gap-6 w-full p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="flex items-center justify-center p-3 bg-red-100 rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-full">
                <FiAlertOctagon className="text-red-800" size={24} />
              </span>
            </span>
            <span className="w-full text-center">
              <Title level={3} className="text-lg">
                Something went wrong
              </Title>
            </span>
            <Text className="leading-tight text-center text-light-slate-9">
              We couldn&apos;t add the new contributors to your list. Please try again.
            </Text>
          </div>
          <div className="flex gap-3">
            <Button
              href={`/workspaces/${workspaceId}/contributor-insights/${list.id}/overview`}
              className="justify-center flex-1"
              variant="default"
            >
              Go Back to List
            </Button>
            <Button onClick={onRetry} className="justify-center flex-1" variant="primary">
              Try again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ContributorsAddedModal = ({
  list,
  workspaceId,
  contributorCount,
  isOpen,
  onClose,
}: ContributorsAddedModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent onEscapeKeyDown={(event) => onClose()} className="grid place-content-center">
        <div className="flex flex-col max-w-xs gap-6 w-full p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="flex items-center justify-center p-3 bg-green-100 rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-green-300 rounded-full">
                <FiCheckCircle className="text-green-800" size={24} />
              </span>
            </span>
            <span className="w-full text-center">
              <Title level={3} className="text-lg">
                You&apos;ve added {contributorCount} new {contributorCount > 1 ? "contributors" : "contributor"}
              </Title>
            </span>
            <Text className="leading-tight text-center text-light-slate-9">
              You can now get insights into their activity from your list dashboard.
            </Text>
          </div>
          <div className="flex gap-3">
            <Button onClick={onClose} className="justify-center flex-1" variant="default">
              Add More
            </Button>
            <Button
              href={`/workspaces/${workspaceId}/contributor-insights/${list.id}/edit`}
              className="justify-center flex-1"
              variant="primary"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const useContributorSearch = (makeRequest: boolean) => {
  const [contributorSearchTerm, setContributorSearchTerm] = useState<string | undefined>();

  const { data, meta, isLoading, setPage } = useFetchAllContributors(
    {
      contributor: contributorSearchTerm,
    },
    {
      revalidateOnFocus: false,
    },
    makeRequest
  );

  return {
    setContributorSearchTerm,
    data,
    meta,
    isLoading,
    setPage,
  };
};

const EmptyState = () => (
  <div className="grid place-content-center w-full bg-white p-4 md:p-8">
    <Image src="/assets/contributors-empty-state.svg" alt="" width="300" height="298" className="object-contain" />
    <p className="relative bottom-16 text-center text-light-slate-10">Search for contributors to add to your list</p>
  </div>
);

const AddContributorsToList = ({ list, initialCount, workspaceId, timezoneOption }: AddContributorsPageProps) => {
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);

  const { sessionToken, providerToken } = useSupabaseAuth();
  const [contributorsAdded, setContributorsAdded] = useState(false);
  const [contributorsAddedError, setContributorsAddedError] = useState(false);
  const [contributors, setContributors] = useState<DbPRContributor[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<GhUser[]>([]);

  const addContributorsToList = async () => {
    const { error } = await fetchApiData({
      path: `workspaces/${workspaceId}/userLists/${list.id}/contributors`,
      body: {
        contributors: selectedContributors.map((c) => {
          return { id: c.user_id };
        }),
      },
      method: "POST",
      bearerToken: sessionToken!,
      pathValidator: validateListPath,
    });

    if (error) {
      setContributorsAddedError(true);
    } else {
      setContributorsAdded(true);
    }
  };

  const onAllChecked = (state: boolean) => {
    if (state) {
      setSelectedContributors(contributors);
    } else {
      setSelectedContributors([]);
    }
  };

  const onChecked = (state: boolean, contributor: DbPRContributor) => {
    if (state) {
      setSelectedContributors((prev) => [...prev, contributor]);
    } else {
      setSelectedContributors(selectedContributors.filter((selected) => selected.user_id !== contributor.user_id));
    }
  };

  async function onSearch(searchTerm: string | undefined) {
    if (searchTerm && searchTerm.length >= 3) {
      await updateSuggestions(searchTerm);
    }
  }

  async function updateSuggestions(contributor: string) {
    setSuggestions([]);

    const response = await searchUsers(contributor, providerToken);

    if (response) {
      const suggestions = response.data.map((item) => item.login);
      setSuggestions(suggestions);
      setSearchResults(response.data);
    }
  }

  const onSearchSelect = (username: string) => {
    const contributorInfo = searchResults.find((item) => item.login === username);

    if (contributorInfo) {
      const contributor: DbPRContributor = {
        user_id: contributorInfo.id,
        author_login: contributorInfo.login,
        username: contributorInfo.login,
        updated_at: "",
      };
      onChecked(true, contributor);

      setContributors((prev) => [...prev, contributor]);
    }
  };

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <div className="info-container container w-full min-h-[6.25rem] md:px-16">
        <Header classNames="md:!px-0">
          <AddContributorsHeader
            list={list}
            workspaceId={workspaceId}
            selectedContributorsIds={selectedContributors.map(({ user_id }) => user_id)}
            onAddToList={addContributorsToList}
            onSearch={onSearch}
            searchSuggestions={suggestions}
            onSearchSelect={onSearchSelect}
          />
        </Header>
        <ContributorListTableHeaders
          selected={selectedContributors.length > 0 && selectedContributors.length === contributors.length}
          handleOnSelectAllContributor={onAllChecked}
        />
        {contributors.length > 0 ? (
          <ContributorTable
            selectedContributors={selectedContributors}
            topic={"*"}
            handleSelectContributors={onChecked}
            contributors={contributors as DbPRContributor[]}
          />
        ) : (
          <EmptyState />
        )}
      </div>
      {contributorsAdded && (
        <ContributorsAddedModal
          list={list}
          contributorCount={selectedContributors.length}
          isOpen={contributorsAdded}
          workspaceId={workspaceId}
          onClose={() => {
            setContributorsAdded(false);
            setContributors([]);
            setSelectedContributors([]);
          }}
        />
      )}
      {contributorsAddedError && (
        <ErrorModal
          list={list}
          workspaceId={workspaceId}
          isOpen={true}
          onRetry={() => {
            setContributorsAddedError(false);
            addContributorsToList();
          }}
          onClose={() => {
            setContributorsAddedError(false);
          }}
        />
      )}
    </WorkspaceLayout>
  );
};

export default AddContributorsToList;
