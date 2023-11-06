import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";
import { FiAlertOctagon, FiCheckCircle } from "react-icons/fi";
import useFetchAllContributors from "lib/hooks/useFetchAllContributors";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import { timezones } from "lib/utils/timezones";

import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import HubContributorsPageLayout from "layouts/hub-contributors";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import Header from "components/organisms/Header/header";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import AddContributorsHeader from "components/AddContributorsHeader/add-contributors-header";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { Dialog, DialogContent } from "components/molecules/Dialog/dialog";
import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";
import Button from "components/atoms/Button/button";

// TODO: Move to a shared file
export function isListId(listId: string) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(listId);
}

interface AddContributorsPageProps {
  list: DbUserList;
  initialData: {
    meta: Meta;
    data: DbPRContributor[];
  };
  timezoneOption: { timezone: string }[];
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { listId } = ctx.params as { listId: string };
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const userId = Number(session?.user.user_metadata.sub);

  const fetchTimezone = fetchApiData<{ timezone: string }[]>({
    path: `lists/timezones`,
    bearerToken,
    pathValidator: validateListPath,
  });

  if (!isListId(listId)) {
    return {
      notFound: true,
    };
  }

  const [{ data: timezoneOptions }, { data: list, error: listError }] = await Promise.all([
    fetchTimezone,
    fetchApiData<DBList>({
      path: `lists/${listId}`,
      bearerToken,
      // TODO: remove this in another PR for cleaning up fetchApiData
      pathValidator: () => true,
    }),
  ]);

  // Only the list owner should be allowed to add contributors
  if (listError?.status === 404 || (list && list.user_id !== userId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      timezoneOption: timezoneOptions ? timezoneOptions : timezones,
    },
  };
};

interface ContributorsAddedModalProps {
  list: DbUserList;
  contributorCount: number;
  isOpen: boolean;
  onClose: () => void;
}

interface ErrorModalProps {
  list: DbUserList;
  isOpen: boolean;
  onRetry: () => void;
  onClose: () => void;
}

