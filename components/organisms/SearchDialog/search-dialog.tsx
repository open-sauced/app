/* eslint-disable prettier/prettier */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineExclamation } from "react-icons/hi";
import Text from "components/atoms/Typography/text";
import useLockBody from "lib/hooks/useLockBody";

interface SearchDialogProps {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDialog = ({ setOpenSearch }: SearchDialogProps) => {
  useLockBody();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="fixed z-[55] p-5 w-full h-full flex justify-center bg-white/30">
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
          <SearchInfo />
        </div>
      </div>
    </div>
  );
};

const SearchDialogTrigger = ({ setOpenSearch }: SearchDialogProps) => (
  <div
    className="flex justify-between p-1 pl-3 h-fit w-52 ml-auto bg-white border rounded-lg ring-light-slate-6 relative overflow-hidden"
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
);

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

export { SearchDialog as default, SearchDialogTrigger };
