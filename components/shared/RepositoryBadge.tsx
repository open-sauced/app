import { ImCross } from "react-icons/im";
import Icon from "components/atoms/Icon/icon";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { getAvatarByUsername } from "lib/utils/github";

type RepositoryBadgeProps = {
  repository: string;
  deletable?: boolean;
  fontSizeClassName?: string;
  onClick?: () => void;
  onDelete?: (repoName: string) => void;
};

export default function RepositoryBadge({
  repository,
  deletable,
  fontSizeClassName,
  onClick,
  onDelete,
}: RepositoryBadgeProps) {
  const [repoOrg, repoName] = repository.split("/");
  return (
    <div className="flex gap-1 items-center max-w[175px] truncate flex-wrap text-xs text-light-slate-9">
      <Tooltip content={repository}>
        <button
          onClick={onClick}
          className={`flex gap-1 p-1 pr-2 items-center !border !border-light-slate-6 rounded-lg text-light-slate-12 !hover:border-orange-500 hover:cursor-pointer`}
        >
          <Icon IconImage={getAvatarByUsername(repoOrg)} className="rounded-[4px] overflow-hidden" />
          <span className={`max-w-[45px] md:max-w-[100px] truncate ${fontSizeClassName}`}>{repoName}</span>
          {deletable && (
            <button
              className="flex items-center justify-center w-4 h-4 rounded-full bg-light-slate-6 hover:bg-light-slate-5 transition-colors duration-300 p-1"
              onClick={(e) => {
                e.preventDefault();
                onDelete && onDelete(repoName);
              }}
            >
              <ImCross className="w-3 h-3 text-light-slate-12" />
            </button>
          )}
        </button>
      </Tooltip>
    </div>
  );
}
