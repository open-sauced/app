import { WithPageLayout } from "../interfaces/with-page-layout";

const SignOut: WithPageLayout = () => {
  return <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">...Loading</main>;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default SignOut;
