import { WithPageLayout } from "../interfaces/with-page-layout";
import { useRouter } from "next/router";
import Card from "components/atoms/Card/card";

const Login: WithPageLayout = () => {
  //const router = useRouter();

  return (
    <main className="flex w-full h-[100vh] flex-1 items-center justify-center text-center">
      <Card className="flex w-[870px] h-[436px] p-0 bg-light-slate-2">
        <>
          <div className="w-full h-full p-9">
            Test
          </div>
          <div className="w-full h-full p-9 rounded-r-lg bg-white">
            Test
          </div>
        </>
      </Card>
    </main>
  );
};

export default Login;