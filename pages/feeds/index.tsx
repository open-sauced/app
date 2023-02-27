import Avatar from "components/atoms/Avatar/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import HighlightsFilterCard from "components/molecules/HighlightsFeedCard/highlights-filter-card";
import ProfileLayout from "layouts/profile";
import { useFetchUserHighlights } from "lib/hooks/useFetchUserHighlights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { getFormattedDate } from "lib/utils/date-utils";

const Feeds = () => {
  const { user } = useSupabaseAuth();
  const { data, isLoading, isError } = useFetchUserHighlights(user?.user_metadata.user_name);
  console.log(data);
  return (
    <div className="container w-full gap-12 justify-end pt-24 flex">
      <Tabs defaultValue="Highlights" className="flex-1 pl-44">
        <TabsList className="w-full border-b  justify-start">
          <TabsTrigger
            className="data-[state=active]:border-sauced-orange  data-[state=active]:border-b-2 text-2xl"
            value="Highlights"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:border-sauced-orange data-[state=active]:border-b-2 text-2xl"
            value="Following"
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Highlights">
          <div className="lg:gap-x-3 pt-4 flex max-w-[48rem]">
            <div className="hidden lg:inline-flex items-center">
              <Avatar
                alt="user profile avatar"
                isCircle
                size="sm"
                avatarURL={`https://www.github.com/${user?.user_metadata.user_name}.png?size=300`}
              />
            </div>

            <HighlightInputForm />
          </div>

          {/* Highlights List section */}
          <section className="mt-10 flex gap-8 flex-col ">
            {data &&
              data.length > 0 &&
              // eslint-disable-next-line camelcase
              data.map(({ id, url, title, created_at, highlight }) => (
                <div key={id} className="flex flex-col gap-6 ">
                  <div className="flex gap-3 items-center  ">
                    <Avatar
                      alt="user profile avatar"
                      isCircle
                      size="sm"
                      avatarURL={`https://www.github.com/${user?.user_metadata.user_name}.png?size=300`}
                    />
                    <strong>Bdougie</strong>
                    <span className="text-xs text-light-slate-11 font-normal">{getFormattedDate(created_at)}</span>
                  </div>
                  <div className=" bg-light-slate-1 border px-12 py-6 rounded-xl">
                    <ContributorHighlightCard title={title} desc={highlight} prLink={url} user={"bdougie"} id={id} />
                  </div>
                </div>
              ))}
          </section>
        </TabsContent>
        <TabsContent value="Following"></TabsContent>
      </Tabs>
      <HighlightsFilterCard />
    </div>
  );
};

export default Feeds;

Feeds.PageLayout = ProfileLayout;
