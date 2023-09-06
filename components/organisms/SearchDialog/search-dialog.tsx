/* eslint-disable prettier/prettier */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
      <div className="absolute w-full h-full left-0 top-0 z-[60] backdrop-blur-sm" />
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
      </div>
    </div>
  );
};

export default SearchDialog;
