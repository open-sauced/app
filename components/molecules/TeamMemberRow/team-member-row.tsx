import { useState } from "react";

import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

import pendingImg from "img/icons/fallback-image-disabled-square.svg";

import Avatar from "components/atoms/Avatar/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";
import { MemberAccess, TeamMemberData } from "../TeamMembersConfig/team-members-config";

interface TeamMemberRowProps extends TeamMemberData {
  className?: string;
  onDelete: (memberId: string) => void;
  onUpdate: (memberId: string, access: MemberAccess) => Promise<any> | undefined;
}

const mapRoleToText: Record<TeamMemberRowProps["access"], string> = {
  owner: "Owner",
  admin: "Admin",
  edit: "can edit",
  view: "can view",
  pending: "Pending"
};

const filterOptions = [
  { name: "Admin", value: "admin" },
  { name: "can edit", value: "edit" },
  { name: "can view", value: "view" },
  { name: "remove", value: "remove" }
];

const TeamMemberRow = ({ className, name, avatarUrl, access, email, onDelete, onUpdate, id }: TeamMemberRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pending = access == "pending";
  const isOwner = access == "owner";

  const handleRoleChange = async (role: string) => {
    setIsMenuOpen(false);
    if (role === "remove") {
      onDelete(id);
    } else {
      onUpdate(id, role as MemberAccess);
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
          <div className="pr-3"> {mapRoleToText[access]}</div>
        ) : (
          <Select onValueChange={(value) => handleRoleChange(value)} value={access}>
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
export default TeamMemberRow;
