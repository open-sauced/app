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

const TeamMemberRow = ({ className, name, avatarUrl, access }: TeamMemberRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pending = access == "pending";

  const handleRoleChange = async (role: string) => {
    console.log(role);
    if (role === "pending") {
    }
  };

  return (
    <div className={`flex justify-between items-center ${className && className} ${pending && "text-light-slate-10"}`}>
      <div className="flex items-center">
        <Avatar size={40} isCircle avatarURL={pending ? pendingImg : avatarUrl} />
        <p className="ml-3">{name}</p>
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
            filterOptions={["Admin", "can edit", "can view", "remove"]}
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