const ErrorModal = ({ list, isOpen, onRetry, onClose }: ErrorModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent onEscapeKeyDown={(event) => onClose()} className="grid place-content-center">
        <div className="flex flex-col max-w-xs gap-6 w-max p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="flex items-center justify-center p-3 bg-red-100 rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-full">
                <FiAlertOctagon className="text-red-800" size={24} />
              </span>
            </span>
            <Title level={3} className="text-lg">
              Something went wrong
            </Title>
            <Text className="leading-tight text-center text-light-slate-9">
              We couldn&apos;t add the new contributors to your list. Please try again.
            </Text>
          </div>
          <div className="flex gap-3">
            <Button href={`/lists/${list.id}/overview`} className="justify-center flex-1" variant="default">
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

const ContributorsAddedModal = ({ list, contributorCount, isOpen, onClose }: ContributorsAddedModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent onEscapeKeyDown={(event) => onClose()} className="grid place-content-center">
        <div className="flex flex-col max-w-xs gap-6 w-max p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="flex items-center justify-center p-3 bg-green-100 rounded-full w-max">
              <span className="flex items-center justify-center w-10 h-10 bg-green-300 rounded-full">
                <FiCheckCircle className="text-green-800" size={24} />
              </span>
            </span>
            <Title level={3} className="text-lg">
              You&apos;ve added {contributorCount} new {contributorCount > 1 ? "contributors" : "contributor"}
            </Title>
            <Text className="leading-tight text-center text-light-slate-9">
              You can now get insights into their activity from your list dashboard.
            </Text>
          </div>
          <div className="flex gap-3">
            <Button onClick={onClose} className="justify-center flex-1" variant="default">
              Add More
            </Button>
            <Button href={`/lists/${list.id}/overview`} className="justify-center flex-1" variant="primary">
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
  const [timezone, setTimezone] = useState<string | undefined>();

  const { data, meta, isLoading, setPage } = useFetchAllContributors(
    {
      timezone,
      contributor: contributorSearchTerm,
    },
    {
      revalidateOnFocus: false,
    },
    makeRequest
  );

  return {
    setContributorSearchTerm,
    timezone,
    setTimezone,
    data,
    meta,
    isLoading,
    setPage,
  };
};

const EmptyState = () => (
  <div className="flex flex-col overflow-hidden border rounded-md">
    <div className="grid place-content-center w-full bg-white">
      <Image src="/assets/contributors-empty-state.svg" alt="" width="507" height="504" className="object-contain" />
    </div>
  </div>
);

const AddContributorsToList = ({ list, timezoneOption }: AddContributorsPageProps) => {
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const [makeRequest, setMakeRequest] = useState(false);
  const { setContributorSearchTerm, timezone, setTimezone, data, meta, isLoading, setPage } =
    useContributorSearch(makeRequest);
  const { sessionToken } = useSupabaseAuth();
  const [contributorsAdded, setContributorsAdded] = useState(false);
  const [contributorsAddedError, setContributorsAddedError] = useState(false);

  const addContributorsToList = async () => {
    const { error } = await fetchApiData({
      path: `lists/${list.id}/contributors`,
      body: { contributors: selectedContributors.map(({ user_id }) => user_id) },
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

  // get all timezones from the api that exists in the dummy timezone list
  const timezoneList = timezones
    .filter((timezone) => {
      return timezoneOption.some((timezoneOption) => timezoneOption.timezone === timezone.value);
    })
    .map((timezone) => {
      return {
        label: timezone.text,
        value: timezone.value,
      };
    });
  const contributors =
    data?.length > 0
      ? data.map((contributor) => {
          return {
            author_login: contributor.login,
            username: contributor.login,
            updated_at: contributor.updated_at,
            user_id: contributor.id,
          };
        })
      : [];

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

  const onSelectTimeZone = (selected: string) => {
    setMakeRequest(true);
    setTimezone(selected);
  };

  function onSearch(searchTerm: string | undefined) {
    if (!timezone && (!searchTerm || searchTerm.length < 3)) {
      setMakeRequest(false);
    } else {
      setMakeRequest(true);
      setContributorSearchTerm(searchTerm);
    }
  }

  return (
    <HubContributorsPageLayout>
      <div className="info-container container w-full min-h-[6.25rem]">
        <Header>
          <AddContributorsHeader
            list={list}
            setTimezoneFilter={onSelectTimeZone}
            selectedContributorsIds={selectedContributors.map(({ user_id }) => user_id)}
            timezoneOptions={timezoneList}
            timezone={timezone}
            onAddToList={addContributorsToList}
            onSearch={onSearch}
          />
        </Header>
      </div>
      <div className="lg:min-w-[1150px] px-4 md:px-16 pb-8">
        <ContributorListTableHeaders
          selected={selectedContributors.length > 0 && selectedContributors.length === meta.limit}
          handleOnSelectAllContributor={onAllChecked}
        />
        {data.length > 0 || isLoading || (makeRequest && data.length === 0) ? (
          <ContributorTable
            loading={isLoading}
            selectedContributors={selectedContributors}
            topic={"*"}
            handleSelectContributors={onChecked}
            contributors={contributors as DbPRContributor[]}
          />
        ) : (
          !makeRequest && <EmptyState />
        )}
        <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
          <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
          <div>
            <div className="flex flex-col gap-4">
              <Pagination
                pages={[]}
                hasNextPage={meta.hasNextPage}
                hasPreviousPage={meta.hasPreviousPage}
                totalPage={meta.pageCount}
                page={meta.page}
                onPageChange={function (page: number): void {
                  setPage(page);
                }}
                divisor={true}
                goToPage
              />
            </div>
          </div>
        </div>
      </div>
      {contributorsAdded && (
        <ContributorsAddedModal
          list={list}
          contributorCount={selectedContributors.length}
          isOpen={contributorsAdded}
          onClose={() => {
            setContributorsAdded(false);
            setSelectedContributors([]);
          }}
        />
      )}
      {contributorsAddedError && (
        <ErrorModal
          list={list}
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
    </HubContributorsPageLayout>
  );
};

export default AddContributorsToList;
