import { GetServerSideProps } from "next";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

import { WithPageLayout } from "../interfaces/with-page-layout";

const SignOut: WithPageLayout = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      ...Loading
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(_ctx, supabase)  {
    // Get our logged user
    const { data: { user } } = await supabase.auth.getUser();

    // Check if the user is logged in
    if (user !== null) {
      await supabase.auth.signOut();
    }
      
    // Redirect to hom
    return { props: {}, redirect: { destination: "/" } };
  }
});

export default SignOut;
