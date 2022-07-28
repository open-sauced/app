import { WithPageLayout } from "../interfaces/with-page-layout";
import { useRouter } from "next/router";

const Login: WithPageLayout = () => {
  //const router = useRouter();

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      Test Page
    </main>
  );
};

export default Login;