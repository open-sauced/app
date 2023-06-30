import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Contributor, { handleUserSSR, UserSSRPropsContext } from "./index";

export const getServerSideProps = async (context: UserSSRPropsContext) => {
  const supabase = createPagesServerClient(context);
  const username = context?.params?.username;

  if (!username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || username.toLowerCase() !== session?.user?.user_metadata.user_name.toLowerCase()) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return await handleUserSSR(context);
};

export default Contributor;
