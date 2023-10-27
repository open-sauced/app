import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

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
import ClientOnly from "components/atoms/ClientOnly/client-only";
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

const useContributorSearch = () => {
  const [contributorSearchTerm, setContributorSearchTerm] = useState<string | undefined>();
  const [timezone, setTimezone] = useState<string | undefined>();

  const { data, meta, isLoading, setPage } = useFetchAllContributors(
    {
      timezone,
      contributor: contributorSearchTerm,
    },
    {
      revalidateOnFocus: false,
    }
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

const AddContributorsToList = ({ list, timezoneOption }: AddContributorsPageProps) => {
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const { setContributorSearchTerm, timezone, setTimezone, data, meta, isLoading, setPage } = useContributorSearch();
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
        title: "Error",
        description: "Unable to contributors",
      });
    } else {
      toast({
        title: "Success",
        description: "Contributors added successfully",
      });
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
    setTimezone(selected);
  };

  function onSearch(searchTerm: string | undefined) {
    if (!searchTerm || searchTerm.length >= 3) {
      setContributorSearchTerm(searchTerm);
    }
  }

  return (
    <HubContributorsPageLayout>
      <div className="info-container container w-full min-h-[6.25rem]">
        <Header>
          <AddContributorsHeader
            title={list.name}
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
        <ClientOnly>
          <ContributorTable
            loading={isLoading}
            selectedContributors={selectedContributors}
            topic={"*"}
            handleSelectContributors={onChecked}
            contributors={contributors as DbPRContributor[]}
          />
        </ClientOnly>
        <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
          <ClientOnly>
            <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
          </ClientOnly>
          <div>
            <div className="flex flex-col gap-4">
              <ClientOnly>
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
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </HubContributorsPageLayout>
  );
};

export default AddContributorsToList;
