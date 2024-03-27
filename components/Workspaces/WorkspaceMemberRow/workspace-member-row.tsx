import { useState } from "react";

import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

import pendingImg from "img/icons/fallback-image-disabled-square.svg";

import Avatar from "components/atoms/Avatar/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";

interface WorkspaceMemberRowProps extends WorkspaceMember {
  name: string;
  email: string;
  className?: string;
  onDelete: (memberId: string) => void;
  onUpdate: (memberId: string, role: WorkspaceMemberRole) => Promise<WorkspaceMember> | undefined;
  role: WorkspaceMemberRole;
  avatarUrl: string;
  pending: boolean;
}

const mapRoleToText: Record<WorkspaceMemberRole, string> = {
  owner: "Owner",
  editor: "Editor",
  viewer: "Viewer",
};

const filterOptions = [
  { name: "Owner", value: "owner" },
  { name: "Editor", value: "editor" },
  { name: "Viewer", value: "viewer" },
  { name: "remove", value: "remove" },
];

const WorkspaceMemberRow = ({
  className,
  name,
  avatarUrl,
  role,
  email,
  onDelete,
  onUpdate,
  id,
  pending,
}: WorkspaceMemberRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isOwner = role == "owner";

  const handleRoleChange = async (role: string) => {
    setIsMenuOpen(false);
    if (role === "remove") {
      onDelete(id);
    } else {
      onUpdate(id, role as WorkspaceMemberRole);
    }
  };

  return (
    <div className={`flex justify-between items-center ${className && className} ${pending && "text-light-slate-10"}`}>
      <div className="flex items-center gap-3">
        <Avatar size={40} isCircle avatarURL={pending ? pendingImg : avatarUrl} />
        <p>{name || email}</p>
      </div>
      <div>
        {isOwner ? (
          <div className="pr-3"> {mapRoleToText[role]}</div>
        ) : (
          <Select onValueChange={(value) => handleRoleChange(value)} value={role}>
            <SelectTrigger className="text-base border-none " selectIcon={<AiOutlineCaretDown className="ml-3" />}>
              <SelectValue placeholder="select a role" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {filterOptions.map((option, i) => (
                <SelectItem className="cursor-pointer" itemIndicatorIcon={<BsCheck2 />} value={option.value} key={i}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};
export default WorkspaceMemberRow;
