import { WithPageLayout } from "../interfaces/with-page-layout";
import { supabase } from "../lib/utils/supabase";
import { User } from "@supabase/supabase-js";

const SignOut: WithPageLayout = ({ user } : User) => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div>{JSON.stringify(user)}</div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Get our logged user
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // Check if the user is logged
  if (user === null) {
    // Redirect if no logged in
    return { props: {}, redirect: { destination: "/" } };
  }
  // log out if logged return the user
  // TODO: issue #189 add logic to remove auth cookie
  return { props: { user } };
};

export default SignOut;
