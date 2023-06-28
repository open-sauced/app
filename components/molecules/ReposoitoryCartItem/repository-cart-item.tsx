import { StaticImageData } from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import Text from "components/atoms/Typography/text";
import Avatar from "components/atoms/Avatar/avatar";

export interface RepositoryCartItemProps {
  avatar?: StaticImageData | string;
  orgName?: string;
  repoName?: string;
  totalPrs?: number;
  handleRemoveItem: () => void;
}
const RepositoryCartItem = ({ avatar, orgName, repoName, totalPrs, handleRemoveItem }: RepositoryCartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3 items-center ">
        <Avatar avatarURL={avatar} initials="" size="sm" className="" />
        <Text className="!text-sm !text-light-slate-11">
          {orgName} / <span className="text-light-slate-12">{repoName}</span>
        </Text>
      </div>
      <div className="flex items-center gap-2 text-sm text-light-slate-10">
        <span className="flex items-center">
          <BiGitPullRequest className="text-[15px]" /> {totalPrs}
        </span>
        <span
          onClick={() => handleRemoveItem()}
          className="w-[26px] cursor-pointer flex justify-center items-center h-6 border rounded"
        >
          <AiOutlineClose className="text-sm" />
        </span>
      </div>
    </div>
  );
};

export default RepositoryCartItem;
