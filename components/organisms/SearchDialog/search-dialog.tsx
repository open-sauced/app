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
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { Dialog, DialogContent, DialogTrigger } from "components/molecules/Dialog/dialog";

const SearchDialog = () => {
  useLockBody();
  const isMac = useIsMacOS();
  const router = useRouter();
  const { providerToken } = useSupabaseAuth();
  const [cursor, setCursor] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const setOpenSearch = store((state) => state.setOpenSearch);
  const openSearch = store((state) => state.openSearch);
  const debouncedSearchTerm = useDebounceTerm(searchTerm, 300);
  const {
    data: repoData,
    isLoading: repoDataLoading,
    isError: repoDataError,
  } = useSearchRepos(debouncedSearchTerm, 3, 5);

  const [userSearchResult, setUserSearchResult] = useState<{ data: GhUser[] }>();

  useEffect(() => {
    document.addEventListener("keydown", handleCloseSearch);
    function handleCloseSearch(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenSearch(false);
      }
    }
    return () => document.removeEventListener("keydown", handleCloseSearch);
  }, []);

  const handleKeyboardCtrl: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const resultsCount = (userSearchResult?.data?.length || 0) + repoData.length;
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
      const userData = await searchUsers(debouncedSearchTerm, providerToken);

      if (userData) {
        const data = userData?.data ?? [];
        setUserSearchResult({ ...userData, data });
        setIsSearchError(data.length === 0);
      }
      cursor !== -1 && setCursor(-1);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);
  const renderUserSearchState = () => {
    if (searchTerm.length < 3) {
      return null;
    } else if (!isSearchError && !isSearching && userSearchResult?.data && searchTerm.length >= 3) {
      return <SearchResult cursor={cursor} result={userSearchResult?.data} />;
    } else if (!isSearchError && isSearching) {
      return <SearchLoading />;
    }
  };

  const renderRepoSearchState = () => {
    if (searchTerm.length < 3) {
      return null;
    }
    if (repoDataLoading) {
      return <SearchLoading />;
    }
    if (repoData.length > 0) {
      return (
        <div className="w-full py-1 overflow-hidden text-gray-600">
          <Text className="block w-full py-1 px-4">Repositories</Text>
          <div className="w-full h-full">
            <ScrollArea className="w-full">
              {repoData.map((repo: DbRepo, i: number) => (
                <Link
                  key={i + (userSearchResult?.data.length || 0)}
                  href={`/s/${repo.full_name}`}
                  className={clsx(
                    cursor === i + (userSearchResult?.data.length || 0) && "_cursorActive bg-slate-100",
                    "w-full flex items-center py-2 p-4 gap-2 hover:bg-slate-100 cursor-pointer"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(e.currentTarget.href);
                    setOpenSearch(false);
                  }}
                >
                  <Avatar
                    size="sm"
                    className="!rounded-full flex-none"
                    avatarURL={getAvatarByUsername(repo.full_name.split("/")[0])}
                  />
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Text className="text-gray-900">{repo.full_name}</Text>
                  </div>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={openSearch} onOpenChange={setOpenSearch}>
      <DialogTrigger asChild>
        <button className="hidden sm:flex justify-between p-1 pl-3 h-fit w-56 sm:w-64 ml-auto bg-white border rounded-lg ring-light-slate-6 relative overflow-hidden">
          <div className="flex items-center">
            <FaSearch className="text-light-slate-9" fontSize={16} />
            <Text className="pl-2 text-sm text-light-slate-9">Users, Repositories...</Text>
          </div>
          <Text className="text-gray-600 !border-b !px-1">
            {isMac ? "⌘K" : <span className="text-xs px-1 py-2">CTRL+K</span>}
          </Text>
        </button>
      </DialogTrigger>
      <DialogContent>
        <div className="fixed left-0 top-0 z-auto p-5 w-full h-full flex justify-center bg-white/30">
          <div
            className="absolute w-full h-full left-0 top-0 z-50 backdrop-blur-sm"
            onClick={() => setOpenSearch(false)}
          />
          <div
            className="flex flex-col w-full max-w-2xl h-fit max-h-full bg-white shadow-xl border transition rounded-lg ring-light-slate-6 relative z-50 overflow-hidden"
            onMouseMove={() => cursor !== -1 && setCursor(-1)}
          >
            <div className="flex w-full h-full items-center border-b p-2 pl-3">
              {isSearching ? (
                <div className="flex-none w-4 h-4 rounded-full border-2 border-light-slate-9 border-b-light-slate-5 border-r-light-slate-5 animate-spin" />
              ) : (
                <FaSearch className="text-light-slate-9" fontSize={16} />
              )}
              <input
                autoFocus
                className="w-full pl-2 text-sm font-semibold text-slate-700 focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  isSearchError && setIsSearchError(false);
                }}
                onKeyDown={handleKeyboardCtrl}
              />
              <Text keyboard className="text-gray-600 !border-b !px-1">
                {isMac ? "⌘K" : <span className="text-xs py-2 px-1">CTRL+K</span>}
              </Text>
            </div>
            <div className="w-full h-full flex flex-col items-center">
              {searchTerm.length < 3 ? (
                <SearchInfo />
              ) : isSearchError && !isSearching && (repoDataError || repoData.length === 0) ? (
                <Text className="block w-full py-1 px-4 text-sauced-orange !font-normal leading-6">
                  <HiOutlineExclamation className="text-sauced-orange inline-flex mr-2.5" fontSize={20} />
                  We couldn&apos;t find any users or repositories with that name
                </Text>
              ) : (
                <>
                  <section className="flex flex-col w-full">{renderUserSearchState()}</section>
                  <hr />
                  <section className="flex flex-col w-full">{renderRepoSearchState()}</section>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
  }, []);

  return (
    <>
      <div
        className={`hidden sm:flex justify-between p-1 pl-3 h-fit ${
          isMac ? "w-56" : "w-64"
        } ml-auto bg-white border rounded-lg ring-light-slate-6 relative overflow-hidden`}
        onClick={() => setOpenSearch(true)}
      >
        <div className="flex items-center">
          <FaSearch className="text-light-slate-9" fontSize={16} />
          <Text className="pl-2 text-sm text-light-slate-9">Users, Repositories...</Text>
        </div>
        <Text keyboard className="text-gray-600 !border-b !px-1">
          {isMac ? "⌘K" : <span className="text-xs px-1 py-2">CTRL+K</span>}
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

const SearchLoading = () => (
  <div className="w-full flex items-center py-2 p-4 gap-2 animate-pulse">
    <div className="w-6 h-6 rounded-full flex-none bg-light-slate-6" />
    <div className="w-full flex items-center gap-2 overflow-hidden">
      <div className="w-4/12 md:w-2/12 h-2.5 rounded-lg bg-light-slate-6" />
      <div className="w-7/12 md:w-5/12 h-2.5 rounded-lg bg-light-slate-6" />
    </div>
  </div>
);

const SearchError = () => (
  <Text className="block w-full py-1 px-4 text-sauced-orange !font-normal leading-6">
    <HiOutlineExclamation className="text-sauced-orange inline-flex mr-2.5" fontSize={20} />
    We couldn&apos;t find any users or repositories with that name
  </Text>
);

const SearchResult = ({ result, cursor }: { result: GhUser[]; cursor: number }) => (
  <div className="w-full py-1 overflow-hidden text-gray-600">
    <Text className="block w-full py-1 px-4">Users</Text>
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
      href={`/u/${login}`}
      className={clsx(
        active && "_cursorActive bg-slate-100",
        "w-full flex items-center py-2 p-4 gap-2 hover:bg-slate-100 cursor-pointer"
      )}
      onClick={handleClick}
    >
      <Avatar size="sm" className="!rounded-full flex-none" avatarURL={getAvatarByUsername(login)} />
      <div className="flex items-center gap-2 overflow-hidden">
        <Text className="text-gray-900">@{login}</Text>
        <Text className="!font-normal truncate">{login}</Text>
      </div>
    </Link>
  );
};

export { SearchDialog as default, SearchDialogTrigger };
