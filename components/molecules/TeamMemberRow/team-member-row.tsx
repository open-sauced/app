import Avatar from "components/atoms/Avatar/avatar";
import { AiOutlineCaretDown } from "react-icons/ai";
import pendingImg from "img/icons/fallback-image-disabled-square.svg";
import { useState } from "react";
import Selector from "components/atoms/Selector/selector";
import { TeamMemberData } from "../TeamMembersConfig/team-members-config";

interface TeamMemberRowProps extends TeamMemberData {
  className?: string;
  onDelete: Function;
  onUpdate: Function;
}

const mapRoleToText: Record<TeamMemberRowProps["access"], string> = {
  admin: "Owner",
  edit: "can edit",
  view: "can view",
  pending: "Pending"
};

const TeamMemberRow = ({ className, name, avatarUrl, access, email, onDelete, onUpdate, id }: TeamMemberRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pending = access == "pending";

  const handleRoleChange = async (role: string) => {
    setIsMenuOpen(false);
    if (role === "remove") {
      onDelete(id);
    } else {
      onUpdate(id, role);
    }
  };

  return (
    <div className={`flex justify-between items-center ${className && className} ${pending && "text-light-slate-10"}`}>
      <div className="flex items-center">
        <Avatar size={40} isCircle avatarURL={pending ? pendingImg : avatarUrl} />
        <p className="ml-3">{name || email}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          {mapRoleToText[access]}
          {!pending && (
            <AiOutlineCaretDown
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
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
            selected={mapRoleToText[access]}
            variation="check"
            handleFilterClick={handleRoleChange}
          />
        )}
      </div>
    </div>
  );
};
export default TeamMemberRow;
