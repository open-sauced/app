import React, { useEffect, useState } from "react";
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

  // TODO: Promise.all
  const fetchTimezone = fetchApiData<{ timezone: string }[]>({
    path: `lists/timezones`,
    bearerToken,
    pathValidator: validateListPath,
  });
  const fetchContributors = fetchApiData<PagedData<DbPRContributor>>({
    path: `lists/contributors`,
    bearerToken,
    pathValidator: validateListPath,
  });

  const { data: list, error: listError } = await fetchApiData<DBList>({
    path: `lists/${listId}`,
    bearerToken,
    pathValidator: validateListPath,
  });

  const [{ data: timezoneOptions }, { data, error }] = await Promise.all([fetchTimezone, fetchContributors]);

  // Only the list owner should be allowed to add contributors
  if (error?.status === 404) {
    // || list?.user_id !== session?.user.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      initialData: data ? { data: data.data, meta: data.meta } : { data: [], meta: {} },
      timezoneOption: timezoneOptions ? timezoneOptions : timezones,
    },
  };
};

const AddContributorsToList = ({ list, initialData, timezoneOption }: AddContributorsPageProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(undefined);
  const [contributor, setContributor] = useState<string | undefined>(undefined);
  const { data, meta, isLoading, setLimit, setPage } = useFetchAllContributors(
    {
      timezone: selectedTimezone,
      contributor,
    },
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
    }
  );

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
  const contributors = data
    ? data.length > 0 &&
      data.map((contributor) => {
        return {
          author_login: contributor.login,
          updated_at: contributor.updated_at,
          user_id: contributor.id,
        };
      })
    : [];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const handleOnSelectAllChecked = (state: boolean) => {
    if (state) {
      setSelectedContributors(contributors as DbPRContributor[]);
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

  const onSelectTimeZone = (selected: string) => {
    setSelectedTimezone(selected);
  };

  function onSearch(searchTerm: string | undefined) {
    if (!searchTerm || searchTerm.length >= 3) {
      setContributor(searchTerm);
    }
  }

  return (
    <HubContributorsPageLayout>
      <div className="info-container container w-full min-h-[6.25rem]">
        <Header>
          <AddContributorsHeader
            title={list?.name}
            setTimezoneFilter={onSelectTimeZone}
            loading={createLoading}
            selectedContributorsIds={selectedContributors.map((contributor) => contributor.user_id)}
            timezoneOptions={timezoneList}
            timezone={selectedTimezone}
            onAddToList={() => {
              alert("todo");
            }}
            onSearch={onSearch}
          />
        </Header>
      </div>
      <div className="lg:min-w-[1150px] px-4 md:px-16 pb-8">
        <ContributorListTableHeaders
          selected={selectedContributors.length > 0 && selectedContributors.length === meta.limit}
          handleOnSelectAllContributor={handleOnSelectAllChecked}
        />
        <ContributorTable
          loading={isLoading}
          selectedContributors={selectedContributors}
          topic={"*"}
          handleSelectContributors={handleOnSelectChecked}
          contributors={contributors as DbPRContributor[]}
        ></ContributorTable>
        <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
          <div>
            <div className="">
              <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
            </div>
          </div>
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
