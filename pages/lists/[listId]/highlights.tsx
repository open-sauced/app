import React from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import ListPageLayout from "layouts/lists";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Search from "components/atoms/Search/search";
import SingleSelect from "components/atoms/Select/single-select";
import { ContributorListPageProps } from "./activity";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId } = ctx.params as { listId: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }] = await Promise.all([
    fetchApiData<PagedData<DBListContributor>>({
      path: `lists/${listId}/contributors?limit=${limit}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
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
    },
  };
};

const highlights = ({ list, numberOfContributors, isOwner }: ContributorListPageProps) => {
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
        <div className="w-full 2xl:max-w-[40rem] xl:max-w-[33rem] bg-green-200">Yaaah</div>
      </div>
    </ListPageLayout>
  );
};

export default highlights;
