import Avatar from "components/atoms/Avatar/avatar";
import { StaticImageData } from "next/image";
import React from "react";

interface TableRepositoryNameProps {
  avatarURL?: string | StaticImageData;
  name?: string;
  handle?: string;
}

const TableRepositoryName = ({ avatarURL, name, handle }: TableRepositoryNameProps): JSX.Element => {
  return (
    <div className="flex items-center gap-2.5">
      
      {/* Avatar */}
      <Avatar size="lg" avatarURL={avatarURL} isCircle={false} />

      {/* Text */}
      <div className="flex flex-col justify-center">
        <div className="font-medium text-base text-light-slate-12 tracking-tight">
          {name}
        </div>
        <div className="font-medium text-sm text-light-slate-11">
          @{handle}
        </div>
      </div>

    </div>
  );
};

export default TableRepositoryName;