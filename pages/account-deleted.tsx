import Head from "next/head";
import TopNav from "components/organisms/TopNav/top-nav";

const AccountDeletedPage = () => {
  return (
    <>
      <Head>
        <meta http-equiv="refresh" content="3;url=/" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main id="main" className="page-container flex flex-col m-4 pt-28 items-center">
          <div className="info-container container w-full">
            <h1 className="text-2xl">Account Deleted</h1>
            <p>Your account has been deleted.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AccountDeletedPage;
