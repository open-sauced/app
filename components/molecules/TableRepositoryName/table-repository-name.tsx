import Avatar from "components/atoms/Avatar/avatar";
import { truncateString } from "lib/utils/truncate-string";
import { StaticImageData } from "next/image";

interface TableRepositoryNameProps {
  avatarURL?: string | StaticImageData;
  name?: string;
  handle?: string;
  isLoading?: boolean;
  topic?: string;
  user?: string | string[];
}

const TableRepositoryName = ({ avatarURL, name, handle, topic, user }: TableRepositoryNameProps): JSX.Element => {

  return (
    <div className="flex items-center gap-2.5">
      {/* Avatar */}
      <a href={`https://www.github.com/${handle}/${name}`} target="_blank" rel="noreferrer">
        <Avatar
          isCached={false}
          className="shrink-0 min-w-10 min-h-10"
          size={40}
          avatarURL={avatarURL}
          isCircle={false}
        />
      </a>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <div title={name} className="  text-base text-light-slate-12 tracking-tight">
          <a href={`https://www.github.com/${handle}/${name}`} target="_blank" rel="noreferrer">
            {name && name.length > 10 ? truncateString(name, 12) : name}
          </a>
        </div>
        <div className="  text-sm text-light-slate-11 truncate max-w-[85px] md:max-w-[110px]">
          <a href={`https://www.github.com/${handle}`} target="_blank" rel="noreferrer">
            {handle ? `@${handle}` : "handle1234"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TableRepositoryName;
