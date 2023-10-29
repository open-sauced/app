import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";
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
import { useToast } from "lib/hooks/useToast";

interface CreateListPayload {
  name: string;
  is_public: boolean;
  contributors: { id: number; login: string }[];
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

  const fetchTimezone = fetchApiData<{ timezone: string }[]>({
    path: `lists/timezones`,
    bearerToken,
    pathValidator: validateListPath,
  });

  const [{ data: timezoneOptions }, { data: list, error: listError }] = await Promise.all([
    fetchTimezone,
    fetchApiData<DBList>({
      path: `lists/${listId}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
  ]);

  // TODO: Only the list owner should be allowed to add contributors
  if (listError?.status === 404) {
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
      <Image src="/assets/contributors-empty-state.png" alt="" width="640" height="636" className="object-contain" />
    </div>
  </div>
);

const AddContributorsToList = ({ list, timezoneOption }: AddContributorsPageProps) => {
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const [makeRequest, setMakeRequest] = useState(false);
  const { setContributorSearchTerm, timezone, setTimezone, data, meta, isLoading, setPage } =
    useContributorSearch(makeRequest);
  const { sessionToken } = useSupabaseAuth();
  const { toast } = useToast();

  const addContributorsToList = async () => {
    const { error } = await fetchApiData({
      path: `lists/${list.id}/contributors`,
      body: { contributors: selectedContributors.map(({ user_id }) => user_id) },
      method: "POST",
      bearerToken: sessionToken!,
      pathValidator: validateListPath,
    });

    if (error) {
      toast({
        description: "Unable to add new contributors",
        variant: "danger",
      });
    } else {
      toast({
        description: "Contributors added successfully",
        variant: "success",
      });
      setSelectedContributors([]);
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
    </HubContributorsPageLayout>
  );
};

export default AddContributorsToList;
