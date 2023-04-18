import Avatar from "components/atoms/Avatar/avatar";
import { AiOutlineCaretDown } from "react-icons/ai";
import pendingImg from "img/icons/fallback-image-disabled-square.svg";
import { useState } from "react";
import Selector from "components/atoms/Selector/selector";
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
        <div className="flex items-center gap-3">
          {mapRoleToText[access]}
          {!pending && (
            <>
              {isOwner ? (
                <AiOutlineCaretDown />
              ) : (
                <AiOutlineCaretDown
                  className="cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                />
              )}
            </>
          )}
        </div>
        {!pending && isMenuOpen && (
          <Selector
            filterOptions={[
              { name: "Admin", value: "admin" },
              { name: "can edit", value: "edit" },
              { name: "can view", value: "view" },
              { name: "remove", value: "remove" }
            ]}
            selected={access}
            variation="check"
            handleFilterClick={handleRoleChange}
          />
        )}
      </div>
    </div>
  );
};
export default TeamMemberRow;
