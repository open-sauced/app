// pages/protectedRoute.tsx
// This page serves as an example of how to use a protectedRoute component.
import { GetServerSideProps } from "next";
import { supabase } from "../lib/utils/supabase";
const Protected = ({ user }: Props) => {
  return <div>JSON.stringify(user)</div>;
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Get our logged user
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // Check if the user is logged
  if (user === null) {
  // Redirect if no logged in
    return { props: {}, redirect: { destination: "/auth/login" } };
  }
  // If logged return the user
  return { props: { user } };
};
export default Protected;
