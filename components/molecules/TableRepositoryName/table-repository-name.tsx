import Avatar from "components/atoms/Avatar/avatar";
import { truncateString } from "lib/utils/truncate-string";
import { StaticImageData } from "next/image";
import React from "react";

interface TableRepositoryNameProps {
  avatarURL?: string | StaticImageData;
  name?: string;
  handle?: string;
  isLoading?: boolean;
}

const TableRepositoryName = ({ avatarURL, name, handle, isLoading }: TableRepositoryNameProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2.5">

      {/* Avatar */}
      <Avatar size={40} avatarURL={avatarURL} isCircle={false} />

      {/* Text */}
      <div className="flex flex-col justify-center">
        <div title={name} className="font-medium text-base text-light-slate-12 tracking-tight">
          {name && name.length > 10 ? truncateString(name, 12): name}
        </div>
        <div className="font-medium text-sm text-light-slate-11">
          @{handle || "handle1234"}
        </div>
      </div>

    </div>
  );
};

export default TableRepositoryName;
