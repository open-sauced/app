import TopNav from "components/organisms/TopNav/top-nav";

const AccountDeletedPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="page-container flex flex-col m-4 pt-28 items-center">
        <div className="info-container container w-full">
          <h1>Account Deleted</h1>
          <p>Your account has been deleted.</p>
        </div>
      </main>
    </div>
  );
};

export default AccountDeletedPage;

/**
 * Add intermediate modal, clarify what's gonna happen.
 * Hover state, subtle background color change.
 * Add survey for future.
 */
