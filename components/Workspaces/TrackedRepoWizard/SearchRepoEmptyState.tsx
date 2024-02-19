import { FaSearch } from "react-icons/fa";

export const SearchRepoEmptyState = ({ type }: { type: "by-repos" | "by-org" }) => {
  const message =
    type === "by-repos"
      ? "Use the search bar to find the repositories you want to track on your workspace."
      : "Use the search bar to find the organizations you want to import repositories from.";

  return (
    <div className="grid place-content-center">
      <div className="text-center flex flex-col items-center p-24 gap-2 max-w-lg">
        <div className="p-3 border rounded-lg mb-2">
          <FaSearch size={24} className="text-light-slate-9" />
        </div>
        <span className="font-semibold">No repositories added yet!</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
