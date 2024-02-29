import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineExclamation } from "react-icons/hi";
import store from "lib/store";
import Text from "components/atoms/Typography/text";
import Avatar from "components/atoms/Avatar/avatar";
import { ScrollArea } from "components/atoms/ScrollArea/scroll-area";
import useLockBody from "lib/hooks/useLockBody";
import { getAvatarByUsername } from "lib/utils/github";
import { searchUsers } from "lib/hooks/search-users";
import useDebounceTerm from "lib/hooks/useDebounceTerm";
import useIsMacOS from "lib/hooks/useIsMacOS";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const SearchDialog = () => {
  useLockBody();
  const router = useRouter();
  const { providerToken } = useSupabaseAuth();
  const [cursor, setCursor] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const setOpenSearch = store((state) => state.setOpenSearch);
  const debouncedSearchTerm = useDebounceTerm(searchTerm, 300);
  const [searchResult, setSearchResult] = useState<{ data: GhUser[] }>();
  const isMac = useIsMacOS();

  useEffect(() => {
    document.addEventListener("keydown", handleCloseSearch);
    function handleCloseSearch(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenSearch(false);
      }
    }
    return () => document.removeEventListener("keydown", handleCloseSearch);
  }, [setOpenSearch]);

  const handleKeyboardCtrl: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const resultsCount = searchResult?.data?.length || 0;
    if (resultsCount && e.key === "ArrowUp") {
      e.preventDefault();
      setCursor(cursor === 0 ? Math.min(resultsCount - 1, 9) : cursor - 1);
    }
    if (resultsCount && e.key === "ArrowDown") {
      e.preventDefault();
      setCursor(cursor === Math.min(resultsCount - 1, 9) ? 0 : cursor + 1);
    }
    if (resultsCount && e.key === "Enter") {
      e.preventDefault();
      if (document.querySelector("._cursorActive")) {
        const user = document.querySelector("._cursorActive") as HTMLAnchorElement;
        router.push(user.href);
        setOpenSearch(false);
      }
    }
  };

  useEffect(() => {
    if (searchTerm.length >= 3) startSearch();
    async function startSearch() {
      setIsSearching(true);
      const data = await searchUsers(debouncedSearchTerm, providerToken);
      if (data) {
        setSearchResult(data);
        setIsSearchError(!data.data.length);
      }
      cursor !== -1 && setCursor(-1);
      setIsSearching(false);
    }
  }, [cursor, debouncedSearchTerm, providerToken, searchTerm.length]);

  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center w-full h-full p-5 bg-background/70">
      <div className="absolute top-0 left-0 z-50 w-full h-full backdrop-blur-sm" onClick={() => setOpenSearch(false)} />
      <div
        className="relative z-50 flex flex-col w-full max-w-2xl max-h-full overflow-hidden transition border rounded-lg shadow-xl h-fit bg-background ring-light-slate-6"
        onMouseMove={() => cursor !== -1 && setCursor(-1)}
      >
        <div className="flex items-center w-full h-full p-2 pl-3 border-b">
          {isSearching ? (
            <div className="flex-none w-4 h-4 border-2 rounded-full border-light-slate-9 border-b-light-slate-5 border-r-light-slate-5 animate-spin" />
          ) : (
            <FaSearch className="text-light-slate-9" fontSize={16} />
          )}
          <input
            autoFocus
            className="w-full pl-2 text-sm font-semibold bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              isSearchError && setIsSearchError(false);
            }}
            onKeyDown={handleKeyboardCtrl}
          />
          <Text keyboard className="text-gray-600 !border-b !px-1">
            {isMac ? "⌘K" : <span className="px-1 py-2 text-xs">CTRL+K</span>}
          </Text>
        </div>
        <div className="flex items-center w-full h-full">
          {searchTerm.length < 3 ? (
            <SearchInfo />
          ) : !isSearchError && !isSearching && searchResult?.data && searchTerm.length >= 3 ? (
            <SearchResult cursor={cursor} result={searchResult?.data} />
          ) : !isSearchError && isSearching ? (
            <SearchLoading />
          ) : (
            isSearchError && !isSearching && <SearchError />
          )}
        </div>
      </div>
    </div>
  );
};

