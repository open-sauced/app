import { WithPageLayout } from "../interfaces/with-page-layout";
import { GetServerSideProps } from "next";
import { supabase } from "../lib/utils/supabase";

const SignIn: WithPageLayout = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      {/* Left for debugging. Page should redirect when signed in */}
      <div>...Loading</div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Get our logged user
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // Check if the user is logged
  if (user === null) {
    // Redirect if no logged in
    return { props: {}, redirect: { destination: "/auth" } };
  }
  // If logged return the user
  return { props: {}, redirect: { destination: "/" } };
};
export default SignIn;
