import Avatar from "components/atoms/Avatar/avatar";
import { AiOutlineCaretDown } from "react-icons/ai";
import pendingImg from "img/icons/fallback-image-disabled-square.svg";
import { useState } from "react";
import Selector from "components/atoms/Selector/selector";
import { TeamMemberData } from "../TeamMembersConfig/team-members-config";

type TeamMemberRowProps = {
  className?: string;
} & TeamMemberData;

const mapRoleToText: Record<TeamMemberRowProps["role"], string> = {
  admin: "Admin",
  editor: "can edit",
  viewer: "can view",
  pending: "Pending"
};

const TeamMemberRow  = ({ className, name, avatarUrl, role }: TeamMemberRowProps) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pending = role == "pending";

  const handleRoleChange = (role: string) => {};

  return(
    <div className={`flex justify-between items-center ${className && className} ${pending && "text-light-slate-10"}`}>
      <div className="flex items-center">
        <Avatar size={40} isCircle avatarURL={pending ? pendingImg : avatarUrl} />
        <p className="ml-3">{name}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          {mapRoleToText[role]} {!pending && <AiOutlineCaretDown onClick={() => {setIsMenuOpen(!isMenuOpen);}} />}
        </div>
        { !pending && isMenuOpen && (
          <Selector filterOptions={["Admin", "can edit", "can view"]} selected={mapRoleToText[role]} variation="check" handleFilterClick={handleRoleChange} />
        )}
      </div>
    </div>
  );

};
export default TeamMemberRow;
