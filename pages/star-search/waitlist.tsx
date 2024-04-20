import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {};
export default function StarSearchWaitListPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Star Search Waitlist</h1>
      <p className="text-center">
        Star Search is currently in private beta. Please join the waitlist to get early access.
      </p>
      <div className="flex flex-col items-center space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
        />
        <button className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
          Join Waitlist
        </button>
      </div>
    </div>
  );
}
