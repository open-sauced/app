import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiCopy } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { usePostHog } from "posthog-js/react";
import ContributorListTableHeaders from "@components/molecules/ContributorListTableHeader/contributor-list-table-header";
import { WithPageLayout } from "interfaces/with-page-layout";
import HubContributorsPageLayout from "@layouts/hub-contributors";
import useFetchAllContributors from "@lib/hooks/useFetchAllContributors";
import ContributorTable from "@components/organisms/ContributorsTable/contributors-table";
import Header from "@components/organisms/Header/header";
import HubContributorsHeader from "@components/molecules/HubContributorsHeader/hub-contributors-header";
import Pagination from "@components/molecules/Pagination/pagination";
import PaginationResults from "@components/molecules/PaginationResults/pagination-result";
import { useToast } from "@lib/hooks/useToast";
import useSupabaseAuth from "@lib/hooks/useSupabaseAuth";
import { Dialog, DialogContent } from "@components/molecules/Dialog/dialog";
import Title from "@components/atoms/Typography/title";
import Text from "@components/atoms/Typography/text";
import TextInput from "@components/atoms/TextInput/text-input";
import Button from "@components/atoms/Button/button";

interface CreateListPayload {
  name: string;
  is_public: boolean;
  contributors: number[];
}
const NewListCreationPage: WithPageLayout = () => {
  const { toast } = useToast();
  const posthog = usePostHog();
  const { sessionToken } = useSupabaseAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [listId, setListId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const [range, setRange] = useState<number>(30);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const { data, meta, isLoading, setLimit, setPage } = useFetchAllContributors();

  const contributors = data
    ? data.length > 0 &&
      data.map((contributor) => {
        return {
          author_login: contributor.user_login,
          updated_at: contributor.user_updated_at,
          user_id: contributor.user_id,
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
      contributors: selectedContributors.map((contributor) => contributor.user_id),
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
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen}>
      <div className="info-container container w-full min-h-[6.25rem]">
        <Header>
          <HubContributorsHeader
            isPublic={isPublic}
            handleToggleIsPublic={() => setIsPublic(!isPublic)}
            loading={createLoading}
            selectedContributorsIds={selectedContributors.map((contributor) => contributor.user_id)}
            setLimit={setLimit}
            setRangeFilter={(range) => {
              setRange(range);
            }}
            title={title}
            onAddToList={handleOnListCreate}
            onTitleChange={(title) => setTitle(title)}
          />
        </Header>
      </div>
      <div className="lg:min-w-[1150px] px-16 py-8">
        <ContributorListTableHeaders
          selected={selectedContributors.length === meta.limit}
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
            <div className="">
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
  );
};

NewListCreationPage.PageLayout = HubContributorsPageLayout;

export default NewListCreationPage;
