import { useState } from "react";
import { useRouter } from "next/router";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import TextInput from "components/atoms/TextInput/text-input";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";

import TopNav from "components/organisms/TopNav/top-nav";
import Footer from "components/organisms/Footer/footer";
import InfoCard from "components/molecules/InfoCard/info-card";
import GitHubImportDialog from "components/organisms/GitHubImportDialog/github-import-dialog";

const CreateListPage = () => {
  const router = useRouter();
  // Loading States
  const [name, setName] = useState("");
  const [setIsNameValid] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const validateName = (name: string) => {
  //   if (!name || name.trim().length <= 3) return false;

  //   return true;
  // };

  const handleOnNameChange = (value: string) => {
    setName(value);
  };

  return (
    <section className="flex flex-col justify-center w-full py-4 xl:flex-row xl:gap-20 xl:pl-28 ">
      <div className="flex flex-col gap-8">
        <div className="pb-6 border-b border-light-slate-8">
          <Title className="!text-2xl !leading-none mb-4" level={1}>
            Create New List
          </Title>
          <Text className="my-8">
            A list is a collection of contributors that you and your team can get insights from.
          </Text>
        </div>

        <div className="pb-8 border-b border-light-slate-8">
          <Title className="!text-1xl !leading-none mb-4" level={4}>
            List Name
          </Title>

          <TextInput placeholder="Page Name (ex: My Team)" value={name} handleChange={handleOnNameChange} />
        </div>

        <div className="flex flex-col gap-4 py-6 border-light-slate-8">
          <Title className="!text-1xl !leading-none mb-4 mt-8" level={4}>
            Page Visibility
          </Title>

          <div className="flex justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="w-6 h-6 text-light-slate-9" />
              <Text className="pl-2">Make this list publicly visible</Text>
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

        <div className="flex flex-col gap-4 py-6 border-light-slate-8">
          <Title className="!text-1xl !leading-none " level={4}>
            Add Contributors
          </Title>

          <InfoCard
            title="Explore Contributors"
            description="Use our explore tool to find Contributors and create your list"
            avatarURL={""}
            handleClick={() => {
              router.push("/hub/lists/find");
            }}
          />

          <InfoCard
            title="Import your GitHub following"
            description="Connect to your GitHub to create a list with all the Contributors you follow"
            avatarURL={""}
            handleClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      <div className="top-0 py-4 mt-5 lg:sticky md:mt-0 lg:py-0">
        <div className="flex flex-col justify-between pt-8 mt-8 border-t"></div>
      </div>
      <GitHubImportDialog
        open={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
        handleImport={async () => {}}
      />
    </section>
  );
};

const AddListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-col items-center pt-20 page-container grow md:pt-14">
        <main className="flex flex-col items-center flex-1 w-full px-3 py-8 md:px-2 bg-light-slate-2">
          <CreateListPage />
        </main>
      </div>
      <Footer />
    </div>
  );
};

// AddListPage.PageLayout = HubLayout;
export default AddListPage;
