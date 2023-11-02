import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { fetchApiData } from "helpers/fetchApiData";
import HubContributorsPageLayout from "layouts/hub-contributors";

// TODO: put into shared utilities once https://github.com/open-sauced/app/pull/2016 is merged
function isListId(listId: string) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(listId);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { listId } = ctx.params as { listId: string };
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const userId = Number(session?.user.user_metadata.sub);

  if (!isListId(listId)) {
    return {
      notFound: true,
    };
  }

  const { data: list, error } = await fetchApiData<DBList>({
    path: `lists/${listId}`,
    bearerToken,
    // TODO: remove this in another PR for cleaning up fetchApiData
    pathValidator: () => true,
  });

  // Only the list owner should be allowed to add contributors
  if (error?.status === 404 || (list && list.user_id !== userId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
    },
  };
};

interface EditListPageProps {
  list: DBList;
}

export default function EditListPage(props: EditListPageProps) {
  return (
    <HubContributorsPageLayout>
      <div className="info-container container w-full min-h-[6.25rem] px-4">
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-2xl font-bold text-center text-gray-800">Edit List</h1>
        </div>
      </div>
    </HubContributorsPageLayout>
  );
}
