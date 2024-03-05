import { useState } from "react";
import { useRouter } from "next/router";
import { LuFileText } from "react-icons/lu";

import { IoCheckmarkSharp } from "react-icons/io5";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";

import { calcDistanceFromToday } from "lib/utils/date-utils";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import LimitSelect, { LimitSelectMap } from "components/atoms/Select/limit-select";

import useContributors from "lib/hooks/api/useContributors";
import { getAvatarByUsername } from "lib/utils/github";
import { ToggleValue } from "components/atoms/LayoutToggle/layout-toggle";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import { Popover, PopoverContent, PopoverTrigger } from "components/molecules/Popover/popover";
import Button from "components/atoms/Button/button";
import { addListContributor, useFetchAllLists } from "lib/hooks/useList";
import { Command, CommandGroup, CommandInput, CommandItem } from "components/atoms/Cmd/command";
import { useToast } from "lib/hooks/useToast";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

import ClientOnly from "components/atoms/ClientOnly/client-only";
import { setQueryParams } from "lib/utils/query-params";
import ContributorCard from "../ContributorCard/contributor-card";
import ContributorTable from "../ContributorsTable/contributors-table";

interface ContributorProps {
  repositories?: number[];
}

const Contributors = ({ repositories }: ContributorProps): JSX.Element => {
  const router = useRouter();
  const limit = router.query.limit as string;
  const topic = router.query.pageId as string;

  const { data, meta, setPage, isError, isLoading } = useContributors(Number(limit ?? 10), repositories);
  const { toast } = useToast();
  const [layout, setLayout] = useState<ToggleValue>("list");
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const contributors = data.map((pr) => {
    return {
      host_login: pr.author_login,
      first_commit_time: pr.updated_at,
    };
  });

  const onSelectContributor = (state: boolean, contributor: DbPRContributor) => {
    if (state) {
      setSelectedContributors((prev) => [...prev, contributor]);
    } else {
      setSelectedContributors(selectedContributors.filter((seleted) => seleted.user_id !== contributor.user_id));
    }
  };

  const onSelectAllContributors = (state: boolean) => {
    if (state) {
      setSelectedContributors(data);
    } else {
      setSelectedContributors([]);
    }
  };

  const contributorArray = isError
    ? []
    : contributors.map((contributor) => {
        const timeSinceFirstCommit = calcDistanceFromToday(new Date(contributor.first_commit_time));

        return {
          profile: {
            githubAvatar: getAvatarByUsername(contributor.host_login),
            githubName: contributor.host_login,
            dateOfFirstPR: timeSinceFirstCommit,
          },
        };
      });

  const PopOverListContent = () => {
    const { data } = useFetchAllLists();
    const [loading, setLoading] = useState(false);

    const handleAddContributorsToList = async () => {
      if (!selectedListIds.length) {
        return;
      }

      setLoading(true);
      const response = Promise.all(
        selectedListIds.map((listIds) =>
          addListContributor(
            listIds,
            selectedContributors.map((contributor) => ({ id: contributor.user_id }))
          )
        )
      );
      response
        .then((res) => {
          toast({
            description: `Successfully added ${selectedContributors.length} contributors to ${selectedListIds.length} lists!`,
            variant: "success",
          });
        })
        .catch((res) => {
          toast({
            description: `
            An error occurred while adding contributors to lists. Please try again.
          `,
            variant: "danger",
          });
        })
        .finally(() => {
          setLoading(false);
          setPopoverOpen(false);
          setSelectedListIds([]);
          setSelectedContributors([]);
        });
    };

    return (
      <PopoverContent align="end" className="bg-white !w-64 gap-4 flex flex-col">
        <Command loop className="w-full px-0 bg-transparent">
          <CommandInput placeholder={"Search Lists"} />
          <CommandGroup className="flex flex-col !px-0 overflow-scroll max-h-48">
            {data && data.length > 0
              ? data.map((list) => (
                  <CommandItem key={list.id}>
                    <button
                      onClick={() => {
                        if (selectedListIds.includes(list.id)) {
                          setSelectedListIds(selectedListIds.filter((id) => id !== list.id));
                        } else {
                          setSelectedListIds([...selectedListIds, list.id]);
                        }
                      }}
                      className="flex items-center gap-3 text-sm w-full  text-start"
                    >
                      <LuFileText className="text-xl shrink-0" /> <span className="w-full truncate">{list.name}</span>
                      {selectedListIds.includes(list.id) ? (
                        <IoCheckmarkSharp className="w-4 h-4 ml-2 text-sauced-orange shrink-0" />
                      ) : null}
                    </button>
                  </CommandItem>
                ))
              : null}
          </CommandGroup>
        </Command>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              router.push({
                pathname: "/hub/lists/find",
                query: { contributors: JSON.stringify(selectedContributors) },
              });
            }}
            variant="text"
            className="py-1 flex-1"
          >
            New list
          </Button>
          <Button
            loading={loading}
            onClick={handleAddContributorsToList}
            disabled={selectedListIds.length === 0}
            variant="primary"
            className="py-1 flex-1"
          >
            Add to list
          </Button>
        </div>
      </PopoverContent>
    );
  };

  return (
    <>
      {/* Table section */}
      <TableHeader
        metaInfo={meta}
        entity="Contributors"
        title="Contributors"
        layout={layout}
        onLayoutToggle={() => setLayout((prev) => (prev === "list" ? "grid" : "list"))}
      />

      {layout === "grid" ? (
        <div className="grid w-full gap-3 grid-cols-automobile md:grid-cols-autodesktop">
          {isLoading ? <SkeletonWrapper height={210} radius={12} count={9} /> : ""}
          {isError ? <>An error occurred!..</> : ""}
          {!isLoading &&
            !isError &&
            contributorArray.map((contributor, index) => (
              <ContributorCard key={index} contributor={{ ...contributor }} topic={topic} repositories={repositories} />
            ))}
        </div>
      ) : (
        <div className="lg:min-w-[1150px]">
          <ContributorListTableHeaders handleOnSelectAllContributor={onSelectAllContributors} />
          {selectedContributors.length > 0 && (
            <div className="border px-4 py-2 flex justify-between items-center ">
              <div className="text-slate-600">{selectedContributors.length} Contributors selected</div>
              <Popover
                open={popoverOpen}
                onOpenChange={(value) => {
                  setPopoverOpen(value);
                }}
              >
                <PopoverTrigger>
                  <Button variant="primary">Add to list</Button>
                </PopoverTrigger>
                {popoverOpen && <PopOverListContent />}
              </Popover>
            </div>
          )}
          <ClientOnly>
            <ContributorTable
              handleSelectContributors={onSelectContributor}
              loading={isLoading}
              topic={topic}
              contributors={data}
              selectedContributors={selectedContributors}
            ></ContributorTable>
          </ClientOnly>
        </div>
      )}

      {/* Table footer */}

      <div className="flex flex-col w-full px-2 mt-5 gap-y-3 md:flex-row">
        <LimitSelect
          placeholder="10 per page"
          options={[
            { name: "10 per page", value: "10" },
            { name: "20 per page", value: "20" },
            { name: "30 per page", value: "30" },
            { name: "40 per page", value: "40" },
            { name: "50 per page", value: "50" },
          ]}
          className="!w-36 ml-auto md:hidden overflow-x-hidden"
          defaultValue={String(limit ?? 10) as LimitSelectMap}
          onChange={function (limit: string): void {
            setQueryParams({ limit });
          }}
        />

        <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
          <div>
            <div>
              <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <Pagination
                pages={isMobile ? [] : new Array(meta.pageCount).fill(0).map((_, index) => index + 1)}
                pageSize={5}
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
    </>
  );
};
export default Contributors;
