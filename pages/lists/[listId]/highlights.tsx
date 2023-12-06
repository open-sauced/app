import React from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import ListPageLayout from "layouts/lists";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Search from "components/atoms/Search/search";
import SingleSelect from "components/atoms/Select/single-select";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import Avatar from "components/atoms/Avatar/avatar";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import useFetchAllEmojis from "lib/hooks/useFetchAllEmojis";
import { ContributorListPageProps } from "./activity";

interface HighlightsPageProps extends ContributorListPageProps {
  highlights: DbHighlight[];
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId } = ctx.params as { listId: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }, { data: highlights, error: highlightError }] =
    await Promise.all([
      fetchApiData<PagedData<DBListContributor>>({
        path: `lists/${listId}/contributors?limit=${limit}`,
        bearerToken,
        pathValidator: validateListPath,
      }),
      fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
      fetchApiData<PagedData<DbHighlight>>({
        path: `lists/${listId}/contributors/highlights`,
        bearerToken,
        pathValidator: validateListPath,
      }),
    ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);

  return {
    props: {
      list,
      numberOfContributors: data?.meta.itemCount || 0,
      isOwner: list && list.user_id === userId,
      highlights: highlights?.data || [],
    },
  };
};

const Highlights = ({ list, numberOfContributors, isOwner, highlights }: HighlightsPageProps) => {
  const { data: emojis } = useFetchAllEmojis();
  return (
    <ListPageLayout showRangeFilter={false} list={list} numberOfContributors={numberOfContributors} isOwner={isOwner}>
      <div className="container flex flex-col justify-start w-full gap-12 pt-12 mt-5 md:mt-0 md:items-start md:flex-row">
        <div className={`sticky top-8 xl:flex hidden flex-none w-1/5`}>
          <div className="w-full bg-white border shadow-sm rounded-md p-4 flex flex-col gap-3">
            <Search placeholder="Search contributors" className="!w-full" name="helo" />
            <div>
              <span className="text-sm text-light-slate-9">Sort by</span>
              <SingleSelect placeholder="Latest" options={[]} onValueChange={() => {}} />
            </div>
            <div>
              <span className="text-sm text-light-slate-9">Tagged Repositories</span>
              <SingleSelect placeholder="Latest" options={[]} onValueChange={() => {}} />
            </div>
            <div>
              <span className="text-sm text-light-slate-9">Published</span>
              <SingleSelect placeholder="Latest" options={[]} onValueChange={() => {}} />
            </div>
          </div>
        </div>
        <div className="w-full 2xl:max-w-[40rem] xl:max-w-[33rem] flex flex-col">
          <ClientOnly>
            {highlights && highlights.length > 0
              ? highlights.map(({ id, url, title, created_at, highlight, shipped_at, login, type, tagged_repos }) => (
                  <div key={id} className="flex flex-col gap-6 px-1">
                    <div className="flex items-center gap-3">
                      <Link href={`/user/${login}`} className="flex items-center gap-3">
                        <Avatar
                          alt="user profile avatar"
                          isCircle
                          size="sm"
                          avatarURL={`https://www.github.com/${login}.png?size=300`}
                        />
                        <strong>{login}</strong>
                      </Link>
                      <Link href={`/feed/${id}`}>
                        <span className="text-xs font-normal text-light-slate-11">
                          {formatDistanceToNowStrict(new Date(created_at), { addSuffix: true })}
                        </span>
                      </Link>
                    </div>
                    <div className="w-full p-4 border bg-light-slate-1 md:px-6 lg:px-9 lg:py-5 lg:max-w-[33rem] sm:py-3 xs:py-2 rounded-xl">
                      <ContributorHighlightCard
                        title={title}
                        desc={highlight}
                        highlightLink={url}
                        shipped_date={shipped_at}
                        user={login}
                        id={id}
                        type={type}
                        taggedRepos={tagged_repos}
                        emojis={emojis}
                      />
                    </div>
                  </div>
                ))
              : null}
          </ClientOnly>
        </div>
      </div>
    </ListPageLayout>
  );
};

export default Highlights;