const SearchDialogTrigger = () => {
  const setOpenSearch = store((state) => state.setOpenSearch);
  const isMac = useIsMacOS();

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
        className="relative justify-between hidden w-56 p-1 pl-3 ml-auto overflow-hidden border rounded-lg sm:flex h-fit bg-background ring-light-slate-6"
        onClick={() => setOpenSearch(true)}
      >
        <div className="flex items-center">
          <FaSearch className="text-light-slate-9" fontSize={16} />
          <Text className="pl-2 text-sm text-light-slate-9 dark:text-dark-slate-9">Search for users</Text>
        </div>
        <Text keyboard className="text-gray-600 !border-b !px-1">
          {isMac ? "⌘K" : <span className="px-1 py-2 text-xs">CTRL+K</span>}
        </Text>
      </div>
      <div className="flex p-1 sm:hidden" onClick={() => setOpenSearch(true)}>
        <FaSearch className="cursor-pointer text-light-slate-9 dark:text-dark-slate-9" fontSize={16} />
      </div>
    </>
  );
};

const SearchInfo = () => (
  <Text className="block w-full py-1 px-4 text-slate-500 !font-normal leading-6">
    Type 3 characters or more to start searching
  </Text>
);

const SearchLoading = () => (
  <div className="flex items-center w-full gap-2 p-4 py-2 animate-pulse">
    <div className="flex-none w-6 h-6 rounded-full bg-light-slate-6 dark:bg-dark-slate-6" />
    <div className="flex items-center w-full gap-2 overflow-hidden">
      <div className="w-4/12 md:w-2/12 h-2.5 rounded-lg bg-light-slate-6 dark:bg-dark-slate-6" />
      <div className="w-7/12 md:w-5/12 h-2.5 rounded-lg bg-light-slate-6 dark:bg-dark-slate-6" />
    </div>
  </div>
);

const SearchError = () => (
  <Text className="block w-full py-1 px-4 text-sauced-orange !font-normal leading-6">
    <HiOutlineExclamation className="text-sauced-orange inline-flex mr-2.5" fontSize={20} />
    We couldn&apos;t find any users with that name
  </Text>
);

const SearchResult = ({ result, cursor }: { result: GhUser[]; cursor: number }) => (
  <div className="w-full py-1 overflow-hidden text-gray-600">
    <Text className="block w-full px-4 py-1">Users</Text>
    <div className="w-full h-full">
      <ScrollArea className="w-full">
        {result.map((user: GhUser, i: number) => (
          <UserResultCard key={i} active={cursor === i} {...user} />
        ))}
      </ScrollArea>
    </div>
  </div>
);

interface UserResultCardProps extends GhUser {
  active: boolean;
}

const UserResultCard = ({ login, active }: UserResultCardProps) => {
  const router = useRouter();
  const setOpenSearch = store((state) => state.setOpenSearch);

  const handleClick: React.UIEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    router.push(e.currentTarget.href);
    setOpenSearch(false);
  };

  return (
    <Link
      href={`/user/${login}`}
      className={clsx(
        active && "_cursorActive bg-light-slate-1 dark:bg-dark-slate-1",
        "w-full flex items-center py-2 p-4 gap-2 hover:bg-slate-100 cursor-pointer"
      )}
      onClick={handleClick}
    >
      <Avatar size="sm" className="!rounded-full flex-none" avatarURL={getAvatarByUsername(login)} />
      <div className="flex items-center gap-2 overflow-hidden">
        <Text className="text-light-slate-9 dark:text-dark-slate-9">@{login}</Text>
        <Text className="!font-normal truncate">{login}</Text>
      </div>
    </Link>
  );
};

export { SearchDialog as default, SearchDialogTrigger };
