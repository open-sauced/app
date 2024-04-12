import { StaticImageData } from "next/image";
import Avatar from "components/atoms/Avatar/avatar";
import Tooltip from "components/atoms/Tooltip/tooltip";
interface TableRepositoryNameProps {
  avatarURL?: string | StaticImageData;
  fullName: string;
  isLoading?: boolean;
  topic?: string;
  user?: string | string[];
}

const TableRepositoryName = ({ avatarURL, fullName }: TableRepositoryNameProps): JSX.Element => {
  const [handle, name] = fullName?.split("/");
  return (
    <div className="flex items-center gap-2.5">
      {/* Avatar */}
      <a href={`https://www.github.com/${handle}/${name}`} target="_blank">
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
        <Tooltip content={name}>
          <div className="  text-base text-light-slate-12 tracking-tight max-w-[5.5rem] sm:max-w-[9.3rem] md:max-w-[7rem] whitespace-nowrap overflow-hidden overflow-ellipsis">
            <a href={`https://www.github.com/${handle}/${name}`} target="_blank">
              {name}
            </a>
          </div>
        </Tooltip>
        <div className="  text-sm text-light-slate-11 truncate max-w-[85px] md:max-w-[110px]">
          <a href={`https://www.github.com/${handle}`} target="_blank">
            {handle ? `@${handle}` : "handle1234"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TableRepositoryName;
