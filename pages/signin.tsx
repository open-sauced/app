import { GetServerSideProps } from "next";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

import { WithPageLayout } from "../interfaces/with-page-layout";

const SignIn: WithPageLayout = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      {/* Left for debugging. Page should redirect when signed in */}
      <div>...Loading</div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/"
});

export default SignIn;
