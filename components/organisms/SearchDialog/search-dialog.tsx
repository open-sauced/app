import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineExclamation } from "react-icons/hi";
import Text from "components/atoms/Typography/text";
import Avatar from "components/atoms/Avatar/avatar";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import useLockBody from "lib/hooks/useLockBody";
import { getAvatarByUsername } from "lib/utils/github";

import { searchUsers } from "lib/hooks/search-users";
import useDebounceTerm from "lib/hooks/useDebounceTerm";

interface SearchDialogProps {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDialog = ({ setOpenSearch }: SearchDialogProps) => {
  useLockBody();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<{ data: DbUserSearch[]; meta: {} }>();
  const debouncedSearchTerm = useDebounceTerm(searchTerm, 300);

  useEffect(() => {
    if (searchTerm.length >= 3) startSearch();
    async function startSearch() {
      const data = await searchUsers(debouncedSearchTerm);
      setSearchResult(data);
    }
  }, [debouncedSearchTerm, searchTerm]);

  return (
    <div className="fixed left-0 top-0 z-[55] p-5 w-full h-full flex justify-center bg-white/30">
      <div
        className="absolute w-full h-full left-0 top-0 z-[60] backdrop-blur-sm"
        onClick={() => setOpenSearch(false)}
      />
      <div className="flex flex-col w-full max-w-2xl h-fit max-h-full bg-white shadow-xl border transition rounded-lg ring-light-slate-6 relative z-[65] overflow-hidden">
        <div className="flex w-full h-full items-center border-b p-2 pl-3">
          <FaSearch className="text-light-slate-9" fontSize={16} />
          <input
            className="w-full pl-2 text-sm font-semibold text-slate-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Text keyboard className="text-gray-600 !border-b !px-1">
            ⌘K
          </Text>
        </div>
        <div className="w-full h-full flex items-center">
          {searchTerm.length < 3 ? (
            <SearchInfo />
          ) : !!searchResult?.data?.length ? (
            <SearchResult result={searchResult?.data} />
          ) : (
            <SearchError />
          )}
        </div>
      </div>
    </div>
  );
};

const SearchDialogTrigger = ({ setOpenSearch }: SearchDialogProps) => {
  useEffect(() => {
    document.addEventListener("keydown", handleOpenSearch);
    function handleOpenSearch(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch(true);
      }
    }
    return () => document.removeEventListener("keydown", handleOpenSearch);
  }, [setOpenSearch]);

  return (
    <>
      <div
        className="hidden sm:flex justify-between p-1 pl-3 h-fit w-52 ml-auto bg-white border rounded-lg ring-light-slate-6 relative overflow-hidden"
        onClick={() => setOpenSearch(true)}
      >
        <div className="flex items-center">
          <FaSearch className="text-light-slate-9" fontSize={16} />
          <Text className="pl-2 text-sm font-semibold text-light-slate-9">Search for users</Text>
        </div>
        <Text keyboard className="text-gray-600 !border-b !px-1">
          ⌘K
        </Text>
      </div>
      <div className="flex sm:hidden p-1" onClick={() => setOpenSearch(true)}>
        <FaSearch className="text-light-slate-9 cursor-pointer" fontSize={16} />
      </div>
    </>
  );
};

const SearchInfo = () => (
  <Text className="block w-full py-1 px-4 text-slate-500 !font-normal leading-6">
    Type 3 characters or more to start searching
  </Text>
);

const SearchError = () => (
  <Text className="block w-full py-1 px-4 text-sauced-orange !font-normal leading-6">
    <HiOutlineExclamation className="text-sauced-orange inline-flex mr-2.5" fontSize={20} />
    We couldn&apos;t find any users with that name
  </Text>
);

const SearchResult = ({ result }: { result: DbUserSearch[] }) => (
  <div className="w-full py-1 overflow-hidden text-gray-600">
    <Text className="block w-full py-1 px-4">Users</Text>
    <div className="w-full h-full">
      <ScrollArea className="w-full">
        {result.map((user: DbUserSearch, i: number) => (
          <UserResult key={i} {...user} />
        ))}
      </ScrollArea>
    </div>
  </div>
);

const UserResult = ({ login, full_name }: DbUserSearch) => (
  <Link href={`/user/${login}`} className="w-full flex items-center py-2 p-4 gap-2 hover:bg-slate-100 cursor-pointer">
    <Avatar size="sm" className="!rounded-full flex-none" avatarURL={getAvatarByUsername(login)} />
    <div className="flex items-center gap-2 overflow-hidden">
      <Text className="text-gray-900">@{login}</Text>
      <Text className="!font-normal truncate">{full_name}</Text>
    </div>
  </Link>
);

export { SearchDialog as default, SearchDialogTrigger };
